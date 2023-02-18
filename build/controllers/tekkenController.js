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
const mongoConfig_1 = require("../mongoConfig");
const getTekken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tekken = yield mongoConfig_1.Tekken.find();
    res.send(tekken);
});
const filterTekken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, minAge, maxAge } = req.body;
    let searchQuery = {};
    searchQuery = name && { name };
    searchQuery = minAge ? Object.assign(Object.assign({}, searchQuery), { age: { $gte: minAge } }) : searchQuery;
    searchQuery = maxAge
        ? Object.assign(Object.assign({}, searchQuery), { age: Object.assign(Object.assign({}, searchQuery.age), { $lte: maxAge }) }) : searchQuery;
    const tekken = yield mongoConfig_1.Tekken.find(searchQuery);
    res.send(tekken);
});
const createTekken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age } = req.body;
    try {
        yield mongoConfig_1.Tekken.create({ name, age });
        res.send('Tekken character created');
    }
    catch (err) {
        res.send(err._message);
    }
});
const deleteTekken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteTekken = yield mongoConfig_1.Tekken.deleteOne({ _id: id });
        if (deleteTekken.deletedCount === 0) {
            throw new Error('Tekken character not found');
        }
        res.send('Tekken character deleted');
    }
    catch (err) {
        res.send(err.message);
    }
});
const editTekken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, age } = req.body;
    try {
        const modifiedTekken = yield mongoConfig_1.Tekken.updateOne({ _id: id }, { $set: { name, age, dateUpdated: new Date() } });
        if (modifiedTekken.modifiedCount === 0) {
            throw new Error('Tekken character not found');
        }
        res.send('Tekken character updated');
    }
    catch (err) {
        res.send(err.message);
    }
});
exports.default = {
    getTekken,
    filterTekken,
    createTekken,
    deleteTekken,
    editTekken,
};
