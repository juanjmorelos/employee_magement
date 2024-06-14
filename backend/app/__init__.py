from flask import Flask
import mysql.connector
import os

# Configuración de la aplicación Flask
app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'employee_management'
app.config['MYSQL_HOST'] = 'localhost'

# Inicialización de la conexión MySQL
mysql = mysql.connector.connect(
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    database=app.config['MYSQL_DB'],
    host=app.config['MYSQL_HOST'],
    port=8080
)

def create_app():
    app = Flask(__name__)
    
    # Configuraciones
    basedir = os.path.abspath(os.path.dirname(__file__))
    project_dir = os.path.dirname(basedir)

    app.config.from_object('app.config.config')
    app.config['UPLOAD_FOLDER'] = os.path.join(project_dir, 'uploads')
    app.config['MAX_CONTENT_PATH'] = 16 * 1024 * 1024 

    # Registrar rutas
    from .routes.companyRoutes import company
    from .routes.socialSecurityRoutes import socialSecurity
    
    app.register_blueprint(company)
    app.register_blueprint(socialSecurity)

    return app
