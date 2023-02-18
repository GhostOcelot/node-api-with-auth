"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const _routes_1 = require("./router/_routes");
const mongoConfig_1 = require("./mongoConfig");
const multerConfig_1 = require("./multerConfig");
const app = Express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(Express.json());
app.use(multer({ storage: multerConfig_1.storage, fileFilter: multerConfig_1.fileFilter }).single('file'));
app.use(_routes_1.default);
app.listen(PORT, () => {
    try {
        (0, mongoConfig_1.default)();
    }
    catch (err) {
        console.log(err.message);
    }
    console.log(`server listening on port ${PORT}`);
});
