import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import expressValidator = require("express-validator");
import { config } from "@/config";
import api from "./routers";
import * as cors from "cors";
import { scheduleService } from "./services";
import { sequelize } from "./models";
import * as path from "path";

const SEND_SUCCESS_MESSAGE = process.env.SEND_SUCCESS_MESSAGE
const CHANNEL_ID_ELEARNING_GROUP = process.env.CHANNEL_ID_ELEARNING_GROUP


console.log("Starting server with at " + process.pid + " on port " + config.server.port);
/**
 * Express configuration.
 */
const app = express();
// sequelize.sync({force: false, alter: true});

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.get("/policy", function (req, res) {
    res.render("policy");
});

app.use(
    bodyParser.json({
        limit: "50mb",
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: "50mb",
    })
);
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: config.database.sessionSecret,
// }))
app.use(expressValidator());
app.use("/api/*", cors());
app.use("/api", api);
app.set("port", config.server.port);
app.get("/", function (request, response) {
    response.send("App is running");
}).listen(app.get("port"), function () {
    if (config.server.host === "localhost") {
        scheduleService.scheduleAll();
    }
    console.log(
        `${config.server.name} started at ${config.server.protocol}://${config.server.host}:${app.get("port")}`
    );
});
