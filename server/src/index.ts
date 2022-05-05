import createDatabaseConnection from "./createDatabaseConnection";

createDatabaseConnection().then(() => {
    console.log("Database created");
});
