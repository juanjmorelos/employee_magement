from flask import jsonify
import bcrypt

class Utils:
    def sendErrorMessage(e):
        return jsonify({
            'success': False,
            'message': "Ocurrio un error al insertar: " + str(e)
        }), 500
    

    def hashPassword(password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed_password.decode('utf-8')  # Convertir el hash a una cadena UTF-8

    def checkPassword(hashed_password, user_password):
        return bcrypt.checkpw(user_password.encode('utf-8'), hashed_password.encode('utf-8'))