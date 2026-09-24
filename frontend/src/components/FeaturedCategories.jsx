import React from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'thread-work',
    name: 'Thread Work',
    subtitle: 'Bridal Bangle Sets',
    image: '/bridal_bangle_set.jpg',
    link: '/threadwork'
  },
  {
    id: 'resin-art',
    name: 'Resin Art',
    subtitle: 'Floral Keepsakes',
    image: '/resin_art_category.jpg',
    link: '/resinart'
  },
  {
    id: 'chocolates',
    name: 'Chocolates',
    subtitle: 'Kunafa Delights',
    image: '/kunafa_chocolate.png',
    link: '/chocolates'
  },
  {
    id: 'biscuits',
    name: 'Biscuits',
    subtitle: 'Healthy Ragi Biscuits',
    image: '/ragi_biscuits.jpg',
    link: '/biscuits'
  },
  {
    id: 'customized-chains',
    name: 'CUSTOMIZED CHAINS',
    subtitle: 'Personalized Chain Designs',
    image: '/custom_chain_01.jpg',
    link: '/customized-chains'
  },
  {
    id: 'wedding-marriage-items',
    name: 'WEDDING & MARRIAGE ITEMS',
    subtitle: 'Beautiful Wedding Essentials',
    image: '/royal_emerald_peacock_set.jpg',
    link: '/wedding-marriage-items'
  },
  {
    id: 'customized-gifts',
    name: 'CUSTOMIZED GIFTS',
    subtitle: 'Thoughtful Personalized Gifts',
    image: '/personalized_resin_photo_frame.jpg',
    link: '/customized-gifts'
  },
  {
    id: 'customized-dolls',
    name: 'CUSTOMIZED DOLLS',
    subtitle: 'Personalized Handmade Dolls',
    image: '/customized_dolls_category.jpg',
    link: '/customized-dolls'
  }
];

const FeaturedCategories = () => {
  const navigate = useNavigate();

  return (
    <section id="categories" className="featured-categories-section">
      <div className="container categories-container">
        <div className="categories-header text-center">
          <span className="categories-badge">✨ Handcrafted Collections</span>
          <h2 className="categories-title">Explore Collections</h2>
          <p className="categories-subtitle">
            Discover artisanal treasures handcrafted with love, precision, and passion for your special moments.
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="featured-cat-card"
              onClick={() => navigate(cat.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(cat.link);
                }
              }}
            >
              <div className="featured-cat-img-wrap">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className="featured-cat-label">
                <span className="cat-tag">{cat.name}</span>
                <h4 className="cat-sub">{cat.subtitle}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .featured-categories-section {
          padding: 4.5rem 1.5rem 5.5rem 1.5rem;
          background: linear-gradient(180deg, #FFFDF9 0%, #FDF5F6 50%, #FFFDF9 100%);
          position: relative;
          z-index: 5;
        }

        .categories-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .categories-header {
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .categories-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #FFF9EA 0%, #F5E8C7 100%);
          color: #8C6D23;
          border: 1px solid rgba(212, 175, 55, 0.45);
          padding: 0.32rem 1.15rem;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 4px 12px rgba(212, 175, 55, 0.12);
          margin-bottom: 0.85rem;
        }

        .categories-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #3D2B1F;
          margin: 0 0 0.6rem 0;
          line-height: 1.2;
        }

        .categories-subtitle {
          font-size: 1.05rem;
          color: #7A6965;
          margin: 0;
          max-width: 620px;
          line-height: 1.6;
        }

        /* 🟢 Category Grid Responsive Settings */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
          }
          .featured-categories-section {
            padding: 3rem 1rem 4rem 1rem;
          }
          .categories-title {
            font-size: 1.85rem;
          }
          .categories-subtitle {
            font-size: 0.92rem;
          }
        }

        /* 🟢 Card Aesthetics: Square image, Rounded Corners, Subtle Gold Border, Soft Shadow, Smooth Zoom */
        .featured-cat-card {
          background: #FFFFFF;
          border: 1px solid rgba(200, 155, 60, 0.28);
          border-radius: 20px;
          padding: 0.9rem;
          box-shadow: 0 8px 24px rgba(61, 43, 31, 0.05), 0 2px 6px rgba(200, 155, 60, 0.08);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
          cursor: pointer;
          user-select: none;
        }

        .featured-cat-card:hover {
          transform: translateY(-6px);
          border-color: #D4AF37;
          box-shadow: 0 16px 36px rgba(61, 43, 31, 0.11), 0 4px 14px rgba(200, 155, 60, 0.22);
        }

        .featured-cat-img-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 14px;
          overflow: hidden;
          background: #FAF8F5;
          border: 1px solid rgba(232, 200, 106, 0.3);
        }

        .featured-cat-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .featured-cat-card:hover .featured-cat-img-wrap img {
          transform: scale(1.09);
        }

        .featured-cat-label {
          padding: 0.1rem 0.2rem;
        }

        .cat-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #C89B3C;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 2px;
        }

        .cat-sub {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0;
          line-height: 1.3;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;
