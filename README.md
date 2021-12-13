# BackEnd

El entorno utilizado es Node.js y mysql  
Los scripts para la creación de la Base de Datos, tablas e inserción inicial de datos, se encuentran en el archivo database/db_scripts.sql  
El Framework es Express  
Gestor de paquetes: NPM (Node Package Manager)  

### Librerías

* cors
* dotenv
* express
* express-rate-limit
* helmet
* jsonwebtoken
* mysql2
* sequelize
* swagger-ui-express

### Instalación Librerías y Dependencias
npm install cors dotenv express express-rate-limit helmet jsonwebtoken mysql2 sequelize swagger-ui-express nodemon

### Inicialización
nodemon app

# FrontEnd

El Framework utilizado es VUE versión 2.6.14  
Framework CSS: bootstrap, bootstrap-vue

### Dependencias (package.json)
* @babel/polyfill
* bootstrap
* bootstrap-vue
* core-js
* mutationobserver-shim
* popper.js
* portal-vue
* vue
* vue-alertify
* vue-router
* @vue/cli-plugin-babel
* @vue/cli-plugin-eslint
* @vue/cli-plugin-router
* @vue/cli-service
* babel-eslint
* eslint
* eslint-plugin-vue
* sass
* sass-loader
* vue-cli-plugin-bootstrap-vue
* vue-template-compiler

### Inicialización
npm run start

### Usuarios acceso LogIn

#### Usuario con privilevios de Admnistrador para gestión de empleados (usuarios)
email: admi@admi.com  
clave: admi  

#### Usuario sin privilevios para gestión de empleados (usuarios)
email: user@user.com  
clave: user  