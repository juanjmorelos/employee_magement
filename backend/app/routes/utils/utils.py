from flask import jsonify
import bcrypt
from app import mysql

class Utils:
    @staticmethod
    def sendErrorMessage(e , message="Ocurrio un error al insertar"):
        return jsonify({
            'success': False,
            'message': f"{message}: " + str(e)
        }), 500

    @staticmethod
    def hashPassword(password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed_password.decode('utf-8')  # Convertir el hash a una cadena UTF-8

    @staticmethod
    def checkPassword(hashed_password, user_password):
        return bcrypt.checkpw(user_password.encode('utf-8'), hashed_password.encode('utf-8'))
    
    @staticmethod
    def userExist(user):
        cursor = mysql.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (user,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    @staticmethod
    def companyExist(id):
        cursor = mysql.cursor(dictionary=True)
        cursor.execute("SELECT * FROM companysettings WHERE id = %s", (id,))
        result = cursor.fetchone()
        #cursor.close()
        return result
    
    @staticmethod
    def arlExist(id):
        cursor = mysql.cursor(dictionary=True)
        cursor.execute("SELECT * FROM arlinsurance WHERE id = %s", (id,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    @staticmethod
    def cesantiasExist(id):
        cursor = mysql.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cesantias WHERE id = %s", (id,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    @staticmethod
    def healthyInsuranceExist(id):
        cursor = mysql.cursor(dictionary=True)
        cursor.execute("SELECT * FROM healthyinsurance WHERE id = %s", (id,))
        result = cursor.fetchone()
        cursor.close()
        return result
    
    @staticmethod
    def pensionExist(id):
        cursor = mysql.cursor(dictionary=True)
        cursor.execute("SELECT * FROM pension WHERE id = %s", (id,))
        result = cursor.fetchone()
        cursor.close()
        return result