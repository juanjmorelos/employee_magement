from flask import Blueprint, request, jsonify, current_app
import os
from app import app, mysql

socialSecurity = Blueprint('socialSecurity', __name__)

@socialSecurity.route('/addArl', methods=['POST'])
def addArl():
    try:
        data = request.json
        arlName = data.get("arlName")

        if 'arlName' not in request.json:
            return jsonify({
                'success': False,
                'message': "Campos faltantes"
            }), 400
        
        cursor = mysql.cursor()
        cursor.execute("INSERT INTO arlInsurance (arlName) VALUES (%s)", (arlName,))
        mysql.commit()
        cursor.close()

        return jsonify({
            'success': True,
            'message': "Se añadio correctamente"
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': "Ocurrio un error al insertar: " + str(e)
        }), 500
