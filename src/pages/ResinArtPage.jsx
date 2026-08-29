import React, { useState } from 'react';
import ResinArtCustomizer from '../components/ResinArtCustomizer';
import { FaExpand, FaHeart, FaShareAlt, FaTimes } from 'react-icons/fa';

const MASONRY_ITEMS = [
  { id: 'g1', title: 'Preserved Bridal Varmala Plaque', category: 'Varmala Preservation', image: '/custom_resin_plaque_isolated.jpg', height: '340px' },
  { id: 'g2', title: 'Monogrammed Dried Flower Keychains', category: 'Keychains', image: '/floral_resin_keychains.jpg', height: '260px' },
  { id: 'g3', title: 'Artisanal Floral Resin Bookmarks', category: 'Bookmarks', image: '/resin_bookmark.jpg', height: '300px' },
  { id: 'g4', title: 'Pressed Rose Drop Earrings', category: 'Jewelry', image: '/resin_earrings.jpg', height: '280px' },
  { id: 'g5', title: 'Forget-Me-Not Floral Oval Necklace', category: 'Pendants', image: '/resin_pendant.jpg', height: '320px' },
  { id: 'g6', title: 'Ocean Wave Coastal Resin Tray', category: 'Trays & Boards', image: '/resin_serving_tray.jpg', height: '360px' },
  { id: 'g7', title: 'Botanical Resin Coaster Set', category: 'Coasters', image: '/resin_floral_coasters.jpg', height: '270px' },
  { id: 'g8', title: 'Bespoke Floral Resin Name Plate', category: 'Name Plates', image: '/resin_name_plate.jpg', height: '310px' },
  { id: 'g9', title: 'Silent Quartz Floral Resin Clock', category: 'Clocks', image: '/resin_clock.jpg', height: '350px' },
  { id: 'g10', title: 'Personalized Photo Polaroid Frame', category: 'Photo Frames', image: '/personalized_resin_photo_frame.jpg', height: '290px' },
  { id: 'g11', title: '3D Preserved Floral Initial Monogram', category: 'Letter Art', image: '/resin_photo_plaque.jpg', height: '330px' },
  { id: 'g12', title: 'Ocean Wave Acacia Board & Coasters', category: 'Ocean Resin', image: '/resin_coasters_set.jpg', height: '310px' },
  { id: 'g13', title: 'Scalloped Floral Ring & Trinket Dish', category: 'Trinket Dishes', image: '/resin_jewelry_tray.jpg', height: '280px' },
  { id: 'g14', title: 'Geode Crystal Wall Panel', category: 'Wall Art', image: '/divya_resin_art_focused_hero_bg.jpg', height: '360px' },
  { id: 'g15', title: 'Wildflower Resin Candle Pillar Holder', category: 'Home Decor', image: '/resin_candle_holder.jpg', height: '290px' },
  { id: 'g16', title: 'Customized Rakhi Bracelet Keepsake', category: 'Custom Gifts', image: '/custom_resin_rakhi.jpg', height: '270px' },
  { id: 'g17', title: 'Milestone Birthday Floral Frame', category: 'Birthday Gifts', image: '/personalized_resin_photo_frame_keepsake_uploaded.jpg', height: '340px' },
  { id: 'g18', title: 'Gold Leaf Resin Coaster Set with Holder', category: 'Luxury Accessories', image: '/resin_art_category.jpg', height: '300px' }
];

