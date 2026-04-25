import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiSmartphone, FiServer, FiCpu, FiLayout, FiDatabase } from 'react-icons/fi';

const SERVICES = [
  {
    icon: FiGlobe,
    title: 'Web Development',
    description: 'Full-stack web applications using ASP.NET MVC, React, and modern JavaScript frameworks with clean, scalable architecture.',
    color: 'var(--accent-cyan)',
    rgb: '0,245,255',
    features: ['ASP.NET MVC / Core', 'React.js', 'Responsive Design', 'REST APIs'],
  },
  {
    icon: FiSmartphone,
    title: 'Android App Development',
    description: 'Native Android applications using Kotlin with Firebase integration, real-time data sync, and intuitive user experiences.',
    color: 'var(--accent-purple)',
    rgb: '139,92,246',
    features: ['Kotlin & Jetpack', 'Firebase Integration', 'Material Design', 'Offline Support'],
  },
  {
    icon: FiServer,
    title: 'Backend & API Development',
    description: 'Robust server-side solutions with secure authentication, database design, and RESTful API architecture.',
    color: 'var(--accent-pink)',
    rgb: '236,72,153',
    features: ['REST API Design', 'SQL Server / MySQL', 'Authentication', 'CRUD Systems'],
  },
  {
    icon: FiCpu,
    title: 'AI-Powered Solutions',
    description: 'Smart applications powered by AI — from chatbots using Google Gemini API to ML-driven features and gesture controls.',
    color: '#f59e0b',
    rgb: '245,158,11',
    features: ['Google Gemini AI', 'Python ML', 'Scikit-learn', 'Gesture Recognition'],
  },
  {
    icon: FiSmartphone,
    title: 'Cross-Platform Apps',
    description: 'Cross-platform mobile apps built with Flutter and Firebase, running seamlessly on both Android and iOS.',
    color: 'var(--accent-green)',
    rgb: '16,185,129',
    features: ['Flutter / Dart', 'Firebase Backend', 'Route Mapping', 'Push Notifications'],
  },
  {
    icon: FiLayout,
    title: 'UI/UX Design',
    description: 'Designing clean, modern, and user-friendly interfaces that prioritize aesthetics, usability, and accessibility.',
    color: '#a78bfa',
    rgb: '167,139,250',
    features: ['Modern Layouts', 'Responsive Design', 'Dark Mode UI', 'Component Libraries'],
  },
];

const ServiceCard = ({ service, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px 28px',
        borderRadius: 20,
        border: `1px solid ${hovered ? `rgba(${service.rgb},0.35)` : 'rgba(255,255,255,0.06)'}`,
        background: hovered
          ? `linear-gradient(135deg, rgba(${service.rgb},0.08), rgba(${service.rgb},0.02))`
          : 'rgba(255,255,255,0.02)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px rgba(${service.rgb},0.12), 0 0 0 1px rgba(${service.rgb},0.08)` : 'none',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 56, height: 56, borderRadius: 16,
          background: `rgba(${service.rgb},0.12)`,
          border: `1px solid rgba(${service.rgb},0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', color: service.color, marginBottom: 20,
          boxShadow: hovered ? `0 0 20px rgba(${service.rgb},0.3)` : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <service.icon />
      </motion.div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>
        {service.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {service.description}
      </p>

      {/* Feature list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {service.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: service.color,
              boxShadow: `0 0 6px ${service.color}`,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Background glow blob */}
      <div style={{
        position: 'absolute', bottom: -60, right: -60,
        width: 160, height: 160, borderRadius: '50%',
        background: `rgba(${service.rgb},0.06)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }} />
    </motion.div>
  );
};

const Services = () => {
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
    <section id="services" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(236,72,153,0.04) 0%, transparent 70%), var(--bg-primary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// WHAT I DO</div>
          <h2 className="section-title">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtitle">
            From concept to deployment — I build complete, high-quality digital solutions.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
