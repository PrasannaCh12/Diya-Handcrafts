import React from 'react';
import { MasterDetailsModal } from './MasterCategoryCustomizer';

export const WEDDING_PRODUCTS = [];

export const WeddingItemsDetailsModal = MasterDetailsModal;

const WeddingItemsCustomizer = () => {
  return (
    <section id="wedding-items-customizer" className="customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">💒 ROYAL BRIDAL ATELIER</div>
          <h2 className="tw-hero-title">Wedding & Marriage Collection</h2>
          <p className="tw-hero-description">
            Explore <span className="gold-highlight">handcrafted bridal accessories</span>, marriage trousseau trays, traditional decorated coconuts, <span className="gold-highlight">varmala preserved resin plaques</span>, and <span className="gold-highlight">custom wedding favors</span>.
          </p>

          {/* Premium Decorative Divider */}
          <div className="tw-hero-divider">
            <span className="divider-line left-line"></span>
            <span className="divider-motif">🪷</span>
            <span className="divider-line right-line"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingItemsCustomizer;
