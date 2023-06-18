import * as dotenv from "dotenv";
import { config } from "@/config";

const os = require("os");
const sql = require("./database");
dotenv.config({ silent: true });
export default {
    server: {
        host: process.env.HOST_NAME,
        protocol: "http",
        debug: true,
        name: "SERVER NAME",
        port: process.env.PORT || 8765,
        secret: process.env.SERVER_SECRET
    },
    database: {
        mongo: process.env.MONGOLAB_URI,
        sessionSecret: process.env.SESSION_SECRET,
        defaultPageSize: 50,
        sql: sql.production
    },
    firebase: {
        "type": process.env.FIREBASE_TYPE,
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": process.env.FIREBASE_AUTH_URI,
        "token_uri": process.env.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
    },
    socket: {
        port: 9888
    },
    sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY,
        sender: process.env.SENDGRID_SENDER_EMAIL
    },
    firebaseDbURL: process.env.FIREBASE_DATABASE_URL,
    toss: {
        clientKey: process.env.TOSS_CLIENT_KEY,
        secretKey: process.env.TOSS_SECRET_KEY
    },
};
