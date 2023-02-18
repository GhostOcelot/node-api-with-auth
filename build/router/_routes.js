"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsRoutes_1 = require("./postsRoutes");
const tekkenRoutes_1 = require("./tekkenRoutes");
const authRoutes_1 = require("./authRoutes");
const router = (0, express_1.Router)();
router.use(postsRoutes_1.router, tekkenRoutes_1.router, authRoutes_1.router);
exports.default = router;
