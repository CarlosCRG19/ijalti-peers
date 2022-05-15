import { createConnection, Connection, ConnectionOptions } from "typeorm";
import models from "./models";

const getConnectionCredentials = () => {
    if (process.env.DATABASE_URL) {
        return ({
            url: process.env.DATABASE_URL,
            extra: { rejectUnauthorized: false }
        });
    }

    return ({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
}

const createDatabaseConnection = async () : Promise<Connection> => {
    let connectionOptions: ConnectionOptions = {
        type: "postgres",
        entities: models,
        synchronize: true,
    }

    Object.assign(connectionOptions, getConnectionCredentials());

    const connection: Connection = await createConnection(connectionOptions);

    return connection;
};

export default createDatabaseConnection;
