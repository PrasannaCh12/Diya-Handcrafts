import React from 'react';

export const BISCUIT_VARIETIES = [];

export const getBiscuitProducts = () => [];

export const BiscuitDetailsModal = () => null;

const BiscuitCustomizer = () => {
  return (
    <section className="customizer-section section-padding" style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {/* Hero Header */}
        <div className="hero-header-wrap" style={{ textAlign: 'center', margin: '0 auto' }}>
          <div className="tw-hero-subtitle">🍪 GOURMET BAKERY STUDIO</div>
          <h2 className="tw-hero-title">Customize Your Homemade Biscuits</h2>
          <p className="tw-hero-description" style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto' }}>
            Build your bespoke box of fresh, eggless, 100% maida-free cookies baked with pure cow ghee, whole grains, and natural sweeteners.
          </p>

          <div className="tw-hero-divider" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem auto' }}>
            <span className="divider-line left-line"></span>
            <span className="divider-motif">🪷</span>
            <span className="divider-line right-line"></span>
          </div>

          <div className="tw-brand-tagline" style={{ marginTop: '1.5rem' }}>
            <span className="quote-mark">“</span>Made With Love, Made For You.<span className="quote-mark">”</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiscuitCustomizer;
