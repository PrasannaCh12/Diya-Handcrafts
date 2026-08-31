import { initialReviewsData } from '../../src/data/reviewsData.js';

let reviewsStore = [...initialReviewsData];

export const getReviews = (req, res) => {
  res.json({ success: true, reviews: reviewsStore });
};

export const createReview = (req, res) => {
  const reviewData = req.body;
  const newReview = {
    ...reviewData,
    id: `rev-${Date.now()}`,
    status: reviewData.status || 'PENDING',
    date: new Date().toISOString().split('T')[0],
    rating: Number(reviewData.rating || 5)
  };

  reviewsStore = [newReview, ...reviewsStore];
  res.status(201).json({ success: true, review: newReview });
};

export const updateReviewStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const idx = reviewsStore.findIndex((r) => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }

  reviewsStore[idx].status = status;
  res.json({ success: true, review: reviewsStore[idx] });
};
