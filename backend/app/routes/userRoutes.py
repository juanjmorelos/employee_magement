from flask import Blueprint, request, jsonify, current_app
import os
from app import app, mysql
from app.routes.utils.utils import Utils


users = Blueprint('users', __name__)
utils = Utils()

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
        return utils.sendErrorMessage(e)