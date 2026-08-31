import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Project
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {/* Project Image */}
          <div style={{
            height: '350px',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: 'var(--border-glass)'
          }}>
            <img 
              src="/blood-group-project.png" 
              alt="Blood Group Project"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          {/* Project Details */}
          <div style={{ padding: '3rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Blood Group Prediction Using Image Processing and Fingerprint-Based Deep Learning
            </h3>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
              Developed a Flask-based application utilizing Convolutional Neural Networks (CNN), OpenCV, image processing, and fingerprint verification. The system successfully predicts blood groups from visual and fingerprint data, supporting intelligent and automated healthcare systems.
            </p>

            <div className="flex gap-4 items-center" style={{ marginBottom: '2rem', flexWrap: 'wrap' }}>
              {['Python', 'Flask', 'OpenCV', 'CNN', 'Deep Learning', 'Image Processing'].map((tech, i) => (
                <span key={i} style={{
                  padding: '0.4rem 1rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'var(--accent-cyan)',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '1px solid rgba(6, 182, 212, 0.2)'
                }}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <a 
                href="#" 
                className="btn btn-primary"
              >
                <FiExternalLink size={18} /> View Project
              </a>
              <a 
                href="https://github.com/PrasannaCh12/blood-group-detection/tree/main/final_blood_group_project/final_blood_group_project" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline"
              >
                <FiGithub size={18} /> View Code
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
