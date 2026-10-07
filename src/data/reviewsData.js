// Customer Reviews Data & Moderation Helper
export const initialReviewsData = [];

export const REVIEWS_STORAGE_KEY = 'divya_admin_customer_reviews';

export const getAllStoredReviews = () => {
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to get reviews from storage', e);
  }
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify([]));
  return [];
};

export const getApprovedReviews = () => {
  const all = getAllStoredReviews();
  return all.filter((r) => r.status === 'APPROVED');
};

export const saveAllReviews = (reviews) => {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new Event('reviews-updated'));
  } catch (e) {
    console.error('Failed to save reviews', e);
  }
};

export const submitCustomerReview = (reviewData) => {
  const all = getAllStoredReviews();
  const newReview = {
    id: Date.now(),
    date: 'Just now',
    status: 'PENDING', // STRICT: Requires admin approval before appearing on site!
    verified: false,
    ...reviewData
  };
  const updated = [newReview, ...all];
  saveAllReviews(updated);
  return newReview;
};

export const clearAllCustomerReviews = () => {
  saveAllReviews([]);
  return [];
};

// Force clear initial demo reviews from localStorage if any exist
if (typeof window !== 'undefined') {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    // Ignore storage error
  }
}
