import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import * as routes from './routes';
import createDatabaseConnection from './createDatabaseConnection';

const PORT = process.env.PORT || 3000;

const initializeExpress = (): void => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/companies', routes.companies);
    app.use('/offers', routes.offers);

    app.listen(PORT, () => {
        console.log(`Application listening on port ${PORT}`);
    });
};

const initializeApp = async(): Promise<void> => {
    await createDatabaseConnection();
    initializeExpress();
};

initializeApp();
