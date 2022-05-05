import express from "express";
import companiesRouter from "./routes/company";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(companiesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
