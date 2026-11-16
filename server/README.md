## dotenv
este paquete me permite utilizar las variables de entorno establecidas en el archivo .env y se importan el dotenv, se instancia el metodo dotenv.config en el archivo en el que se requiera. 


## colors
este paquete sirve para mejorar la visibilidad de los console.log en la consola de node.

## express
El paquete de Express sirve para crear servidores y aplicaciones backend de forma rápida y sencilla utilizando Node.js. 
Sin Express, programar un servidor en Node.js requiere escribir mucho código repetitivo solo para entender las peticiones de los usuarios. Express actúa como una capa organizadora que facilita esta tarea.
Funciones de express: 
- manejo de rutas
- Control de peticiones HTTP
- Uso de middlewares
- Respuestas rapidas

## Decoradores
Es una sintaxis que usualmente inician con @ y lo que hace es llamar una funcion


## Sequelize
Sequelize es un ORM (Mapeador Objeto-Relacional) para Node.js y TypeScript que sirve para gestionar y crear tablas en bases de datos relacionales usando código en JavaScript o TypeScript en lugar de escribir consultas SQL directas.

## Crear base de datos con render y utilizar table plus para visualizarla
luego de crear la base de datos, la información de conexión que esta en render hay que colocarla en la variable de entorno del proyecto y en la configuración de conexión de table plus.
- en la variable de entorno: defino una variable DATABASE_URL y coloco el external database que esta en render y al final agrego ?ssl=true  esto va a permitir forzar la conexión
* en table plus, en el campo de host coloco de la url anterior los datos que aparecen luego del @ hasta el .com.
* El resto de campos de table plus los coloco como aparecen en render. 


## put (actualizar)
Put es un metodo que hace modificaciones totales sobre un registro de la base de datos, es decir, reemplaza el elemento con los datos que le envies en la actualización. Para proteger los datos de los campos que no se vaya a actualizar, el metodo update de sequelize hace modificaciones parciales, lo cual protege de que se conserve los datos que no son modificados, si solo se pasa un campo, se modifica ese campo y el resto de datos quedan igual, no se pierden. Pero puedo agregar validacion en el router aunque update es una protección al momento de actualizar datos.

## patch (actualizar)
El método patch reemplaza solamente lo que le envias, manteniendo los datos no modificados.

## Diferencias ester put y patch
PUT: se utiliza para actualizar o reemplazar completamente un registro existente con los datos proporcionados en la solicitud put. Se utiliza para actualizar completamente un recurso con los datos enviados.

PATCH: Se utiliza para realizar modificaciones parciales en un registro existenete, realiza cambios especificos en los datos sin afectar el resto de la información. Se utiliza para modificar parte de un recurso

## pruebas con jest
- instalaciones
pnpm i -D supertest @types/supertest jest @types/jest ts-jest

pnpm create jest      crea el archivo de cofiguraciónn de 


# HTTP response status codes
* En esta URL se encuentra información de los codigos de respuesta de las peticiones HTTP   
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status


# limpiar la base de datos en las pruebas
* para las pruebas utiliza una base de datos local y configura una función para eliminar los datos cada vez que se ejecute una prueba
* crea en la carpeta raiz una carpeta data, dentro un archivo index.ts
* En el archivo colocar esto
<!-- import { exit } from "node:process";
import db from "../config/db";
import color from "colors";


const clearDB = async () => {

    try {
        await db.sync({ force: true });
        console.log(color.red.bold.underline('Datos eliminados correctamente'));
        exit(0);

    } catch (error) {
        console.log(error);
        exit(1)
    }
}

if (process.argv[2] === '--clear') {
    clearDB();
} -->
* en el archivo package.json, en los scripts coloca 
"pretest": "ts-node ./src/data --clear"
* ese codigo eliminara de manera automatica los datos creados en la base de datos durante las pruebas


# Code coverage - para medir cuanto codigo probado
es una metrica para medir la cantidad de codigo fuente que ha sido cubierto con ciertas pruebas. mide el porcentaje del codigo que ha sido probado.
- <60%  no se suficiente>
- entre 60 y 80% es un buen numero, se puede mejorar
- > 80% es suficiente y una buena medida
- 100% es dificil llegar a ese porcentaje, hay que escribir muchas pruebas y mucho de esas pruebas sonn redundantes.
- > en el packege.json colocar en los scripts 
"test:coverage": "pnpm run pretest && jest --detectOpenHandles --coverage"


## documentación de API's
Es un contenido tecnico que describe una API en detalle, incluye instrucciones de como utilizarla de manera correcta, cuales son los endpoints soportados, tipos de petición, que valores soporta y más.
Una vez que una API es publicada, la documentación se asegura que otras herramientas (internas o externas) sepan que se puede hacer y como utilizarla

- Por que documentar una API
La principal razón es para que sea utilizada de forma correcta.
hara claro que funcionalidad hay disponible y los usuarios puedan sacarle el maximo provecho.
Una buena documentación reduce costos de soporte.
- La herramienta llamada swagger simplifica bastante la documentación de una API
Instala swagger     pnpm add swagger-jsdoc    swagger-ui-

