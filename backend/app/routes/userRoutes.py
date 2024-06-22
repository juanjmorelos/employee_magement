from flask import Blueprint, request, jsonify, current_app
import os
from app import app, mysql
from app.routes.utils.utils import Utils


users = Blueprint('users', __name__)

@users.route("/login", methods=['POST'])
def loginUser():
    try:
        if 'user' not in request.json or 'password' not in request.json:
            return jsonify({
                "success": False,
                "message": "Campos faltantes"
            }), 400
        data = request.json
        user = data.get("user")
        plain_password = data.get("password")

        cursor = mysql.cursor(dictionary=True)
        cursor.execute('''
            SELECT 
                emp.id, 
                emp.name, 
                emp.password,
                emp.lastName, 
                emp.identifier, 
                emp.username, 
                emp.email, 
                emp.admissionDate, 
                emp.retirementDate, 
                emp.salary, 
                emp.birthdate, 
                c.cesatiasName as cesantias, 
                p.pensionName as pension, 
                a.arlName as arlInsurance, 
                hi.insuranceName AS healthyInsuranceName,  -- Nombre del seguro médico obtenido del JOIN
                emp.isActive, 
                pos.positionName AS positionName,  -- Nombre del cargo obtenido del JOIN
                emp.privileges, 
                comp.name AS companyName  -- Nombre de la empresa obtenido del JOIN
            FROM 
                users AS emp
            LEFT JOIN healthyInsurance AS hi ON emp.healthyInsurance = hi.id
            LEFT JOIN position AS pos ON emp.position = pos.id
            LEFT JOIN companysettings AS comp ON emp.company = comp.id
            LEFT JOIN arlinsurance a on a.id = emp.arlInsurance
            LEFT JOIN pension p on p.id = emp.pension
            LEFT JOIN cesantias c on c.id = emp.cesantias
            WHERE emp.username = %s;
        ''', (user,))
        result = cursor.fetchone()

        if result:
            stored_password = result['password']
            result.pop('password', None)

            if Utils.checkPassword(stored_password, plain_password):
                if result['isActive'] == 1:
                    return jsonify({
                        "success": True,
                        "message": "Login correcto",
                        "data": result
                    })
                return jsonify({
                    "success": False,
                    "message": "El usuario se encuentra inactivo o no pertenece a la compañía",
                })
            return jsonify({
                "success": False,
                "message": "Usuario o contraseña incorrecta por favor verifique e intente nuevamente"
            })
        
        return jsonify({
            "success": False,
            "message": "Usuario o contraseña incorrecta por favor verifique e intente nuevamente",
        })
    
    except Exception as e:
        return Utils.sendErrorMessage(e, "Error al intentar iniciar sesión")
    
