import "dotenv/config"
import cors from "cors";
import express from "express";

import createDatabaseConnection from "./createDatabaseConnection";
import { aspirantRouter, companyRouter, jobOfferRouter } from "./routes";

const initializeExpress = () => {
    const PORT = process.env.PORT;

    const app = express();

	app.use(cors());
    app.use(express.json());

    app.use(aspirantRouter);
    app.use(companyRouter);
    app.use(jobOfferRouter);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

const initializeApp = async (): Promise<void> => {
    await createDatabaseConnection();
    initializeExpress();
};

initializeApp();
