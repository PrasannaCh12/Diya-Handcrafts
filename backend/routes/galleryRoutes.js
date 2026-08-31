import express from 'express';
import { getGalleryItems, createGalleryItem } from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getGalleryItems);
router.post('/', createGalleryItem);

export default router;
