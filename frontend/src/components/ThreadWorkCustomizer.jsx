import React from 'react';
import { MasterDetailsModal } from './MasterCategoryCustomizer';

export const THREADWORK_DESIGNS = [];

export const getThreadWorkProducts = () => [];

export const ProductDetailsModal = MasterDetailsModal;

const ThreadWorkCustomizer = () => {
  return (
    <section id="threadwork-customizer" className="customizer-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="hero-header-wrap">
          <div className="tw-hero-subtitle">🧵 HANDMADE THREAD WORK STUDIO</div>
          <h2 className="tw-hero-title">Customize Your Thread Work</h2>
          <p className="tw-hero-description">
            Create your dream thread work with <span className="gold-highlight">premium silk threads</span>, <span className="gold-highlight">kundan stones</span>, pearls, and <span className="gold-highlight">zardosi</span>. <span className="gold-highlight">Handmade with love</span>, customized for every occasion.
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

export default ThreadWorkCustomizer;
