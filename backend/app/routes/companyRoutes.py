from flask import Blueprint, request, jsonify, current_app
import os
from app import app, mysql
from datetime import datetime


company = Blueprint('company', __name__)

@company.route('/updateCompanySettings', methods=['POST'])
def addCompany():
    try:
        if 'name' not in request.form or 'identifier' not in request.form or 'userId' not in request.form:
            return jsonify({
                'success': False,
                'message': 'Campos faltantes'
            }), 400

        name = request.form['name']
        identifier = request.form['identifier']
        logo = request.files['logo']
        userId = request.form['userId']

        cursor = mysql.cursor(dictionary=True)  # Usar dictionary=True para obtener los resultados como diccionarios
        cursor.execute("SELECT * FROM users WHERE id = %s", (userId,))
        result = cursor.fetchone()  # Obtener el primer registro (o None si no hay resultados)
        cursor.close()

        if result:
            # result es una tupla, accede al primer elemento para obtener el nombre
            privilegies = result['privileges']
            if privilegies == 1:
                file_extension = os.path.splitext(logo.filename)[1]

                current_time = datetime.now().strftime("%Y%m%d%H%M%S%f")
                filename = f"{current_time}_{identifier}{file_extension}"
                photo_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

                logo.save(photo_path)

                cursor = mysql.cursor()
                cursor.execute("UPDATE companySettings SET name = %s, logo = %s, identifier = %s", (name, photo_path, identifier))
                mysql.commit()
                cursor.close()

                return jsonify({
                        'success': True,
                        'message': 'Compañía actualizada correctamente'
                    }), 200
            else: 
                return jsonify({
                    'success': False,
                    'message': 'No tienes permisos para realizar esta operación'
                }), 403
        else:
            return jsonify({
                'success': False,
                'message': 'El usuario no existe'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'message': "Ocurrio un error al actualizar: " + str(e)
        }), 500