const ResinArtPage = ({ onSelectProduct, onAddToCart }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, MASONRY_ITEMS.length));
  };

  return (
    <div style={{ paddingTop: '2rem' }}>
      <ResinArtCustomizer onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />

      {/* Masonry / Pinterest Gallery Section */}
      <section className="resin-gallery-section">
        <div className="container">
          <div className="gallery-header-wrap text-center">
            <span className="gallery-subtitle">✨ ARTISANAL INSPIRATION</span>
            <h2 className="gallery-main-title">Resin Art Inspiration Gallery</h2>
            <p className="gallery-desc">
              Explore our Pinterest-style showcase of custom preserved varmalas, ocean wave serving trays, handmade coasters, initial keychains, and luxury home keepsakes.
            </p>
            <div className="gallery-divider">
              <span className="g-line"></span>
              <span className="g-motif">🪷</span>
              <span className="g-line"></span>
            </div>
          </div>

          {/* Pinterest Masonry Grid */}
          <div className="pinterest-masonry-grid">
            {MASONRY_ITEMS.slice(0, visibleCount).map((item) => (
              <div
                key={item.id}
                className="masonry-item-card"
                onClick={() => setLightboxImage(item)}
              >
                <div className="masonry-img-wrap" style={{ height: item.height }}>
                  <img src={item.image} alt={item.title} className="masonry-img" loading="lazy" />
                  <div className="masonry-overlay">
                    <span className="masonry-cat-badge">{item.category}</span>
                    <h3 className="masonry-item-title">{item.title}</h3>
                    <div className="masonry-actions-row">
                      <span className="masonry-expand-btn"><FaExpand /> View Full</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < MASONRY_ITEMS.length && (
            <div className="load-more-wrap text-center">
              <button type="button" className="btn-load-more-resin" onClick={handleLoadMore}>
                ✨ Load More Designs ({MASONRY_ITEMS.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setLightboxImage(null)}>
              <FaTimes />
            </button>
            <div className="lightbox-img-wrap">
              <img src={lightboxImage.image} alt={lightboxImage.title} className="lightbox-full-img" />
            </div>
            <div className="lightbox-details">
              <span className="lightbox-cat">{lightboxImage.category}</span>
              <h2>{lightboxImage.title}</h2>
              <p>Handcrafted with premium non-yellowing epoxy resin, real botanicals, and metallic gold leaf accents by Divya Handcrafts.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .resin-gallery-section {
          padding: 4rem 0 6rem 0;
          background: #FFFDF9;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .gallery-header-wrap {
          max-width: 800px;
          margin: 0 auto 3rem auto;
        }

        .gallery-subtitle {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #C89B3C;
          text-transform: uppercase;
        }

        .gallery-main-title {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 700;
          color: #2D2523;
          margin: 8px 0 16px 0;
        }

        .gallery-desc {
          font-size: 1.05rem;
          color: #6E5752;
          line-height: 1.7;
        }

        .gallery-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 24px;
        }

        .g-line {
          height: 1px;
          width: 80px;
          background: linear-gradient(90deg, transparent, #C89B3C, transparent);
        }

        .g-motif {
          color: #C89B3C;
          font-size: 20px;
        }

        /* Pinterest Masonry Layout */
        .pinterest-masonry-grid {
          column-count: 4;
          column-gap: 1.5rem;
        }

        .masonry-item-card {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          border-radius: 18px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1.5px solid rgba(110, 58, 70, 0.1);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
        }

        .masonry-item-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
          border-color: #E8C86A;
        }

        .masonry-img-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .masonry-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .masonry-item-card:hover .masonry-img {
          transform: scale(1.08);
        }

        .masonry-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(45, 37, 35, 0.85) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #FFFFFF;
        }

        .masonry-item-card:hover .masonry-overlay {
          opacity: 1;
        }

        .masonry-cat-badge {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #E8C86A;
          margin-bottom: 4px;
        }

        .masonry-item-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .masonry-actions-row {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: #FFFDF9;
        }

        .masonry-expand-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .load-more-wrap {
          margin-top: 3.5rem;
        }

        .btn-load-more-resin {
          background: linear-gradient(135deg, #FFFDF9 0%, #FAF5EA 100%);
          border: 1.5px solid #C89B3C;
          color: #7A5C1B;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.95rem 2.5rem;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(200, 155, 60, 0.18);
          transition: all 0.3s ease;
        }

        .btn-load-more-resin:hover {
          background: #C89B3C;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200, 155, 60, 0.35);
        }

        /* Lightbox Overlay */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox-content-card {
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          max-width: 680px;
          width: 100%;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .lightbox-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .lightbox-img-wrap {
          max-height: 480px;
          overflow: hidden;
          background: #FFFDF9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-full-img {
          width: 100%;
          max-height: 480px;
          object-fit: contain;
        }

        .lightbox-details {
          padding: 24px;
        }

        .lightbox-cat {
          font-size: 0.75rem;
          font-weight: 700;
          color: #C89B3C;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .lightbox-details h2 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #2D2523;
          margin: 4px 0 10px 0;
        }

        .lightbox-details p {
          font-size: 0.9rem;
          color: #5A4A42;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .pinterest-masonry-grid {
            column-count: 3;
          }
        }

        @media (max-width: 768px) {
          .pinterest-masonry-grid {
            column-count: 2;
            column-gap: 1rem;
          }
          .gallery-main-title {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .pinterest-masonry-grid {
            column-count: 2;
          }
        }
      `}</style>
    </div>
  );
};

export default ResinArtPage;
