import React from 'react';
import { MasterDetailsModal } from './MasterCategoryCustomizer';

export const CHOCOLATE_FLAVORS = [];

export const getChocolateProducts = () => [];

export const ChocolateDetailsModal = MasterDetailsModal;

const ChocolateCustomizer = () => {
  return (
    <section id="chocolate-customizer" className="chocolate-customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">🍫 HANDMADE CONFECTIONERY STUDIO</div>
          <h2 className="tw-hero-title">Customize Your Handmade Chocolates</h2>
          <p className="tw-hero-description">
            Create your perfect <span className="gold-highlight">handmade chocolates</span> with <span className="gold-highlight">premium flavors</span>, <span className="gold-highlight">crunchy add-ons</span>, elegant shapes, and <span className="gold-highlight">luxury packaging</span>. Customize every detail for a truly <span className="gold-highlight">special gift</span>.
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

export default ChocolateCustomizer;
