import server from "./server";
import dotenv from 'dotenv'
import color from "colors";
dotenv.config()


const port = process.env.PORT || 3000;

server.listen(port, () => console.log(color.green.bold.underline(`server is running in port: ${port}`)));