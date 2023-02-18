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
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const posts = yield mongoConfig_1.Post.find({ userId });
        res.send(posts);
    }
    catch (err) {
        res.status(404).send({ error: err.message });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    try {
        const post = yield mongoConfig_1.Post.findById(postId);
        if (!post) {
            throw new Error("requested post doesn't exist");
        }
        res.send(post);
    }
    catch (err) {
        res.status(403).send({ error: err.message });
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    try {
        yield mongoConfig_1.Post.create({
            title,
            description,
            userId: userId,
        });
        res.send({ msg: 'Post created' });
    }
    catch (err) {
        res.send({ error: err.message });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPost = yield mongoConfig_1.Post.deleteOne({ _id: id });
        if (deletedPost.deletedCount === 0) {
            throw new Error('Post not found');
        }
        res.send({ msg: 'Post deleted' });
    }
    catch (err) {
        res.send({ error: err.message });
    }
});
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const modifiedPost = yield mongoConfig_1.Post.updateOne({ _id: id }, { $set: { title, description, dateUpdated: new Date() } });
        if (modifiedPost.modifiedCount === 0) {
            throw new Error('Post not found');
        }
        res.send({ msg: 'Post updated' });
    }
    catch (err) {
        res.send({ error: err.message });
    }
});
const uploadFile = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            throw new Error('Selected file is not an image');
        }
        console.log(file);
        res.send({ file: file });
    }
    catch (err) {
        res.status(422).send({ error: err.message });
    }
};
exports.default = { getPosts, createPost, deletePost, editPost, getPostById, uploadFile };
