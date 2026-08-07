import React from 'react';
import { motion } from 'framer-motion';

const GithubStats = () => {
  return (
    <section id="github">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          GitHub Dashboard
        </motion.h2>

        <div className="flex flex-col gap-6" style={{ flexDirection: 'column', gap: '2rem' }}>
          
          {/* GitHub Stats Row */}
          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card flex justify-center items-center"
              style={{ padding: '1rem' }}
            >
              <img 
                src="https://github-readme-stats.vercel.app/api?username=PrasannaCh12&show_icons=true&theme=tokyonight&bg_color=0a0f1c&hide_border=true&title_color=3b82f6&icon_color=06b6d4" 
                alt="GitHub Stats" 
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card flex justify-center items-center"
              style={{ padding: '1rem' }}
            >
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=PrasannaCh12&layout=compact&theme=tokyonight&bg_color=0a0f1c&hide_border=true&title_color=3b82f6" 
                alt="Top Languages" 
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </motion.div>
          </div>

          {/* GitHub Streak / Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card flex justify-center items-center"
            style={{ padding: '2rem', overflowX: 'auto' }}
          >
            <img 
              src="https://github-readme-streak-stats.herokuapp.com/?user=PrasannaCh12&theme=tokyonight&background=0a0f1c&hide_border=true&ring=3b82f6&fire=06b6d4&currStreakLabel=3b82f6" 
              alt="GitHub Streak" 
              style={{ width: '100%', maxWidth: '800px', minWidth: '400px' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GithubStats;
