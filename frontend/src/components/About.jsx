import React from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/my-pic.jpeg';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '8rem',
              opacity: '0.05',
              fontFamily: 'Outfit',
              fontWeight: '800'
            }}>01</div>
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-blue)' }}>
              My Journey
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              I am a motivated and detail-oriented Information Technology graduate seeking opportunities as a Software Developer, Python Developer, and AI/ML Engineer. 
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              I enjoy solving real-world problems and continuously expanding my technical knowledge to build efficient, scalable, and intelligent applications.
            </p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 45%' }}>
                  <span style={{ color: 'var(--accent-blue)', display: 'block', marginBottom: '0.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Languages</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>English, Telugu</span>
                </div>
                <div style={{ flex: '1 1 45%' }}>
                  <span style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Hyderabad, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card flex items-center justify-center" style={{ 
              aspectRatio: '1/1', 
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={profilePic} 
                alt="Profile" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
