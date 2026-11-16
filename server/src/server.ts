import express, { Application } from "express";
import router from "./router";
import db from "./config/db";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

import color from "colors";

// conectar db
const server: Application = express();


export const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        // console.log(color.green.bold.underline('Conexión exitosa a la base de datos'));
    } catch (error) {
        // console.log(error);
        console.log(color.red.bold.underline('Hubo error al intentar conectarse a la base de datos'));

    }
}

connectDB();



server.use(express.json());
server.use("/api/products", router);
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))

export default server;