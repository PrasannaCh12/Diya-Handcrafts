import React from 'react';
import { MasterDetailsModal } from './MasterCategoryCustomizer';

export const BISCUIT_VARIETIES = [];

export const BiscuitDetailsModal = MasterDetailsModal;

const BiscuitCustomizer = () => {
  return (
    <section id="biscuit-customizer" className="customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">🍪 GOURMET BAKERY STUDIO</div>
          <h2 className="tw-hero-title">Customize Your Homemade Biscuits</h2>
          <p className="tw-hero-description">
            Build your bespoke box of <span className="gold-highlight">fresh, eggless, 100% maida-free cookies</span> baked with <span className="gold-highlight">pure cow ghee</span>, whole grains, and natural sweeteners. Select your favorite variety and <span className="gold-highlight">personalized gift box</span>.
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

export default BiscuitCustomizer;
