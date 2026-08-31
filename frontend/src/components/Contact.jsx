import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitStatus('error');
      setStatusMessage('Contact form is currently in Demo mode. To enable email delivery, please create a .env file and add your VITE_WEB3FORMS_ACCESS_KEY.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: formData.name,
          subject: `Portfolio Contact Form Submission from ${formData.name}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid" style={{ 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem' 
        }}>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Let's Talk
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.8' }}>
              I am actively looking for new opportunities as a Software Developer or AI/ML Engineer. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-col gap-6" style={{ flexDirection: 'column', gap: '1.5rem' }}>
              <div className="flex items-center gap-4">
                <div style={{
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  fontSize: '1.2rem'
                }}>
                  <FiMail />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Email</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>chakkaprasanna0@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div style={{
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  fontSize: '1.2rem'
                }}>
                  <FiPhone />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Phone</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>+91 9553897946</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div style={{
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  fontSize: '1.2rem'
                }}>
                  <FiMapPin />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Location</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>Hyderabad, India</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/PrasannaCh12" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/prasanna-rajya-lakshmi-chakka-550594367" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                <FiLinkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {submitStatus === 'success' && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {statusMessage}
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {statusMessage}
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'inherit',
                    outline: 'none',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'inherit',
                    outline: 'none',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  opacity: isSubmitting ? 0.7 : 1, 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer' 
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
