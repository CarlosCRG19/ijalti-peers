import { createConnection, Connection } from "typeorm";
import models from "./models";

const createDatabaseConnection = async () => {
    const connection: Connection = await createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: models,
        synchronize: true,
    });
};

export default createDatabaseConnection;
