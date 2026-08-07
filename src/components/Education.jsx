import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    degree: 'B.Tech Information Technology',
    institution: 'Vijaya Institute of Technology for Women',
    year: '2021 - 2025',
    score: 'CGPA: 7.0',
    description: 'Focused on core computer science subjects, software development, and modern IT practices.'
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Sri Chaitanya Junior College',
    year: '2019 - 2021',
    score: 'CGPA: 6.9',
    description: 'Specialized in Mathematics, Physics, and Chemistry.'
  },
  {
    degree: 'SSC',
    institution: 'Sri Chaitanya School',
    year: '2019',
    score: 'CGPA: 7.7',
    description: 'Secondary School Certificate.'
  }
];

const Education = () => {
  return (
    <section id="education">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education Timeline
        </motion.h2>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--gradient-blue)',
            opacity: 0.3
          }}></div>

          <div className="flex flex-col" style={{ gap: '2.5rem', flexDirection: 'column' }}>
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{
                  position: 'relative',
                  paddingLeft: '60px'
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  left: '11px',
                  top: '10px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '4px solid var(--accent-blue)',
                  boxShadow: 'var(--gradient-glow)'
                }}></div>

                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ 
                      display: 'inline-block',
                      padding: '0.3rem 0.8rem', 
                      background: 'rgba(59, 130, 246, 0.1)', 
                      color: 'var(--accent-cyan)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {edu.year}
                    </span>
                    <span style={{ 
                      display: 'inline-block',
                      padding: '0.3rem 0.8rem', 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      color: '#34d399',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {edu.score}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {edu.degree}
                  </h3>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-blue)', marginBottom: '1rem', fontWeight: '500' }}>
                    {edu.institution}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
