# Employee Management

## Descripción
Este proyecto fue realizado utilizando arquitectura limpia y un poco del domain driven design, este proyecto tiene como objetivo la creación de un sistema de gestión de empleados, en el que se pueda realizar pagos de nómina, registrar, empleados, ver detalle de empleados, retirar empleados y generar comprobantes de nómina.

Actualmente el proyecto tiene las siguientes funcionalidades:

- El usuario puede loguearse
- Detecta los roles del usuario y puede así mostrar los elementos del menú a los que puede acceder
- Puede visualizar la lista de empleados*
- Puede ver el detalle de cada empleado*
- Puede retirar un empleado de la compañía*
- Puede visualizar cuantos empleados tiene, cuantos activos y cuantos retirados*
- Puede registrar empleados*
- Puede visualizar el valor total de la nómina
- Puede ver el comprobante nómina de cada empleado registrado y exportarlo a PDF*
- El usuario actual puede ver su comprobante de nómina y exportarla a PDF
- El usuario actual puede actualizar email y contraseña del usuario que esta logueado
- Puede actualizar los datos de la compañía (Nombre, nit y logo)*
- El usuario puede cerrar sesión
- El sistema valida si un usuario esta logueado previamente, si es así no es necesario que se vuelva a loguear y lo envía a la pantalla de home

> *Si tiene privilegios


Actualmenente el proyecto no tiene las siguientes funcionalidades (Se espera más adelante implementarlas):

- Los listados de empresas prestadoras de servicios: ARL, Pension, Seguro médico y Censatías, aunque haya registros en base de datos, no se muestran en el aplicativo, actualmente se muestran datos estáticos
- Actualizar los datos de un empleado en el detalle de empleados
- Agregar empresas prestadoras de los servicios de: ARL, Pension, Seguro médico y Censatías
- Realizar solicitudes de pago de nómina
- Autorizar o rechazar solicitudes de pago de nómina

### Tecnologías usadas
El proyecto se realizo utilizando las siguientes tecnologías:

- **Base de datos:** MySQL
- **Backend:** Python
- **Frontend:** Angular V18
    - Para el frontend se utilizaron los siguientes frameworks css:
        - Tailwind CSS
        - Daisy UI (Plugin de Tailwind CSS)

## Pasos para ejecutar

> Al ser realizado con angular, python y MySQL debe preciamente tener instalado estas herramientas

### Importar base de datos
1. Diríjase al carpeta `database` aquí encontrara un archivo llamado `employee_management.sql` que contiene la base de datos.
2. Cree una base de datos en su herramienta local MySQL, ya sea MySQL Workbench, phpMyAdmin o cualquier otra que desee ejecutar.
3. Importe el archivo `employee_management.sql` que se encuentra en la ruta antes mencionada
4. Ahora tendrá lista la base de datos que espera el aplicativo

### Levantar backend
1. Una vez que tiene instalado python diríjase a la carpeta `backend` que contiene el código
2. Debe instalar las siguientes librerías, abra un cmd, terminal o consola de comandos y ejecute los siguientes comandos:
```sh
pip install bcrypt 
pip install flask
pip install python-dotenv
pip install mysql-connector-python
pip install flask-cors
```
> En MacOS sino le funciona pip install use pip3 install
3. Haga una copia de archivo `.env.template`, renombrelo a `.env` y llene los datos que ahí le pide
```env
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB_NAME=
MYSQL_HOST=
MYSQL_PORT=
```
4. Una vez haya hecho lo anterior abra una terminal, cmd o consola de comandos, y levante el servidor con el siguiente comando:
```sh
# Asegúrese de estar situado dentro de la carpeta backend
cd backend
python run.py
```
> En MacOS si no le funciona el comando python use python3
5. Debe ver algo así en la consola lo que significa que el servidor se levanto correctamente
```sh
 * Serving Flask app 'app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### Frontend
1. Dirijase a la carpeta `frontend`, abra una terminal, cmd o consola de comandos y ejecute el siguiente comando para instalar las librerías necesarias  y que se cree la carpeta node_modules
```sh
# Asegúrese de estar situado dentro de la carpeta frontend
cd frontend
npm i
```
2. Una vez se instalen las librerías y creada la carpeta node_modules puede ejecutar el proyecto con el siguiente comando:
```sh
npm start
# Puede usar también
ng serve -o
```