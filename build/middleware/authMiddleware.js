"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const verifyJWTToken = (req, res, next) => {
    var _a;
    const { JWT_ACCESS_TOKEN_SECRET } = process.env;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        if (!token) {
            throw new Error('user unauthorized');
        }
        else {
            jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
        }
        next();
    }
    catch (err) {
        res.status(403).send({ error: err.message });
    }
};
exports.default = { verifyJWTToken };
