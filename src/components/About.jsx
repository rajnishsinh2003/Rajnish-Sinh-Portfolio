import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiAward, FiBriefcase } from 'react-icons/fi';

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const STATS = [
  { icon: FiCode, label: 'Projects Completed', value: 5, suffix: '+', color: 'var(--accent-cyan)' },
  { icon: FiLayers, label: 'Technologies Used', value: 15, suffix: '+', color: 'var(--accent-purple)' },
  { icon: FiBriefcase, label: 'Internship Experience', value: 1, suffix: '', color: 'var(--accent-pink)' },
  { icon: FiAward, label: 'Certifications', value: 8, suffix: '+', color: 'var(--accent-green)' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
};

const StatCard = ({ icon: Icon, label, value, suffix, color, started }) => {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="glass-card" style={{ padding: '28px 24px', textAlign: 'center', flex: '1 1 140px' }}>
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        background: `rgba(${colorToRgb(color)},0.12)`,
        border: `1px solid rgba(${colorToRgb(color)},0.25)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 14px', fontSize: '1.3rem', color,
      }}>
        <Icon />
      </div>
      <div style={{ fontSize: '2.4rem', fontWeight: 900, color, lineHeight: 1, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 70%), var(--bg-primary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <div className="section-badge">// ABOUT ME</div>
          <h2 className="section-title">
            The Story <span className="gradient-text-cyan-purple">Behind the Code</span>
          </h2>
          <p className="section-subtitle">
            A passionate developer with a love for building things that matter.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative' }}
            className="about-visual"
          >
            {/* Code block visual */}
            <div className="glass-card" style={{ padding: '28px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.8 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              {[
                { key: 'const', val: 'developer', eq: ' = {', color: 'var(--accent-cyan)' },
              ].map((_, i) => (
                <div key={i} />
              ))}
              <div><span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#9cdcfe' }}>developer</span> <span style={{ color: '#fff' }}>= {'{'}</span></div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#9cdcfe' }}>name</span>: <span style={{ color: '#ce9178' }}>"Rajnishkumar Sinh"</span>,</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#9cdcfe' }}>location</span>: <span style={{ color: '#ce9178' }}>"Rajkot, Gujarat 🇮🇳"</span>,</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#9cdcfe' }}>degree</span>: <span style={{ color: '#ce9178' }}>"B.Tech CSE (2027)"</span>,</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#9cdcfe' }}>cgpa</span>: <span style={{ color: '#b5cea8' }}>8.88</span>,</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#9cdcfe' }}>passions</span>: [</div>
              <div style={{ paddingLeft: 40 }}><span style={{ color: '#ce9178' }}>"Web Dev"</span>, <span style={{ color: '#ce9178' }}>"Android"</span>, <span style={{ color: '#ce9178' }}>"AI/ML"</span></div>
              <div style={{ paddingLeft: 20 }}>],</div>
              <div style={{ paddingLeft: 20 }}><span style={{ color: '#9cdcfe' }}>available</span>: <span style={{ color: '#569cd6' }}>true</span>,</div>
              <div><span style={{ color: '#fff' }}>{'}'}</span></div>
            </div>

            {/* Education cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass-card"
              style={{
                position: 'absolute', bottom: -30, right: -30,
                padding: '16px 20px', minWidth: 200,
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: 6, letterSpacing: 1 }}>EDUCATION</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>B.Tech CSE</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Marwadi University</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>CGPA: 8.88 ⭐</div>
            </motion.div>
          </motion.div>

          {/* Right Text */}
          <div>
            {[
              {
                delay: 0.1,
                content: (
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 14 }}>
                      Crafting Digital <span className="gradient-text">Experiences</span>
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 14 }}>
                      I'm a highly motivated Engineering student at <strong style={{ color: 'var(--text-primary)' }}>Marwadi University</strong>, pursuing B.Tech in Computer Science (graduating 2027). 
                      With a strong foundation in software development and a passion for innovation, I build full-stack web applications, native Android apps, and AI-powered solutions.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      From real-time AQI monitoring dashboards with <strong style={{ color: 'var(--text-primary)' }}>ASP.NET</strong> to Flutter apps powered by <strong style={{ color: 'var(--text-primary)' }}>Google Gemini AI</strong> — I love turning complex ideas into elegant, user-centric products.
                    </p>
                  </div>
                )
              }
            ].map(({ delay, content }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay, duration: 0.6 }}
              >
                {content}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24, marginBottom: 28 }}
            >
              {['Python', 'JavaScript', 'Kotlin', 'ASP.NET', 'Flutter', 'Firebase'].map(skill => (
                <span key={skill} className="tech-badge">{skill}</span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
                <span>View Projects</span>
              </a>
              <a href="mailto:rajnishsinh2003@gmail.com" className="btn-outline">Get in Touch</a>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 20, marginTop: 60, flexWrap: 'wrap' }}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} started={visible} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-visual { display: none; }
        }
      `}</style>
    </section>
  );
};

function colorToRgb(cssVar) {
  const map = {
    'var(--accent-cyan)': '0,245,255',
    'var(--accent-purple)': '139,92,246',
    'var(--accent-pink)': '236,72,153',
    'var(--accent-green)': '16,185,129',
  };
  return map[cssVar] || '255,255,255';
}

export default About;
