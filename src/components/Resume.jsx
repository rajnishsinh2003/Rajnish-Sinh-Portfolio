import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiAward, FiBook } from 'react-icons/fi';

const CERTIFICATIONS = [
  { name: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
  { name: 'CCNA: Switching, Routing and Wireless Essentials', issuer: 'Cisco Networking Academy', year: '2023' },
  { name: 'Linux Essentials', issuer: 'Cisco Networking Academy', year: '2023' },
  { name: 'Python for Data Science', issuer: 'Infosys Springboard', year: '2024' },
  { name: 'Database and SQL', issuer: 'Infosys Springboard', year: '2024' },
];

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    inst: 'Marwadi University, Gujarat',
    period: 'Expected 2027',
    grade: '8.88 CGPA',
  },
  {
    degree: 'Diploma in Computer Science and Engineering',
    inst: 'Marwadi University, Gujarat',
    period: '2021 – 2024',
    grade: '9.38 CGPA',
  },
];

const Resume = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="resume" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%), var(--bg-primary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// RESUME</div>
          <h2 className="section-title">
            Academic <span className="gradient-text">&amp; Credentials</span>
          </h2>
          <p className="section-subtitle">
            A track record of academic excellence and continuous learning.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30 }}>
          
          {/* Resume Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card"
            style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(0, 245, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', color: 'var(--accent-cyan)', marginBottom: 20
            }}>
              <FiBook />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>Curriculum Vitae</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
              Download my full resume to learn more about my technical background and experience.
            </p>
            <motion.a
              href="/resume.pdf"
              download="Rajnish_Sinh_Resume.pdf"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> <span>Download CV</span>
            </motion.a>
          </motion.div>

          {/* Education Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiAward style={{ color: 'var(--accent-purple)' }} /> Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {EDUCATION.map((edu, i) => (
                <div key={i} className="glass-card" style={{ padding: 24 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{edu.period}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>{edu.degree}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.inst}</p>
                  <div style={{ marginTop: 10, fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>{edu.grade}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiAward style={{ color: 'var(--accent-pink)' }} /> Certifications
            </h3>
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} style={{ borderBottom: i === CERTIFICATIONS.length - 1 ? 'none' : '1px solid var(--border-glass)', paddingBottom: i === CERTIFICATIONS.length - 1 ? 0 : 16 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 2 }}>{cert.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>{cert.issuer}</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