@users.route("/registerUser", methods=['POST'])
def registerRoute():
    try:
        data = request.json
        
        expected_fields = ["transactUser","username", "password", "name", "lastName", "email", 
                        "birthdate", "privileges", "salary", "company", "position",
                        "pension", "cesantias", "arlInsurance", "healthyInsurance", "identifier"]
        utyFields = []
        
        for field in expected_fields:
            if field not in data:
                utyFields.append(field)
        
        if len(utyFields) > 0:
            return jsonify({
                    "success": False,
                    "message": "Campos faltantes",
                    "utyFields": utyFields
                }), 400
        
        transactUser = data.get("transactUser")
        cursor = mysql.cursor(dictionary=True) 
        cursor.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor.fetchone() 

        if result:
            privilegies = result['privileges']
            if privilegies == 3 or result['isActive'] == 0:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
            else:        
                username = data.get("username")
                password = data.get("password")
                name = data.get("name")
                lastName = data.get("lastName")
                identifier = data.get("identifier")
                email = data.get("email")
                birthdate = data.get("birthdate")
                privileges = data.get("privileges")
                salary = data.get("salary")
                company = data.get("company")
                position = data.get("position")
                pension = data.get("pension")
                cesantias = data.get("cesantias")
                arlInsurance = data.get("arlInsurance")
                healthyInsurance = data.get("healthyInsurance")

                if Utils.userExist(username):
                    return jsonify({
                        "success": False,
                        "message": f"El usuario {username} ya se encuentra registrado"
                    }), 400
                
                if not Utils.companyExist(company):
                    return jsonify({
                        "success": False,
                        "message": "La compañía a la que esta asociado no existe"
                    }), 400
                
                if not Utils.arlExist(arlInsurance):
                    return jsonify({
                        "success": False,
                        "message": "La compañía de arl a la que esta asociado no existe"
                    }), 400
                
                if not Utils.cesantiasExist(cesantias):
                    return jsonify({
                        "success": False,
                        "message": "La compañía de censatias a la que esta asociado no existe"
                    }), 400
                
                if not Utils.healthyInsuranceExist(healthyInsurance):
                    return jsonify({
                        "success": False,
                        "message": "La compañía de eps a la que esta asociado no existe"
                    }), 400
                
                if not Utils.pensionExist(pension):
                    return jsonify({
                        "success": False,
                        "message": "La compañía de pensiones a la que esta asociado no existe"
                    }), 400
                
                cursor = mysql.cursor(dictionary=True)
                cursor.execute('''
                    INSERT INTO `users` (
                    `name`, `lastName`, `identifier`, 
                    `username`, `email`, 
                    `retirementDate`, `salary`, `birthdate`, 
                    `cesantias`, `pension`, `arlInsurance`, 
                    `healthyInsurance`, `password`, 
                    `isActive`, `position`, `privileges`, 
                    `company`
                    ) 
                    VALUES 
                    (
                        %s, %s, %s, %s, %s, %s, 
                        NULL, %s, %s, %s, %s, %s, %s, 
                        %s, 1, %s, %s, %s
                    )
                ''', name, lastName, identifier, username, email, None, salary, birthdate, cesantias, pension, 
                arlInsurance, healthyInsurance, Utils.hashPassword(password), position, privileges, company)
                
                user_id = cursor.lastrowid
                cursor.commit()

                cursor.execute('SELECT * FROM `users` WHERE `id` = %s', (user_id,))
                user = cursor.fetchone()

                if user:
                    user.pop('password', None)
                    return jsonify({
                        "success": True,
                        "message": "Registro exitoso",
                        "data": user
                    })
                return jsonify({
                    "success": False,
                    "message": "No se pudo registrar",
                }), 400
        return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
    except Exception as e:
        return Utils.sendErrorMessage(e, "Ocurrio un error al registrar")

@users.route("/updateUser", methods=['PUT'])
def updateUser():
    try:
        data = request.json
        expected_fields = ["transactUser","id","name", "lastName", "email", 
                       "birthdate", "isActive", "privileges", "salary", "company", "position",
                       "pension", "cesantias", "arlInsurance", "healthyInsurance", "identifier"]
        utyFields = []
            
        for field in expected_fields:
            if field not in data:
                utyFields.append(field)
        
        if len(utyFields) > 0:
            return jsonify({
                "success": False,
                "message": "Campos faltantes",
                "utyFields": utyFields
            }), 400
        
        transactUser = data.get("transactUser")
        cursor = mysql.cursor(dictionary=True) 
        cursor.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor.fetchone() 

        if result:
            privilegies = result['privileges']
            if privilegies == 3 or result['isActive'] == 0:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
            else:
                id = data.get("id")
                name = data.get("name")
                lastName = data.get("lastName")
                identifier = data.get("identifier")
                email = data.get("email")
                birthdate = data.get("birthdate")
                privileges = data.get("privileges")
                salary = data.get("salary")
                company = data.get("company")
                position = data.get("position")
                pension = data.get("pension")
                cesantias = data.get("cesantias")
                arlInsurance = data.get("arlInsurance")
                healthyInsurance = data.get("healthyInsurance")

                cursor = mysql.cursor(dictionary=True)
                cursor.execute('''
                    UPDATE `users` 
                    SET 
                        `name` = %s,
                        `lastName` = %s,
                        `identifier` = %s,
                        `email` = %s,
                        `birthdate` = %s,
                        `privileges` = %s,
                        `salary` = %s,
                        `company` = %s,
                        `position` = %s,
                        `pension` = %s,
                        `cesantias` = %s,
                        `arlInsurance` = %s,
                        `healthyInsurance` = %s
                    WHERE `id` = %s
                ''', (
                    name, lastName, identifier, email, birthdate, privileges, salary, 
                    company, position, pension, cesantias, arlInsurance, healthyInsurance, id
                ))
                
                # Confirmar la transacción
                mysql.commit()
                
                # Consultar el usuario actualizado
                cursor.execute('SELECT * FROM `users` WHERE `id` = %s', (id,))
                user = cursor.fetchone()
                if user:
                    user.pop('password', None)
                    return jsonify({
                        "success": True,
                        "message": "Usuario actualizado correctamente",
                        "data": user
                    })
                return jsonify({
                    "success": False,
                    "message": "El usuario no se pudo actualizar",
                }), 400
        else:
            return jsonify({
                "success": False,
                "message": "Permisos insuficientes para realizar esta transacción"
            }), 403
    except Exception as e:
        Utils.sendErrorMessage(e, "Error al actualizar usuario")


