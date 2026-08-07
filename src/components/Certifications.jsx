import React from 'react';
import { motion } from 'framer-motion';



const Certifications = () => {
  return (
    <section id="certifications">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certifications & Achievements
        </motion.h2>


        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{ padding: '3rem', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Achievements & Internships
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {/* Cisco Cybersecurity */}
            <div style={{
              flex: '1',
              minWidth: '250px',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--gradient-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '2.5rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Cisco Cybersecurity</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Completed comprehensive cybersecurity training and certification.</p>
              <a href="/cisco-certificate.pdf" target="_blank" className="btn btn-outline" style={{ marginTop: 'auto', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center' }}>
                View Certificate
              </a>
            </div>

            {/* AICTE Internship */}
            <div style={{
              flex: '1',
              minWidth: '250px',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--gradient-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '2.5rem' }}>💼</div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>AICTE Internship</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Successfully completed the professional internship program.</p>
              <a href="/internship.pdf" target="_blank" className="btn btn-outline" style={{ marginTop: 'auto', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center' }}>
                View Certificate
              </a>
            </div>

            {/* Infosys Springboard */}
            <div style={{
              flex: '1',
              minWidth: '250px',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--gradient-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '2.5rem' }}>🐍</div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Infosys Springboard</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Completed comprehensive basics of Python programming.</p>
              <a href="/infosys-springboard.pdf" target="_blank" className="btn btn-outline" style={{ marginTop: 'auto', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center' }}>
                View Certificate
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;
