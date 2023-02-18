import { Router } from 'express';
import tekkencontrollers from '../controllers/tekkenController';

export const router = Router();

const { getTekken, filterTekken, createTekken, deleteTekken, editTekken } = tekkencontrollers;

router.get('/tekken', getTekken);
router.post('/tekken', createTekken);
router.delete('/tekken/:id', deleteTekken);
router.put('/tekken/:id', editTekken);
router.get('/filter-tekken', filterTekken);