@users.route("/dismissUser", methods=["PUT"])
def dissmissUser():
    try:
        data = request.json
        if "idUser" not in data or "retiredDate" not in data or "transactUser" not in data:
            return jsonify({
                "success": False,
                "message": "Campos faltantes"
            })
        transactUser = data.get("transactUser")
        cursor1 = mysql.cursor(dictionary=True) 
        cursor1.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor1.fetchone() 

        if result:
            privilegies = result['privileges']
            if privilegies == 3 or result['isActive'] == 0:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
            else:
                userId = data.get("idUser")
                retiredDate = data.get("retiredDate")
                cursor = mysql.cursor(dictionary=True)
                cursor.execute('UPDATE users set retirementDate = %s, isActive = 0 WHERE id = %s',(retiredDate, userId))
                mysql.commit()

                cursor.execute('SELECT * FROM `users` WHERE `id` = %s', (userId,))
                user = cursor.fetchone()

                if user:
                    user.pop('password', None)
                    return jsonify({
                        "success": True,
                        "message": "Usuario actualizado correctamente",
                        "data": user
                    })
                return jsonify({
                    "success": False,
                    "message": "El usuario no se pudo actualizar",
                }), 400
        return jsonify({
            "success": False,
            "message": "Permisos insuficientes para realizar esta transacción"
        }), 403
    except Exception as e:
        return Utils.sendErrorMessage(e, "Error al despedir usuario")

@users.route("/allUsers/<transactUser>", methods=['GET'])
def getAllUsers(transactUser):
    try:
        cursor1 = mysql.cursor(dictionary=True) 
        cursor1.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor1.fetchone() 
        
        if result:
            privilegies = result['privileges']
            if privilegies == 3 or result['isActive'] == 0:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
            else:
                cursor = mysql.cursor(dictionary=True)
                cursor.execute('''
                    SELECT 
                        u.id, 
                        u.name, 
                        u.lastName, 
                        u.identifier, 
                        u.retirementDate, 
                        u.salary,
                        pos.positionName AS positionName
                    FROM 
                        users AS u
                    LEFT JOIN position AS pos ON u.position = pos.id
                    WHERE
                        u.id != %s;
                ''', (transactUser,))
                results = cursor.fetchall()

                return jsonify({
                    "success": True,
                    "message": "Trayendo usuarios",
                    "length": len(results),
                    "data": results
                }) 
        else:
            return jsonify({
                "success": False,
                "message": "Permisos insuficientes para realizar esta transacción"
            }), 403
    except Exception as e:
        return Utils.sendErrorMessage(e, "Ocurrio un error al consultar los usuarios")
    
@users.route("/getUserDetail/<body>", methods=['GET'])
def function(body):
    try:
        data = body.split(":")
        transactUser = data[0]
        userId = data[1]
        cursor1 = mysql.cursor(dictionary=True) 
        cursor1.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor1.fetchone() 
        
        if result:
            privilegies = result['privileges']
            if privilegies == 3 or result['isActive'] == 0:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
            else:
                cursor1 = mysql.cursor(dictionary=True) 
                cursor1.execute('''
                    SELECT 
                        u.id, 
                        u.name, 
                        u.lastName, 
                        u.identifier, 
                        u.username, 
                        u.email, 
                        u.admissionDate, 
                        u.retirementDate, 
                        u.salary, 
                        u.birthdate, 
                        u.cesantias, 
                        u.pension, 
                        u.arlInsurance, 
                        u.healthyInsurance,  
                        u.password, 
                        u.isActive, 
                        pos.positionName AS positionName,  
                        u.privileges
                    FROM 
                        users AS u
                    LEFT JOIN position AS pos ON u.position = pos.id
                    WHERE u.id = %s;
                ''', (userId,))
                result = cursor1.fetchone() 
                if result:
                    return jsonify({
                        "success": True,
                        "message": "Datos de usuario obtenidos",
                        "data": result
                    })
                return jsonify({
                    "success": False,
                    "message": "Usuario no existe"
                })
        else:
            return jsonify({
                "success": False,
                "message": "Permisos insuficientes para realizar esta transacción"
            }), 403
    except Exception as e:
        return Utils.sendErrorMessage(e, "Ocurrio un error al consultar detalle de usuario")
    
