import * as Express from 'express';
import { Post } from '../mongoConfig';

interface IQuery {
  limit: string;
  page: string;
}

const getPosts = async (req: Express.Request, res: Express.Response) => {
  const { userId } = req.body;
  const { limit, page } = req.query as unknown as IQuery;
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);

  try {
    const count = await Post.find({ userId }).count();

    const offset = (parsedPage - 1) * parsedLimit;
    const firstPage = 1;
    const lastPage = Math.ceil(count / parsedLimit);
    const previousPage = parsedPage - 1;
    const nextPage = parsedPage + 1;
    const currentPage = parsedPage;

    const posts = await Post.find({ userId }).limit(parsedLimit).skip(offset);
    res.send({ posts, currentPage, firstPage, lastPage, previousPage, nextPage });
  } catch (err: any) {
    res.status(404).send({ error: err.message });
  }
};

const getPostById = async (req: Express.Request, res: Express.Response) => {
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("requested post doesn't exist");
    }
    res.send(post);
  } catch (err: any) {
    res.status(403).send({ error: err.message });
  }
};

const createPost = async (req: Express.Request, res: Express.Response) => {
  const { title, description, userId } = req.body;
  try {
    await Post.create({
      title,
      description,
      userId: userId,
    });
    res.send({ msg: 'Post created' });
  } catch (err: any) {
    res.send({ error: err.message });
  }
};

const deletePost = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.deleteOne({ _id: id });
    if (deletedPost.deletedCount === 0) {
      throw new Error('Post not found');
    }
    res.send({ msg: 'Post deleted' });
  } catch (err: any) {
    res.send({ error: err.message });
  }
};

const editPost = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const modifiedPost = await Post.updateOne(
      { _id: id },
      { $set: { title, description, dateUpdated: new Date() } },
    );
    if (modifiedPost.modifiedCount === 0) {
      throw new Error('Post not found');
    }
    res.send({ msg: 'Post updated' });
  } catch (err: any) {
    res.send({ error: err.message });
  }
};

const uploadFile = (req: Express.Request, res: Express.Response) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('Selected file is not an image');
    }
    console.log(file);
    res.send({ file: file });
  } catch (err: any) {
    res.status(422).send({ error: err.message });
  }
};

export default { getPosts, createPost, deletePost, editPost, getPostById, uploadFile };
