import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming',
    icon: '💻',
    skills: [
      { name: 'Python', level: 80, stars: '⭐⭐⭐⭐' },
      { name: 'C', level: 60, stars: '⭐⭐⭐' },
      { name: 'C++', level: 60, stars: '⭐⭐⭐' },
    ]
  },
  {
    title: 'Web Technologies',
    icon: '🌐',
    skills: [
      { name: 'HTML', level: 70, stars: '⭐⭐⭐' },
      { name: 'CSS', level: 70, stars: '⭐⭐⭐' },
      { name: 'Flask', level: 65, stars: '⭐⭐⭐' },
    ]
  },
  {
    title: 'AI / ML',
    icon: '🧠',
    skills: [
      { name: 'Machine Learning', level: 70, stars: '⭐⭐⭐' },
      { name: 'OpenCV', level: 65, stars: '⭐⭐⭐' },
      { name: 'Pandas', level: 75, stars: '⭐⭐⭐⭐' },
      { name: 'NumPy', level: 75, stars: '⭐⭐⭐⭐' },
    ]
  },
  {
    title: 'Database & Tools',
    icon: '⚙️',
    skills: [
      { name: 'SQL', level: 70, stars: '⭐⭐⭐' },
      { name: 'MySQL', level: 70, stars: '⭐⭐⭐' },
      { name: 'Git & GitHub', level: 80, stars: '⭐⭐⭐⭐' },
      { name: 'Jupyter / Colab', level: 85, stars: '⭐⭐⭐⭐' },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" style={{ position: 'relative' }}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>

        <div className="grid" style={{ 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card"
              style={{ padding: '2rem' }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                <h3 style={{ fontSize: '1.3rem' }}>{category.title}</h3>
              </div>
              
              <div className="flex flex-col" style={{ gap: '1.2rem', flexDirection: 'column' }}>
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{skill.name}</span>
                      <span style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>{skill.stars}</span>
                    </div>
                    <div style={{ 
                      height: '6px', 
                      background: 'var(--bg-glass)', 
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (sIndex * 0.1) }}
                        style={{ 
                          height: '100%', 
                          background: 'var(--gradient-blue)',
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
