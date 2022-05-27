import { ServiceAccount } from "firebase-admin";
namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
        FIREBASE_API_KEY: string;
        FIREBASE_SDK_CREDENTIAL: ServiceAccount;
    }
}
