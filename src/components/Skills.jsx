import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss, SiBootstrap,
  SiDotnet, SiPython, SiFirebase, SiSqlite, SiKotlin, SiGit, SiGithub,
  SiAndroidstudio, SiLinux, SiFlutter, SiMysql,
} from 'react-icons/si';
import { FiCpu, FiCode } from 'react-icons/fi';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    color: 'var(--accent-cyan)',
    rgb: '0,245,255',
    skills: [
      { name: 'HTML5', icon: SiHtml5, level: 90, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, level: 85, color: '#1572b6' },
      { name: 'JavaScript', icon: SiJavascript, level: 80, color: '#f7df1e' },
      { name: 'React', icon: SiReact, level: 70, color: '#61dafb' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 75, color: '#38bdf8' },
      { name: 'Bootstrap', icon: SiBootstrap, level: 80, color: '#7952b3' },
    ]
  },
  {
    title: 'Backend',
    color: 'var(--accent-purple)',
    rgb: '139,92,246',
    skills: [
      { name: 'ASP.NET MVC', icon: SiDotnet, level: 78, color: '#512bd4' },
      { name: 'Python', icon: SiPython, level: 82, color: '#3776ab' },
      { name: 'C#', icon: FiCpu, level: 70, color: '#239120' },
    ]
  },
  {
    title: 'Mobile Development',
    color: 'var(--accent-pink)',
    rgb: '236,72,153',
    skills: [
      { name: 'Android (Kotlin)', icon: SiKotlin, level: 80, color: '#7f52ff' },
      { name: 'Flutter', icon: SiFlutter, level: 72, color: '#54c5f8' },
      { name: 'Firebase', icon: SiFirebase, level: 78, color: '#ffca28' },
      { name: 'Android Studio', icon: SiAndroidstudio, level: 80, color: '#3ddc84' },
    ]
  },
  {
    title: 'Database',
    color: 'var(--accent-green)',
    rgb: '16,185,129',
    skills: [
      { name: 'SQL Server', icon: SiSqlite, level: 80, color: '#cc2927' },
      { name: 'MySQL', icon: SiMysql, level: 75, color: '#4479a1' },
      { name: 'Firebase DB', icon: SiFirebase, level: 78, color: '#ffca28' },
    ]
  },
  {
    title: 'Tools & Platforms',
    color: '#f59e0b',
    rgb: '245,158,11',
    skills: [
      { name: 'Git', icon: SiGit, level: 82, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, level: 85, color: '#ffffff' },
      { name: 'Linux', icon: SiLinux, level: 65, color: '#fcc624' },
      { name: 'VS Code', icon: FiCode, level: 90, color: '#007acc' },
    ]
  },
];

const SkillBar = ({ name, icon: Icon, level, color, visible, catColor }) => {
  const [animated, setAnimated] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (visible && !animated) {
      const t = setTimeout(() => setAnimated(true), 200);
      return () => clearTimeout(t);
    }
  }, [visible, animated]);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon style={{ color, fontSize: '1.1rem', flexShrink: 0 }} />
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{level}%</span>
      </div>
      <div className="skill-bar-track" ref={barRef}>
        <div
          className="skill-bar-fill"
          style={{
            width: animated ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${catColor})`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cat = SKILL_CATEGORIES[activeCategory];

  return (
    <section id="skills" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,245,255,0.04) 0%, transparent 70%), var(--bg-secondary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// MY SKILLS</div>
          <h2 className="section-title">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to craft premium digital experiences.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 50 }}
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '9px 22px',
                borderRadius: 50,
                border: activeCategory === i ? 'none' : '1px solid var(--border-glass)',
                background: activeCategory === i
                  ? `linear-gradient(135deg, rgba(${cat.rgb},0.9), rgba(${cat.rgb},0.6))`
                  : 'transparent',
                color: activeCategory === i ? '#fff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-main)',
                fontWeight: 600,
                fontSize: '0.88rem',
                boxShadow: activeCategory === i ? `0 0 20px rgba(${cat.rgb},0.3)` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {cat.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
        >
          {/* Skill bars card */}
          <div className="glass-card" style={{ padding: 32, gridColumn: 'span 2' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
              borderBottom: `1px solid rgba(${cat.rgb},0.15)`, paddingBottom: 16
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `rgba(${cat.rgb},0.12)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', color: cat.color
              }}>
                ⚡
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{cat.title}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {cat.skills.length} technologies
                </p>
              </div>
            </div>
            {cat.skills.map(skill => (
              <SkillBar key={skill.name} {...skill} visible={visible} catColor={cat.color} />
            ))}
          </div>
        </motion.div>

        {/* All tech icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{ marginTop: 50 }}
        >
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 24, letterSpacing: 2 }}>
            FULL TECH STACK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {SKILL_CATEGORIES.flatMap(cat => cat.skills).map(({ name, icon: Icon, color }) => (
              <motion.div
                key={name}
                whileHover={{ y: -4, scale: 1.08 }}
                title={name}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 16px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-glass)',
                  minWidth: 70,
                  transition: 'all 0.2s ease',
                  cursor: 'none',
                }}
              >
                <Icon style={{ fontSize: '1.6rem', color }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .glass-card[style*="grid-column: span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
