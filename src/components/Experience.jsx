import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiBookOpen, FiCode } from 'react-icons/fi';

const TIMELINE = [
  {
    type: 'internship',
    icon: FiBriefcase,
    color: 'var(--accent-cyan)',
    rgb: '0,245,255',
    title: 'Python Intern (Training-Based)',
    org: 'Codizious — Rajkot',
    period: 'Dec 2023 – Jan 2024',
    points: [
      'Learned core Python concepts: variables, loops, functions, and data structures',
      'Gained understanding of OOP concepts such as classes and objects',
      'Practiced problem-solving using algorithmic Python programs',
    ],
  },
  {
    type: 'education',
    icon: FiBookOpen,
    color: 'var(--accent-purple)',
    rgb: '139,92,246',
    title: 'B.Tech in Computer Science & Engineering',
    org: 'Marwadi University, Gujarat',
    period: '2024 – Present (Expected 2027)',
    points: [
      'Current CGPA: 8.88 — consistently high academic performance',
      'Core subjects: DSA, OOP, OS, Computer Networks, Software Engineering',
      'Building real-world projects alongside academics',
    ],
  },
  {
    type: 'education',
    icon: FiBookOpen,
    color: 'var(--accent-purple)',
    rgb: '139,92,246',
    title: 'Diploma in Computer Science & Engineering',
    org: 'Marwadi University, Gujarat',
    period: '2021 – 2024',
    points: [
      'Graduated with CGPA: 9.38',
      'Strong foundation in programming, databases and networking',
    ],
  },
  {
    type: 'certification',
    icon: FiAward,
    color: '#f59e0b',
    rgb: '245,158,11',
    title: 'Cisco Networking Academy',
    org: 'Certifications',
    period: '2023 – 2024',
    points: [
      'CCNA: Introduction to Networks',
      'CCNA: Switching, Routing & Wireless Essentials',
      'Linux Essentials',
      'Data Science Essentials with Python',
    ],
  },
  {
    type: 'certification',
    icon: FiAward,
    color: '#f59e0b',
    rgb: '245,158,11',
    title: 'Infosys Springboard',
    org: 'Certifications',
    period: '2023 – 2024',
    points: [
      'Machine Learning with Scikit-Learn in Python',
      'Explore Machine Learning using Python',
      'Python for Data Science',
      'Database and SQL',
    ],
  },
  {
    type: 'project',
    icon: FiCode,
    color: 'var(--accent-pink)',
    rgb: '236,72,153',
    title: 'HandySlide — Gesture Presentation Control',
    org: 'Personal Project',
    period: 'Jan – Apr 2024',
    points: [
      'Built a hand-motion sensing system to control presentations hands-free',
      'Technologies: Embedded System, Sensors, Microcontroller, Python',
    ],
  },
];

const TimelineItem = ({ item, index, visible }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: 0,
        marginBottom: 40,
        alignItems: 'start',
      }}
    >
      {/* Left Card */}
      <div style={{ paddingRight: 30, textAlign: 'right', display: isLeft ? 'block' : 'none' }}>
        {isLeft && <TimelineCard item={item} />}
      </div>

      {/* Center dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={visible ? { scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.1, type: 'spring', stiffness: 300 }}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `rgba(${item.rgb},0.12)`,
            border: `2px solid rgba(${item.rgb},0.5)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: item.color, fontSize: '1rem',
            boxShadow: `0 0 20px rgba(${item.rgb},0.3)`,
            position: 'relative', zIndex: 2,
            flexShrink: 0,
          }}
        >
          <item.icon />
        </motion.div>
      </div>

      {/* Right Card */}
      <div style={{ paddingLeft: 30, display: isLeft ? 'none' : 'block' }}>
        {!isLeft && <TimelineCard item={item} />}
      </div>

      {/* Placeholder for opposite side */}
      {isLeft && <div />}
      {!isLeft && <div style={{ paddingRight: 30 }} />}
    </motion.div>
  );
};

const TimelineCard = ({ item }) => (
  <div className="glass-card" style={{ padding: '22px 24px', textAlign: 'left' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{
        padding: '2px 10px', borderRadius: 20,
        background: `rgba(${item.rgb},0.12)`,
        fontSize: '0.68rem', color: item.color,
        fontFamily: 'var(--font-mono)', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: 1,
      }}>
        {item.type}
      </span>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {item.period}
      </span>
    </div>
    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>{item.title}</h3>
    <p style={{ fontSize: '0.8rem', color: item.color, fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-mono)' }}>{item.org}</p>
    <ul style={{ paddingLeft: 16, margin: 0 }}>
      {item.points.map((p, i) => (
        <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 5, lineHeight: 1.6 }}>
          {p}
        </li>
      ))}
    </ul>
  </div>
);

const Experience = () => {
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
    <section id="experience" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,245,255,0.04) 0%, transparent 70%), var(--bg-secondary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// MY JOURNEY</div>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Milestones</span>
          </h2>
          <p className="section-subtitle">
            From classroom to codebase — the journey that shaped my skills.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div style={{ position: 'relative' }} className="timeline-desktop">
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink), transparent)',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }} />

          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="timeline-mobile" style={{ display: 'none' }}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ display: 'flex', gap: 16, marginBottom: 24 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `rgba(${item.rgb},0.12)`,
                  border: `2px solid rgba(${item.rgb},0.4)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, fontSize: '0.9rem', flexShrink: 0,
                }}>
                  <item.icon />
                </div>
                <div style={{ width: 2, flex: 1, background: `rgba(${item.rgb},0.2)`, marginTop: 6 }} />
              </div>
              <TimelineCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
