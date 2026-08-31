import express from 'express';
import { getReviews, createReview, updateReviewStatus } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id/status', updateReviewStatus);

export default router;
