import React from 'react';
import { FaHeart, FaMagic, FaTruck, FaBoxOpen, FaLeaf, FaShieldAlt } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHeart />,
      title: 'Made With Love',
      desc: 'Each creation is handcrafted with meticulous attention to detail, warmth, and emotion.'
    },
    {
      icon: <FaMagic />,
      title: '100% Bespoke Customization',
      desc: 'Tailored to match your wedding outfit, wrist size, name initials, or custom color scheme.'
    },
    {
      icon: <FaTruck />,
      title: 'Pan-India & Worldwide Shipping',
      desc: 'Express international and domestic delivery with secure shock-proof luxury packaging.'
    },
    {
      icon: <FaBoxOpen />,
      title: 'Luxury Gift Packaging',
      desc: 'Comes in velvet-lined boxes, golden trunks, or handcrafted keepsake ribbons.'
    },
    {
      icon: <FaLeaf />,
      title: 'Fresh & Pure Ingredients',
      desc: 'Belgian cocoa, pure desi ghee for eggless cookies, and UV-resistant crystal resin.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Quality & Satisfaction Guarantee',
      desc: 'Over 5,000 satisfied brides and clients with verified 5-star artisan ratings.'
    }
  ];

  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">The Divya Handcrafts Promise</div>
          <h2 className="section-title">Why Choose Our Atelier</h2>
          <p className="section-description">
            We blend traditional Indian craftsmanship with modern luxury aesthetics.
          </p>
        </div>

        <div className="why-grid">
          {features.map((item, idx) => (
            <div key={idx} className="why-card glass-card">
              <div className="why-icon-wrap">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-choose-us-section {
          padding: 5.5rem 0;
          background: linear-gradient(180deg, #FDF5F6 0%, #FFFDF9 100%);
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .why-card {
          padding: 2.25rem 1.75rem;
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-md);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .why-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .why-icon-wrap {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--gold-soft-gradient);
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
          font-size: 1.4rem;
        }

        .why-card h3 {
          font-size: 1.3rem;
          color: var(--text-main);
          margin-bottom: 0.6rem;
        }

        .why-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
