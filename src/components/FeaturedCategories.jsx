import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const collections = [
  {
    id: 'threadwork',
    title: 'Thread Work',
    subtitle: 'Custom Velvet & Silk Thread Sets',
    icon: '🧵',
    route: '/threadwork',
    image: '/blue_peacock_bangles.jpg',
    desc: 'Handcrafted bridal bangles, silk thread cuffs & Kundan stone jewelry.'
  },
  {
    id: 'resinart',
    title: 'Resin Art',
    subtitle: 'Floral Clocks & Memory Geodes',
    icon: '🎨',
    route: '/resinart',
    image: '/resin_art_category.jpg',
    desc: 'Custom preserved floral frames, anniversary plaques, coasters & keychains.'
  },
  {
    id: 'chocolates',
    title: 'Chocolates',
    subtitle: 'Kunafa & Belgian Dark Chocolates',
    icon: '🍫',
    route: '/chocolates',
    image: '/kunafa_chocolate.png',
    desc: 'Artisanal handmade luxury chocolates, truffles & customized gift boxes.'
  },
  {
    id: 'biscuits',
    title: 'Biscuits',
    subtitle: 'Eggless Pure Ghee & Whole Grain Cookies',
    icon: '🍪',
    route: '/biscuits',
    image: '/ragi_biscuits.jpg',
    desc: 'Freshly baked artisanal gourmet butter biscuits & cookies.'
  },
  {
    id: 'wedding',
    title: 'Wedding & Marriage Items',
    subtitle: 'Bridal Trays, Kankanams & Favors',
    icon: '💍',
    route: '/wedding-marriage-items',
    image: '/kundan_stone_bangles.jpg',
    desc: 'Bespoke bridal thali plates, wedding favors & ceremonial keepsakes.'
  },
  {
    id: 'chains',
    title: 'Customized Chains',
    subtitle: 'Name Engraved Chains & Pendants',
    icon: '📿',
    route: '/customized-chains',
    image: '/custom_chain_01.jpg',
    desc: 'Handcrafted personalized name chains, pendants & charms.'
  },
  {
    id: 'gifts',
    title: 'Customized Gifts',
    subtitle: 'Bespoke Gift Hampers & Keepsakes',
    icon: '🎁',
    route: '/customized-gifts',
    image: '/custom_gift_hamper.jpg',
    desc: 'Personalized gift hampers, photo frames & bespoke keepsakes.'
  },
  {
    id: 'dolls',
    title: 'Customized Dolls',
    subtitle: 'Handcrafted Theme Dolls & Couple Figurines',
    icon: '🧸',
    route: '/customized-dolls',
    image: '/bridal_bangle_set.jpg',
    desc: 'Handcrafted custom miniature dolls & couple figurines.'
  }
];

const FeaturedCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="explore-studio-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="tw-hero-subtitle">✨ DIYA HANDCRAFTS ATELIER</div>
          <h2 className="tw-hero-title">Explore Collections Studio</h2>
          <p className="tw-hero-description" style={{ maxWidth: '750px', margin: '0 auto 1.5rem auto' }}>
            Discover our handcrafted luxury collections crafted with love, traditional artistry, and premium materials for every special occasion.
          </p>

          {/* Premium Decorative Divider */}
          <div className="tw-hero-divider">
            <span className="divider-line left-line"></span>
            <span className="divider-motif">🪷</span>
            <span className="divider-line right-line"></span>
          </div>
        </div>

        {/* Collection Cards Grid */}
        <div className="explore-studio-grid">
          {collections.map((item) => (
            <div
              key={item.id}
              className="studio-card glass-card"
              onClick={() => navigate(item.route)}
            >
              <div className="studio-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="studio-card-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="studio-icon-badge">{item.icon}</div>
              </div>

              <div className="studio-card-body">
                <span className="studio-card-sub">{item.subtitle}</span>
                <h3 className="studio-card-title">{item.title}</h3>
                <p className="studio-card-desc">{item.desc}</p>
                <div className="studio-card-link">
                  <span>Explore Collection</span>
                  <FaArrowRight className="arrow-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .explore-studio-section {
          padding: 4.5rem 0;
          background: #FAF8F5;
        }

        .explore-studio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
        }

        @media (max-width: 1200px) {
          .explore-studio-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 868px) {
          .explore-studio-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 576px) {
          .explore-studio-grid {
            grid-template-columns: 1fr;
          }
        }

        .studio-card {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .studio-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(212, 175, 55, 0.18);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .studio-card-img-wrap {
          position: relative;
          width: 100%;
          height: 190px;
          background: #FAF5EE;
          overflow: hidden;
        }

        .studio-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .studio-card:hover .studio-card-img {
          transform: scale(1.06);
        }

        .studio-icon-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .studio-card-body {
          padding: 1.25rem 1.25rem 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .studio-card-sub {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C89B3C;
          margin-bottom: 6px;
        }

        .studio-card-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0 0 8px 0;
        }

        .studio-card-desc {
          font-size: 0.85rem;
          line-height: 1.5;
          color: #6B5E57;
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }

        .studio-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #C89B3C;
          transition: gap 0.3s ease;
        }

        .studio-card:hover .studio-card-link {
          gap: 12px;
          color: #8C7032;
        }

        .arrow-icon {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .studio-card:hover .arrow-icon {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;
