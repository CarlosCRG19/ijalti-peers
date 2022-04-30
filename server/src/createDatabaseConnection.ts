import { createConnection, Connection } from 'typeorm';

import * as models from './models';

const createDatabaseConnection = async (): Promise<Connection | undefined> => {
    try {
        const databaseConnection = await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '',
            database: 'fake_project',
            entities: Object.values(models),
            synchronize: true
        });

        return databaseConnection;
    } catch(error) {
        console.log(error);
    }
};

export default createDatabaseConnection;