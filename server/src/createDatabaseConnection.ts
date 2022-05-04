import { createConnection, Connection } from "typeorm";
import models from "./models";

const connection: Connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "ijalti_test",
    entities: models,
});
