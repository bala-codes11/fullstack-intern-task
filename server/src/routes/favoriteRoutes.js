
import express from 'express';

import protect from '../middleware/authMiddleware.js';

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../controllers/favoriteController.js';

const router = express.Router();

// All favorite routes require a valid JWT.
router.use(protect);

router.get('/', getFavorites);
router.post('/:templateId', addFavorite);
router.delete('/:templateId', removeFavorite);

export default router;
