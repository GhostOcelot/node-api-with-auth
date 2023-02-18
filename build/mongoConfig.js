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
exports.RefreshToken = exports.User = exports.Post = exports.Tekken = void 0;
const mongoose = require("mongoose");
const tekkenSchema_1 = require("./Schema/tekkenSchema");
const postSchema_1 = require("./Schema/postSchema");
const userSchema_1 = require("./Schema/userSchema");
const refreshTokenSchema_1 = require("./Schema/refreshTokenSchema");
exports.Tekken = mongoose.model('Tekken', tekkenSchema_1.default);
exports.Post = mongoose.model('Post', postSchema_1.default);
exports.User = mongoose.model('User', userSchema_1.default);
exports.RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema_1.default);
const { MONGO_DB_URL } = process.env;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(MONGO_DB_URL);
    console.log('connected to db');
});
exports.default = main;
