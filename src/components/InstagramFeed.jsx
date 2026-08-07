import React from 'react';
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa';

const InstagramFeed = () => {
  const instaPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1611591475140-be3e9ed9e2d7?auto=format&fit=crop&w=600&q=80',
      likes: '1.4k',
      comments: '84'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      likes: '2.1k',
      comments: '120'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
      likes: '980',
      comments: '46'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
      likes: '1.8k',
      comments: '92'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      likes: '3.2k',
      comments: '210'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      likes: '1.1k',
      comments: '64'
    }
  ];

  return (
    <section className="insta-section">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-subtitle">
            <FaInstagram /> Live Social Feed
          </div>
          <h2 className="section-title">Follow Us on Instagram</h2>
          <p className="section-description">
            @divyayelchuri.handmade • 18.5k Followers • Daily Behind-The-Scenes Craft Videos
          </p>
        </div>

        {/* Feed Grid */}
        <div className="insta-grid">
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-post-card"
            >
              <img src={post.image} alt="Divya Yelchuri Instagram Post" className="insta-img" />
              <div className="insta-hover-overlay">
                <FaInstagram className="insta-icon" />
                <div className="insta-stats">
                  <span><FaHeart /> {post.likes}</span>
                  <span><FaComment /> {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaInstagram /> Join 18.5k+ Followers on Instagram
          </a>
        </div>
      </div>

      <style>{`
        .insta-section {
          padding: 5rem 0;
          background: #FFFFFF;
        }

        .insta-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }

        .insta-post-card {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .insta-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .insta-post-card:hover .insta-img {
          transform: scale(1.1);
        }

        .insta-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(44, 34, 36, 0.75);
          backdrop-filter: blur(2px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .insta-post-card:hover .insta-hover-overlay {
          opacity: 1;
        }

        .insta-icon {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: var(--gold-light);
        }

        .insta-stats {
          display: flex;
          gap: 0.85rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .insta-stats span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        @media (max-width: 992px) {
          .insta-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 576px) {
          .insta-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default InstagramFeed;
