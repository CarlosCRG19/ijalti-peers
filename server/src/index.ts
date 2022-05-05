import express from "express";
import companiesRouter from "./routes/company";
import jobOfferRouter from "./routes/joboffer";

import createDatabaseConnection from "./createDatabaseConnection";

const initializeExpress = () => {
    const PORT = process.env.PORT || 3000;

    const app = express();

    app.use(express.json());

    app.use(companiesRouter);
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
