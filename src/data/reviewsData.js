// Customer Reviews Data & Moderation Helper
export const initialReviewsData = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Hyderabad, TS',
    rating: 5,
    date: '2 weeks ago',
    category: 'Bridal Bangles',
    comment: 'The bridal silk thread bangles custom-made for my wedding reception were breathtaking! The color match with my Kanjeevaram saree was 100% exact. Every guest asked where I got them from!',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1611591475140-be3e9ed9e2d7?auto=format&fit=crop&w=600&q=80',
    status: 'APPROVED' // 'PENDING', 'APPROVED', 'REJECTED'
  },
  {
    id: 2,
    name: 'Pooja Reddy',
    city: 'Bangalore, KA',
    rating: 5,
    date: '1 month ago',
    category: 'Resin Flower Clock',
    comment: 'I preserved my wedding Varmala flowers in a 14-inch resin wall clock. Divya and her team handled the flowers with so much care. The golden numbers and clarity of the resin are world-class.',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    status: 'APPROVED'
  },
  {
    id: 3,
    name: 'Sneha Patel',
    city: 'Mumbai, MH',
    rating: 5,
    date: '3 weeks ago',
    category: 'Handmade Chocolates',
    comment: 'Ordered 50 custom chocolate gift hampers for my sister’s engagement. The roasted almond rochers and Belgian dark truffles are addictive! The luxury gold foil packaging was top-notch.',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    status: 'APPROVED'
  },
  {
    id: 4,
    name: 'Dr. Radhika Rao',
    city: 'Chennai, TN',
    rating: 5,
    date: '1 month ago',
    category: 'Customized Chains',
    comment: 'Gifted personalized name engraved chains to my bridesmaids. The craftsmanship and finish are immaculate — no tarnishing even after daily wear. Super fast shipping too!',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    status: 'APPROVED'
  },
  {
    id: 5,
    name: 'Kavitha M.',
    city: 'Vijayawada, AP',
    rating: 5,
    date: '2 months ago',
    category: 'Eggless Biscuits',
    comment: 'The pure ghee ragi cookies taste just like authentic homemade grandmother cookies without any preservatives. My kids love them as a healthy evening snack.',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    status: 'APPROVED'
  }
];

export const REVIEWS_STORAGE_KEY = 'divya_admin_customer_reviews';

export const getAllStoredReviews = () => {
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to get reviews from storage', e);
  }
  return initialReviewsData;
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
