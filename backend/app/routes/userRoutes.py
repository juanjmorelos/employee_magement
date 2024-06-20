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
        cursor.execute("SELECT * FROM users WHERE username = %s", (user,))
        result = cursor.fetchone()

        if result:
            stored_password = result['password']
            result.pop('password', None)

            if Utils.checkPassword(stored_password, plain_password):
                return jsonify({
                    "success": True,
                    "message": "Login correcto",
                    "data": result
                })
                
            return jsonify({
                "success": False,
                "message": "Login fallido"
            }), 400
        
        return jsonify({
            "success": False,
            "message": "Login fallido",
        }), 400
    
    except Exception as e:
        return Utils.sendErrorMessage(e, "Error al intentar iniciar sesión")
    
@users.route("/registerUser", methods=['POST'])
def registerRoute():
    try:
        data = request.json
        
        expected_fields = ["transactUser","username", "password", "name", "lastName", "email", 
                        "birthdate", "privileges", "salary", "company", "position",
                        "pension", "cesantias", "arlInsurance", "healthyInsurance", "identifier"]
        emptyFields = []
        
        for field in expected_fields:
            if field not in data:
                emptyFields.append(field)
        
        if len(emptyFields) > 0:
            return jsonify({
                    "success": False,
                    "message": "Campos faltantes",
                    "emptyFields": emptyFields
                }), 400
        
        transactUser = data.get("transactUser")
        cursor = mysql.cursor(dictionary=True) 
        cursor.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor.fetchone() 

        if result:
            privilegies = result['privileges']
            if privilegies == 3:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transaccion"
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
                    "message": "Permisos insuficientes para realizar esta transaccion"
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
        emptyFields = []
            
        for field in expected_fields:
            if field not in data:
                emptyFields.append(field)
        
        if len(emptyFields) > 0:
            return jsonify({
                "success": False,
                "message": "Campos faltantes",
                "emptyFields": emptyFields
            }), 400
        
        transactUser = data.get("transactUser")
        cursor = mysql.cursor(dictionary=True) 
        cursor.execute("SELECT * FROM users WHERE id = %s", (transactUser,))
        result = cursor.fetchone() 

        if result:
            privilegies = result['privileges']
            if privilegies == 3:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transaccion"
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
                "message": "Permisos insuficientes para realizar esta transaccion"
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
            if privilegies == 3:
                return jsonify({
                    "success": False,
                    "message": "Permisos insuficientes para realizar esta transaccion"
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
            "message": "Permisos insuficientes para realizar esta transaccion"
        }), 403
    except Exception as e:
        return Utils.sendErrorMessage(e, "Error al despedir usuario")
