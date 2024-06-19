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
            })
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
            })
        
        return jsonify({
            "success": False,
            "message": "Login fallido",
        })
    
    except Exception as e:
        return Utils.sendErrorMessage(e)
    
@users.route("/registerUser", methods=['POST'])
def registerRoute():
    try:
        data = request.json
        
        expected_fields = ["username", "password", "name", "lastName", "email", 
                        "birthdate", "isActive", "privileges",
                        "retirementDate", "salary", "company", "position",
                        "pension", "cesantias", "arlInsurance", "healthyInsurance"]
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
        
        data = request.json
        username = data.get("username")
        password = data.get("password")
        name = data.get("name")
        lastName = data.get("lastName")
        email = data.get("email")
        birthdate = data.get("birthdate")
        isActive = data.get("isActive")
        privileges = data.get("privileges")
        retirementDate = data.get("retirementDate")
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
        
        #falta hacer la insercion

        return jsonify({
            "success": True,
            "message": "Registro exitoso"
        })
        
            
    except Exception as e:
        return Utils.sendErrorMessage(e, "Ocurrio un error al registrar")