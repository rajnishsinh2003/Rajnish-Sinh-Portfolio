import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const PROJECTS = [
  {
    id: 1,
    title: 'RouteVista',
    subtitle: 'Intelligent Travel Assistance Platform',
    description: 'A cross-platform travel assistance app built with Flutter and Firebase, featuring interactive route mapping, budget tracking, and real-time weather updates. Integrated Google Gemini AI for smart travel chatbot with personalized itinerary suggestions.',
    tags: ['AI', 'Mobile'],
    tech: ['Flutter', 'Firebase', 'Gemini AI', 'Dart'],
    color: '#54c5f8',
    colorRgb: '84,197,248',
    github: 'https://github.com/rajnishsinh2003',
    live: null,
    emoji: '🗺️',
    gradient: 'linear-gradient(135deg, rgba(84,197,248,0.15), rgba(0,245,255,0.05))',
    year: '2026',
  },
  {
    id: 2,
    title: 'EnviroWatch',
    subtitle: 'Weather & Air Quality Dashboard',
    description: 'A comprehensive ASP.NET Core web application for real-time Air Quality Index (AQI) and weather monitoring across India. Features secure authentication, personalized data subscriptions, and robust data export capabilities.',
    tags: ['Web'],
    tech: ['ASP.NET Core', 'C#', 'SQL Server', 'HTML/CSS'],
    color: '#10b981',
    colorRgb: '16,185,129',
    github: 'https://github.com/rajnishsinh2003',
    live: null,
    emoji: '🌍',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(0,245,255,0.03))',
    year: '2026',
  },
  {
    id: 3,
    title: 'School Management System',
    subtitle: 'Full-Stack .NET Web Application',
    description: 'A web-based School Management System using ASP.NET MVC to streamline student, teacher, and class management. Features secure login, role-based access control, and database-driven CRUD operations.',
    tags: ['Web'],
    tech: ['ASP.NET MVC', 'C#', 'SQL Server', 'HTML/CSS'],
    color: '#8b5cf6',
    colorRgb: '139,92,246',
    github: 'https://github.com/rajnishsinh2003',
    live: null,
    emoji: '🏫',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.05))',
    year: '2025',
  },
  {
    id: 4,
    title: 'MU School App',
    subtitle: 'Android + Firebase Mobile App',
    description: 'A role-based Android School Management application enabling Admin, Teacher, and Student dashboards. Implements attendance tracking, timetable management, and study material sharing via Firebase Realtime Database.',
    tags: ['Mobile'],
    tech: ['Kotlin', 'Firebase', 'Android Studio', 'XML'],
    color: '#3ddc84',
    colorRgb: '61,220,132',
    github: 'https://github.com/rajnishsinh2003',
    live: null,
    emoji: '📱',
    gradient: 'linear-gradient(135deg, rgba(61,220,132,0.15), rgba(84,197,248,0.05))',
    year: '2025',
  },
  {
    id: 5,
    title: 'HandySlide',
    subtitle: 'Gesture-Controlled Presentation Tool',
    description: 'A custom PowerPoint solution leveraging hand motion sensing technology to provide a hands-free method for controlling presentations, resulting in a unique and dynamic user experience.',
    tags: ['AI'],
    tech: ['Python', 'Embedded System', 'Sensors', 'OpenCV'],
    color: '#ec4899',
    colorRgb: '236,72,153',
    github: 'https://github.com/rajnishsinh2003',
    live: null,
    emoji: '🤌',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.05))',
    year: '2024',
  },
];

const FILTERS = ['All', 'Web', 'Mobile', 'AI'];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? project.gradient : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `rgba(${project.colorRgb},0.3)` : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 20,
        padding: '28px',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px rgba(${project.colorRgb},0.15), 0 0 0 1px rgba(${project.colorRgb},0.1)` : 'none',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Year badge */}
      <div style={{
        position: 'absolute', top: 16, right: 16,
        padding: '3px 10px', borderRadius: 20,
        background: `rgba(${project.colorRgb},0.12)`,
        fontSize: '0.7rem', color: project.color,
        fontFamily: 'var(--font-mono)', fontWeight: 600,
      }}>
        {project.year}
      </div>

      {/* Emoji & Title */}
      <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{project.emoji}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>{project.title}</h3>
      <p style={{ fontSize: '0.78rem', color: project.color, fontFamily: 'var(--font-mono)', marginBottom: 14, fontWeight: 600 }}>{project.subtitle}</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{project.description}</p>

      {/* Tech Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {project.tech.map(t => (
          <span key={t} style={{
            padding: '3px 10px', borderRadius: 20,
            background: `rgba(${project.colorRgb},0.1)`,
            border: `1px solid rgba(${project.colorRgb},0.2)`,
            fontSize: '0.7rem', color: project.color,
            fontFamily: 'var(--font-mono)', fontWeight: 600,
          }}>{t}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-secondary)', fontSize: '0.82rem',
            fontWeight: 600, textDecoration: 'none', flex: 1,
            justifyContent: 'center', transition: 'all 0.2s ease',
          }}
        >
          <FiGithub /> GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10,
              background: `rgba(${project.colorRgb},0.15)`,
              border: `1px solid rgba(${project.colorRgb},0.3)`,
              color: project.color, fontSize: '0.82rem',
              fontWeight: 600, textDecoration: 'none', flex: 1,
              justifyContent: 'center', transition: 'all 0.2s ease',
            }}
          >
            <FiExternalLink /> Live Demo
          </a>
        )}
      </div>

      {/* Glow dot */}
      <div style={{
        position: 'absolute', bottom: -40, right: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: `rgba(${project.colorRgb},0.08)`,
        filter: 'blur(30px)',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0,
      }} />
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(139,92,246,0.06) 0%, transparent 70%), var(--bg-primary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// MY WORK</div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of projects built with passion, precision, and modern technologies.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 50, flexWrap: 'wrap' }}
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 50 }}
        >
          <a
            href="https://github.com/rajnishsinh2003"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'inline-flex' }}
          >
            <FiGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
