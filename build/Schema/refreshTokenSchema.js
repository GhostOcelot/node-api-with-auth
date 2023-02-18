"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const RefreshTokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
});
exports.default = RefreshTokenSchema;
