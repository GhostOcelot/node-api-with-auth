"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.storage = void 0;
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (request, file, cb) => cb(null, 'files'),
    filename: (req, file, cb) => cb(null, file.originalname),
});
exports.storage = storage;
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
