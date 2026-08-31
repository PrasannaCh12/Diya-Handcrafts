import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearchPlus, FaTimes, FaFilter, FaStar, FaWhatsapp } from 'react-icons/fa';
import { getStoredGalleryItems } from '../data/galleryData';

const baseCategories = ['All', 'Thread Work', 'Resin Art', 'Chocolates', 'Customized Chains', 'Wedding Items', 'Biscuits', 'Customized Gifts'];

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadItems = () => {
      setItems(getStoredGalleryItems());
    };
    loadItems();

    window.addEventListener('gallery-updated', loadItems);
    window.addEventListener('storage', loadItems);
    return () => {
      window.removeEventListener('gallery-updated', loadItems);
      window.removeEventListener('storage', loadItems);
    };
  }, []);

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Hero Header */}
      <section className="gallery-hero">
        <div className="container">
          <span className="gallery-badge">ARTISAN SHOWCASE</span>
          <h1 className="gallery-title">Craftsmanship Gallery</h1>
          <p className="gallery-subtitle">
            Explore our portfolio of bespoke bridal wear, heirloom resin keepsakes, artisanal gourmet confections, and personalized luxury gifts.
          </p>

          {/* Filter Pills */}
          <div className="filter-pills-wrap">
            {baseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Showcase - 1:1 Square 500x500 Cards */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setSelectedImage(item)}
              >
                <div className="gallery-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-cat-tag">{item.category}</span>
                    <h3 className="gallery-card-title">{item.title}</h3>
                    <div className="gallery-zoom-icon">
                      <FaSearchPlus /> View Details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelectedImage(null)} title="Close">
              <FaTimes />
            </button>
            <div className="modal-inner-grid">
              <div className="modal-img-col">
                <div className="modal-square-wrap">
                  <img src={selectedImage.image} alt={selectedImage.title} />
                </div>
              </div>
              <div className="modal-info-col">
                <span className="gallery-cat-tag">{selectedImage.category}</span>
                <h2>{selectedImage.title}</h2>
                <p className="modal-desc">{selectedImage.description}</p>
                <div className="modal-meta-box">
                  <div>✨ <strong>100% Handcrafted</strong> with premium materials</div>
                  <div>🎨 <strong>Customizable:</strong> Colors, sizing & engravings available</div>
                  <div>✈️ <strong>Dispatch:</strong> Express Pan-India & Worldwide</div>
                </div>
                <a
                  href={`https://wa.me/917981664314?text=${encodeURIComponent(`Hi Divya Handcrafts, I saw "${selectedImage.title}" in your gallery and would like to customize/order!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', textAlign: 'center', marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-page {
          padding-top: 1.5rem;
          padding-bottom: 5rem;
          background: #FDFBF7;
          min-height: 100vh;
        }

        .gallery-hero {
          text-align: center;
          padding: 3rem 1rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .gallery-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #C79A2B;
          background: rgba(199, 154, 43, 0.12);
          padding: 0.35rem 1rem;
          border-radius: 50px;
          margin-bottom: 0.75rem;
        }

        .gallery-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #3E2C1C;
          margin-bottom: 0.75rem;
        }

        .gallery-subtitle {
          color: #6C584C;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .filter-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .filter-pill {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          color: #3E2C1C;
          padding: 0.5rem 1.15rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .filter-pill:hover,
        .filter-pill.active {
          background: #C79A2B;
          color: #FFFFFF;
          border-color: #C79A2B;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(199, 154, 43, 0.25);
        }

        .gallery-grid-section {
          padding: 1.5rem 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .gallery-card {
          background: #FFFFFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid #F0E6D2;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(199, 154, 43, 0.18);
        }

        /* 1:1 Square 500x500 Aspect Ratio Container */
        .gallery-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #F5EFEB;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(35, 24, 18, 0.9) 0%, rgba(35, 24, 18, 0.25) 55%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
          color: #FFFFFF;
        }

        .gallery-cat-tag {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #E8C86A;
          margin-bottom: 0.25rem;
        }

        .gallery-card-title {
          font-size: 1.12rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }

        .gallery-zoom-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #FFFFFF;
          opacity: 0.9;
          font-weight: 600;
        }

        .gallery-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.25s ease;
        }

        .gallery-modal-content {
          background: #FFFDF9;
          max-width: 820px;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .gallery-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          z-index: 10;
        }

        .modal-inner-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .modal-img-col {
          background: #F5EFEB;
        }

        .modal-square-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .modal-square-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-info-col {
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .modal-info-col h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          color: #3E2C1C;
          margin: 0.4rem 0 0.8rem;
        }

        .modal-desc {
          color: #6C584C;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .modal-meta-box {
          background: #FAF5EF;
          border: 1px solid #E8D8B5;
          padding: 1rem;
          border-radius: 10px;
          font-size: 0.82rem;
          color: #3E2C1C;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        @media (max-width: 768px) {
          .modal-inner-grid {
            grid-template-columns: 1fr;
          }
          .modal-info-col {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
