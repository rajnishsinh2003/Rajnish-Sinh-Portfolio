import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TESTIMONIALS = [
  {
    name: 'Prof. Jigar Dave',
    role: 'Project Guide',
    org: 'Marwadi University',
    avatar: 'JD',
    color: 'var(--accent-cyan)',
    rgb: '0,245,255',
    rating: 5,
    text: 'Rajnish consistently demonstrated exceptional problem-solving skills and a deep passion for software development. His RouteVista project showed remarkable integration of Flutter, Firebase, and AI — far beyond what is expected of a student at his level.',
  },
  {
    name: 'Mentor at Codizious',
    role: 'Python Training Mentor',
    org: 'Codizious, Rajkot',
    avatar: 'CM',
    color: 'var(--accent-purple)',
    rgb: '139,92,246',
    rating: 5,
    text: 'During his internship, Rajnish showed incredible enthusiasm for learning Python. He grasped OOP concepts quickly and was always eager to go beyond the curriculum. His dedication and curiosity set him apart from his peers.',
  },
  {
    name: 'Prof. Vaibhav Mataliya',
    role: 'Faculty — CSE Department',
    org: 'Marwadi University',
    avatar: 'VM',
    color: 'var(--accent-pink)',
    rgb: '236,72,153',
    rating: 5,
    text: 'Rajnish built a full School Management System as a semester project that was production-quality. The role-based access control, Firebase integration, and clean UI demonstrated a level of maturity in software design rarely seen in undergraduate students.',
  },
  {
    name: 'Classmate & Collaborator',
    role: 'Fellow B.Tech CSE Student',
    org: 'Marwadi University',
    avatar: 'KC',
    color: 'var(--accent-green)',
    rgb: '16,185,129',
    rating: 5,
    text: 'Working with Rajnish on group projects was fantastic. He takes ownership, drives the team forward, and always delivers clean, well-documented code. His attention to UI/UX details and performance optimization is impressive.',
  },
];

const Stars = ({ count }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        style={{
          color: i < count ? '#fbbf24' : 'rgba(255,255,255,0.15)',
          fill: i < count ? '#fbbf24' : 'none',
          fontSize: '0.9rem',
        }}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    startTimer();
  };

  const t = TESTIMONIALS[current];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  return (
    <section id="testimonials" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%), var(--bg-secondary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// TESTIMONIALS</div>
          <h2 className="section-title">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Feedback from mentors, professors, and collaborators who've worked with me.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}
        >
          {/* Main Card */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 300,
            borderRadius: 24,
          }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="glass-card"
                style={{ padding: '40px 44px' }}
              >
                {/* Quote mark */}
                <div style={{
                  fontSize: '5rem', lineHeight: 1, color: `rgba(${t.rgb},0.15)`,
                  fontFamily: 'Georgia, serif', marginBottom: -20, marginTop: -20,
                  fontWeight: 900,
                }}>
                  "
                </div>

                <Stars count={t.rating} />

                <p style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginTop: 16,
                  marginBottom: 28,
                  fontStyle: 'italic',
                }}>
                  {t.text}
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: `linear-gradient(135deg, rgba(${t.rgb},0.3), rgba(${t.rgb},0.1))`,
                    border: `2px solid rgba(${t.rgb},0.4)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 800, color: t.color,
                    fontFamily: 'var(--font-mono)', flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.78rem', color: t.color, fontFamily: 'var(--font-mono)' }}>
                      {t.role} · {t.org}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 32 }}>
            <motion.button
              onClick={() => go(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)', fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <FiChevronLeft />
            </motion.button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); startTimer(); }}
                  animate={{
                    width: i === current ? 28 : 8,
                    background: i === current ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                  }}
                  style={{ height: 8, borderRadius: 4, border: 'none', padding: 0, cursor: 'none' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => go(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)', fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <FiChevronRight />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
