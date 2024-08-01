import express from 'express';
import Item from '../models/items';

const router = express.Router();

router.post('/items', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

export default router;
