from flask import Flask
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
mysql = mysql.connector.connect(
    user=os.environ.get('MYSQL_USER'),
    password=os.environ.get('MYSQL_PASSWORD'),
    database=os.environ.get('MYSQL_DB_NAME'),
    host=os.environ.get('MYSQL_HOST'),
    port=int(os.environ.get('MYSQL_PORT'))  # Asegurarse de que el puerto sea un entero
)

print(f'El usuario es: {str(os.environ.get('MYSQL_USER'))}')

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
    from .routes.userRoutes import users
    
    app.register_blueprint(company)
    app.register_blueprint(socialSecurity)
    app.register_blueprint(users)

    return app
