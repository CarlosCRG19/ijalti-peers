import { createConnection, Connection } from "typeorm";
import models from "./models";

const createDatabaseConnection = async () => {
    const connection: Connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "ijalti_test",
        entities: models,
        synchronize: true,
    });
};

export default createDatabaseConnection;
