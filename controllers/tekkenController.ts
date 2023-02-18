import * as Express from 'express';
import { Tekken } from '../mongoConfig';

const getTekken = async (req: Express.Request, res: Express.Response) => {
  const tekken = await Tekken.find();
  res.send(tekken);
};

const filterTekken = async (req: Express.Request, res: Express.Response) => {
  const { name, minAge, maxAge } = req.body;

  let searchQuery: any = {};
  searchQuery = name && { name };
  searchQuery = minAge ? { ...searchQuery, age: { $gte: minAge } } : searchQuery;
  searchQuery = maxAge
    ? { ...searchQuery, age: { ...searchQuery.age, $lte: maxAge } }
    : searchQuery;

  const tekken = await Tekken.find(searchQuery);
  res.send(tekken);
};

const createTekken = async (req: Express.Request, res: Express.Response) => {
  const { name, age } = req.body;

  try {
    await Tekken.create({ name, age });
    res.send('Tekken character created');
  } catch (err: any) {
    res.send(err._message);
  }
};

const deleteTekken = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;

  try {
    const deleteTekken = await Tekken.deleteOne({ _id: id });
    if (deleteTekken.deletedCount === 0) {
      throw new Error('Tekken character not found');
    }
    res.send('Tekken character deleted');
  } catch (err: any) {
    res.send(err.message);
  }
};

const editTekken = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    const modifiedTekken = await Tekken.updateOne(
      { _id: id },
      { $set: { name, age, dateUpdated: new Date() } },
    );
    if (modifiedTekken.modifiedCount === 0) {
      throw new Error('Tekken character not found');
    }
    res.send('Tekken character updated');
  } catch (err: any) {
    res.send(err.message);
  }
};

export default {
  getTekken,
  filterTekken,
  createTekken,
  deleteTekken,
  editTekken,
};