@users.route("/userPayment/<body>", methods=["GET"])
def getUserPayment(body):
    try:
        data = body.split(":")
        transactUser = data[0]
        idUser = data[1]
        isSameUser = (transactUser == idUser)
        
        cursor1 = mysql.cursor(dictionary=True)        
        cursor1.execute('''SELECT 
                        u.id, 
                        u.name, 
                        u.lastName, 
                        u.identifier, 
                        u.email, 
                        u.salary, 
                        u.company,
                        pos.positionName AS positionName,  
                        u.account,
                        u.isActive
                    FROM 
                        users AS u
                    LEFT JOIN position AS pos ON u.position = pos.id
                    WHERE u.id = %s''', (transactUser,))
        result = cursor1.fetchone() 


        if result:
            if result['isActive'] == 0:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transacción"
                }), 403
            else:
                cursor2 = mysql.cursor(dictionary=True)        
                cursor2.execute('''SELECT 
                        u.id, 
                        u.name, 
                        u.lastName, 
                        u.identifier, 
                        u.email, 
                        u.salary, 
                        u.company,
                        pos.positionName AS positionName,  
                        u.account,
                        u.privileges,
                        u.isActive
                    FROM 
                        users AS u
                    LEFT JOIN position AS pos ON u.position = pos.id
                    WHERE u.id = %s''', (idUser,))
                result2 = cursor2.fetchone() 

                if not result2:
                    return jsonify({
                        "success": False,
                        "message": "Usuario no existe"
                    }), 400

                mainSalary = result2['salary']
                netSalary = mainSalary * 0.92
                contributions = mainSalary * 0.08
                healthValue = contributions/2
                pensionValue = contributions/2
                minSalary = 1300000 * 2
                transportContribution = 162000
                salaryData = {
                    "netSalary": netSalary,
                    "discount": contributions,
                    "healthValue": healthValue,
                    "pensionValue": pensionValue,
                }
                if mainSalary < minSalary:
                    mainSalary = mainSalary + transportContribution
                    salaryData = {
                            "netSalary": netSalary,
                            "discount": contributions,
                            "healthValue": healthValue,
                            "pensionValue": pensionValue,
                            "transportContribution": transportContribution
                        }


                cursor3 = mysql.cursor(dictionary=True) 
                cursor3.execute('SELECT * FROM companySettings where id = %s', (result2['company'],))
                company = cursor3.fetchone()

                return jsonify({
                    "success": True,
                    "message": "Salario obtenido",
                    "data": {
                        "user": result2,
                        "salaryData": salaryData,
                        "company": company
                    }
                })
        else:
            return jsonify({
                "success": False,
                "message": "Usuario no existe"
            }), 400
    except Exception as e:
        return Utils.sendErrorMessage(e, "Ocurrio un error al consultar detalle de usuario")
    
@users.route("/updateEmail", methods=["PUT"])
def updateUserEmail():
    try:
        data = request.json
        if 'email' not in data or 'userId' not in data:
            return jsonify({
                "success": False,
                "message": "Campos faltantes"
            })
        email = data.get('email')
        userId = data.get('userId')

        cursor1 = mysql.cursor()
        cursor1.execute("UPDATE users SET email = %s where id = %s", (email, userId))
        mysql.commit()
        
        cursor = mysql.cursor(dictionary=True)
        cursor.execute('''
            SELECT 
                emp.id, 
                emp.name, 
                emp.password,
                emp.lastName, 
                emp.identifier, 
                emp.username, 
                emp.email, 
                emp.admissionDate, 
                emp.retirementDate, 
                emp.salary, 
                emp.birthdate, 
                c.cesatiasName as cesantias, 
                p.pensionName as pension, 
                a.arlName as arlInsurance, 
                hi.insuranceName AS healthyInsuranceName,  -- Nombre del seguro médico obtenido del JOIN
                emp.isActive, 
                pos.positionName AS positionName,  -- Nombre del cargo obtenido del JOIN
                emp.privileges, 
                comp.name AS companyName  -- Nombre de la empresa obtenido del JOIN
            FROM 
                users AS emp
            LEFT JOIN healthyInsurance AS hi ON emp.healthyInsurance = hi.id
            LEFT JOIN position AS pos ON emp.position = pos.id
            LEFT JOIN companysettings AS comp ON emp.company = comp.id
            LEFT JOIN arlinsurance a on a.id = emp.arlInsurance
            LEFT JOIN pension p on p.id = emp.pension
            LEFT JOIN cesantias c on c.id = emp.cesantias
            WHERE emp.id = %s;
        ''', (userId,))
        result = cursor.fetchone()

        return jsonify({
            "success": True,
            "message": "Email actualizado correctamente",
            "data": result
        })
    except Exception as e:
        return Utils.sendErrorMessage(e, "Ocurrio un error al actualizar email")