"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoConfig_1 = require("../mongoConfig");
const mongoConfig_2 = require("../mongoConfig");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } = process.env;
    try {
        if (!(email && password))
            throw new Error('Both email and password are required.');
        const user = yield mongoConfig_1.User.findOne({ email });
        if (user)
            throw new Error('this email is already registered');
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const token = jwt.sign({ email }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
        });
        const refreshToken = jwt.sign({ email }, JWT_REFRESH_TOKEN_SECRET);
        yield mongoConfig_1.User.create({ email, password: hashedPassword });
        yield mongoConfig_2.RefreshToken.create({ refreshToken });
        res.send({ token, refreshToken });
    }
    catch (err) {
        res.status(403).send({ error: err.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } = process.env;
    try {
        if (!(email && password)) {
            throw new Error('Both email and password are required.');
        }
        const user = yield mongoConfig_1.User.findOne({ email });
        if (!user)
            throw new Error("email doesn't exist");
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ email }, JWT_ACCESS_TOKEN_SECRET, {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
            });
            const refreshToken = jwt.sign({ email }, JWT_REFRESH_TOKEN_SECRET);
            yield mongoConfig_2.RefreshToken.create({ refreshToken });
            res.send({ token, refreshToken });
        }
        else {
            throw new Error('incorrect password');
        }
    }
    catch (err) {
        res.status(401).send(err.message);
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } = process.env;
    try {
        if (!refreshToken) {
            throw new Error('no refresh token');
        }
        const isRefreshOnWhiteList = yield mongoConfig_2.RefreshToken.findOne({ refreshToken });
        if (!isRefreshOnWhiteList) {
            throw new Error('user unauthorized');
        }
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);
        if (decoded) {
            const token = jwt.sign({ email: decoded.email }, JWT_ACCESS_TOKEN_SECRET, {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
            });
            res.send({ token });
        }
    }
    catch (err) {
        res.status(401).send({ error: err.message });
    }
    // }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const deleteData = yield mongoConfig_2.RefreshToken.deleteOne({ refreshToken });
        if (deleteData.deletedCount === 0) {
            throw new Error('no user to log out');
        }
        res.send({ msg: 'user logged out' });
    }
    catch (err) {
        res.status(401).send({ error: err.message });
    }
});
exports.default = { signUp, login, refreshToken, logout };
