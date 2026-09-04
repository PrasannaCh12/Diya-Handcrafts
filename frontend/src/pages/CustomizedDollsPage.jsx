import React from 'react';

export const DOLL_PRODUCTS = [];

export const getDollProducts = () => [];

const CustomizedDollsPage = () => {
  return (
    <section id="customized-dolls-page" className="customizer-section section-padding" style={{ paddingTop: '2rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">🎎 ARTISANAL DOLL ATELIER</div>
          <h2 className="tw-hero-title">Customized Dolls Collection</h2>
          <p className="tw-hero-description">
            Handcrafted traditional theme dolls, bridal couple display dolls, and festive keepsakes <span className="gold-highlight">customized with love</span>.
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

export default CustomizedDollsPage;
