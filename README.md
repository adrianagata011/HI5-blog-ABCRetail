# Blog ABC Retail 
> Desarrollado por HiFive Developers 

## Instalación de módulos Node.js 

````` 
npm init -y
npm i express
npm i body-parser
npm i fs-extra
npm i bcrypt
npm i pug
npm i express-session
````` 

## Comandos para la ejecución del sistema 
> Utilizar el comando nº 1. 

1. Sin archivo bin 

````` 
node index
````` 

2. Con archivo bin 

````` 
node bin/www
````` 

> [!NOTE] 
> Este proyecto cuenta con licencia conforme a los términos de la licencia Apache-2.0. 

# Base MongoDB

link: https://www.mongodb.com/products/platform/atlas-database
Usuario: dsw.back@gmail.com
Contraseña: desarrollo.web.back

Usuario de la base:
Usuario: dswback
Contraseña: tMIpU1Zp7W8oysyw

Para conectarse desde el shell
mongosh "mongodb+srv://cluster0.j8nz6.mongodb.net/" --apiVersion 1 --username dswback
--> tMIpU1Zp7W8oysyw

Para conectarse desde node.js
npm install mongodb