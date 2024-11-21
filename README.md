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

## Para conectarse desde el shell
mongosh "mongodb+srv://cluster0.j8nz6.mongodb.net/" --apiVersion 1 --username dswback
--> tMIpU1Zp7W8oysyw

## Para conectarse desde node.js
npm install mongodb
    Connection String: 
    mongodb+srv://dswback:tMIpU1Zp7W8oysyw@cluster0.j8nz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

## Para crear las collections users y posts

db.users.insertMany([
  { "username": "Admin", "password": "admin" },
  { "username": "adrian", "password": "adrian01" },
  { "username": "Ezequiel", "password": "ezequiel01" },
  { "username": "Richard", "password": "richard01" },
  { "username": "Alejandro", "password": "alejandro01" },
  { "username": "Trinidad", "password": "trini01" },
  { "username": "Usuario", "password": "user01" },
  { "username": "user2", "password": "1234" },
  { "username": "UserTest", "password": "123456" },
  { "username": "user8", "password": "1234" },
  { "username": "user9", "password": "123456" },
  { "username": "user10", "password": "123456" }
]);

db.posts.insertMany([
  {
    "title": "Sobre el desarrollo de nuestro blog interno en ABC Retail 1",
    "content": "Queridos compañeros de ABC Retail, estamos todos invitados a expresar aquí nuestras inquietudes esta nueva herramienta que a partir de hoy tenemos a nuestra disposición. Todos los aportes que hagamos serán considerados y de suma importancia para la planificación de modificaciones y mejoras a esta nueva herramienta de comunicación que\n\ntenemos en la empresa",
    "category": "Guias",
    "author": "Admin",
    "comments": [
      {
        "author": "Alejandro",
        "content": "Es obligatorio usarlo? Si no lo uso me rajan o como es?",
        "date": "10/18/2024, 1:45:54 PM"
      },
      {
        "author": "Richard",
        "content": "Yo quiero saber si por postear me suben el sueldo y si le puedo decir al gerente de la tienda que estoy ocupado posteando cuando me pida algo. Gracias",
        "date": "10/18/2024, 1:47:20 PM"
      },
      {
        "author": "Adrian",
        "content": "A mi me gustaron los colores",
        "date": "10/18/2024, 1:45:55 PM"
      },
      {
        "author": "Trinidad",
        "content": "Excelente el diseño minimalista!",
        "date": "10/18/2024, 1:45:56 PM"
      },
      {
        "author": "Ezequiel",
        "content": "Se puede hablar de futbol acá o es solo para cosas de la empresa?",
        "date": "10/18/2024, 1:45:56 PM"
      }
    ]
  },
  {
    "title": "Las herramientas de gestión de stock",
    "content": "No sería de mayor prioridad mejorar las actuales herramientas de gestión del stock para no tener que estar saltando entre pantallas constantemente?",
    "category": "General",
    "author": "Richard",
    "comments": [
      {
        "author": "Adrian",
        "content": "O ponerles modo oscuro que el modo claro me quema la vista!",
        "date": "10/12/2024, 12:24:57 PM"
      },
      {
        "author": "Ezequiel",
        "content": "Y poder modificar el tamaño de la tipografia que a veces se complica leer",
        "date": "10/18/2024, 11:17:26 AM"
      },
      {
        "author": "Trinidad",
        "content": "@Ezequiel quizas deberias ir al oculista. La edad no perdona",
        "date": "10/18/2024, 11:20:50 AM"
      },
      {
        "author": "Alejandro",
        "content": "Estoy de acuerdo!",
        "date": "10/12/2024, 12:18:18 PM"
      },
      {
        "author": "Admin",
        "content": "sdfsafsadf",
        "date": "10/19/2024, 12:22:19 PM"
      }
    ]
  },
  {
    "title": "Vacaciones",
    "content": "A alguien más le parece que sería buénisimo si pudieramos partir las vacaciones en tres en lugar de en dos?",
    "category": "General",
    "author": "Ezequiel",
    "comments": [
      {
        "author": "Admin",
        "content": "Interesante planteo Ezequiel. Pasa por RRHH a ver tu liquidacion.",
        "date": "10/19/2024, 12:15:42 AM"
      },
      {
        "author": "Admin",
        "content": "sdfasfdsafa",
        "date": "10/19/2024, 8:41:08 PM"
      }
    ]
  },
  {
    "title": "sdfasdfas",
    "content": "sdfasdf",
    "category": "Avisos",
    "author": "Admin",
    "comments": [
      {
        "author": "Admin",
        "content": "sdfasdfas",
        "date": "10/20/2024, 1:49:13 AM"
      }
    ]
  },
  {
    "title": "dsfasfdsaf",
    "content": "asfasdfas",
    "category": "Guias",
    "author": "Admin",
    "comments": []
  },
  {
    "title": "sdfsdfas",
    "content": "sdfasd",
    "category": "Avisos",
    "author": "Admin",
    "comments": [
      {
        "author": "Admin",
        "content": "sdfasdfa",
        "date": "10/20/2024, 1:49:28 AM"
      }
    ]
  }
]);

## Para ver el contenido de ambas collections

db.posts.find().pretty();
db.users.find().pretty();