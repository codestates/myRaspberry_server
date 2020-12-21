"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const typeorm_1 = require("typeorm");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const passport_1 = __importDefault(require("passport"));
// import path from "path";
const routes = __importStar(require("./routes"));
const swaggerDocument = __importStar(require("./swagger.json"));
const utils_1 = require("./utils");
require("dotenv/config");
require("./passport");
const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/myraspberry.shop/privkey.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/myraspberry.shop/cert.pem', 'utf8');
const chain = fs_1.default.readFileSync('/etc/letsencrypt/live/myraspberry.shop/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: chain };
// NOTE  - typeorm connection
typeorm_1.createConnection()
    .then(() => console.log("typeorm connection complete"))
    .catch((error) => console.log("TypeORM connection error: ", error));
const app = express_1.default();
app.all('*', (req, res, next) => {
    let protocol = req.headers['x-forwarded-proto'] || req.protocol;
    if (protocol == 'https') {
        next();
    }
    else {
        let from = `${protocol}://${req.hostname}${req.url}`;
        let to = `https://${req.hostname}${req.url}`;
        // log and redirect
        console.log(`[${req.method}]: ${from} -> ${to}`);
        res.redirect(to);
    }
});
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
//   cors({
//     origin: ['*'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//     credentials: true,
//   }),
// )
app.use(passport_1.default.initialize());
app.use(express_1.default.static('/home/ubuntu/myRaspberry_client/client/build'));
// app.get("/", (req: express.Request, res: express.Response) => {
//   res.sendFile("/home/ubuntu/myRaspberry_client/client/build/index.html");
// });
app.get(["/", "/users", "/main", "intro"], (req, res) => {
    res.sendFile("/home/ubuntu/myRaspberry_client/client/build/index.html");
});
// NOTE - Routers
app.use("/auth", routes.auth);
app.use("/movie", routes.movie);
app.use("/search", utils_1.isLoggedIn, routes.search);
app.use("/mypage", utils_1.isLoggedIn, routes.mypage);
// For api document
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// NOTE  - ERR Handler
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).send({
        message: err.message || "서버에 문제가 있습니다. 관리자에게 문의해주세요"
    });
    res.render("error");
});
const httpServer = http_1.default.createServer(app);
const httpsServer = https_1.default.createServer(credentials, app);
httpServer.listen(process.env.HTTP_PORT, () => console.log(`http server listen '${process.env.HTTP_PORT}' PORT`));
httpsServer.listen(process.env.HTTPS_PORT, () => console.log(`https server listen '${process.env.HTTPS_PORT}' PORT`));
module.exports = app;
//# sourceMappingURL=app.js.map