import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from 'react-icons/fi';
import { SiKotlin, SiReact, SiPython, SiFirebase, SiDotnet, SiFlutter } from 'react-icons/si';

const ROLES = [
  'Full Stack Developer',
  'Android Developer',
  'AI Enthusiast',
  'Problem Solver',
  'B.Tech CSE Student',
];

const TECH_ICONS = [
  { Icon: SiReact, color: '#61dafb', label: 'React', top: '18%', left: '8%', delay: 0 },
  { Icon: SiPython, color: '#3776ab', label: 'Python', top: '12%', right: '10%', delay: 0.5 },
  { Icon: SiKotlin, color: '#7f52ff', label: 'Kotlin', bottom: '28%', left: '6%', delay: 1 },
  { Icon: SiFirebase, color: '#ffca28', label: 'Firebase', bottom: '22%', right: '8%', delay: 1.5 },
  { Icon: SiDotnet, color: '#512bd4', label: '.NET', top: '55%', left: '4%', delay: 0.7 },
  { Icon: SiFlutter, color: '#54c5f8', label: 'Flutter', top: '40%', right: '5%', delay: 1.2 },
];

/* Particle Canvas */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      // Draw connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
};

/* Typing Effect Hook */
const useTypingEffect = (texts, speed = 80, pauseMs = 1800) => {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pauseMs]);

  return display;
};

const Hero = () => {
  const typedText = useTypingEffect(ROLES);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,245,255,0.07) 0%, transparent 70%), var(--bg-primary)',
      }}
    >
      <ParticleCanvas />

      {/* Background Blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: 'rgba(0,245,255,0.05)', top: '-15%', left: '-10%', animationDelay: '0s' }} />
      <div className="blob" style={{ width: 500, height: 500, background: 'rgba(139,92,246,0.06)', bottom: '-10%', right: '-8%', animationDelay: '3s' }} />
      <div className="blob" style={{ width: 300, height: 300, background: 'rgba(236,72,153,0.04)', top: '40%', right: '20%', animationDelay: '1.5s' }} />

      {/* Floating Tech Icons */}
      {TECH_ICONS.map(({ Icon, color, label, delay, ...pos }) => (
        <motion.div
          key={label}
          style={{
            position: 'absolute',
            ...pos,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 1, duration: 0.5 }}
          className="float-anim"
        >
          <div style={{
            padding: 12,
            background: `rgba(${hexToRgb(color)},0.1)`,
            border: `1px solid rgba(${hexToRgb(color)},0.2)`,
            borderRadius: 14,
            backdropFilter: 'blur(10px)',
          }}>
            <Icon style={{ fontSize: '1.6rem', color }} />
          </div>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</span>
        </motion.div>
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '120px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>

          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-badge" style={{ marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', boxShadow: '0 0 8px var(--accent-green)' }} />
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 8, fontFamily: 'var(--font-mono)' }}
            >
              Hello, World! 👋 I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: 8,
                letterSpacing: '-2px',
              }}
            >
              Rajnishkumar{' '}
              <span className="gradient-text">Sinh</span>
            </motion.h1>

            {/* Typing Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 24,
                minHeight: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span>{' '}
              <span style={{ color: 'var(--text-primary)' }}>{typedText}</span>
              <span style={{
                display: 'inline-block',
                width: 2,
                height: '1.4rem',
                background: 'var(--accent-cyan)',
                marginLeft: 2,
                animation: 'blink 1s step-end infinite',
              }} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              A passionate B.Tech CSE student at <strong style={{ color: 'var(--text-primary)' }}>Marwadi University</strong> building 
              full-stack web apps, Android apps, and AI-powered solutions. 
              Turning ideas into elegant, high-performance digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}
            >
              <motion.a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>View Projects</span>
                <FiArrowDown />
              </motion.a>

              <motion.a
                href="resume.pdf"
                className="btn-outline"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                download="Rajnish_Sinh_Resume.pdf"
              >
                <FiDownload />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ display: 'flex', gap: 14, alignItems: 'center' }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Find me on</span>
              {[
                { Icon: FiGithub, href: 'https://github.com/rajnishsinh2003', label: 'GitHub' },
                { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/rajnish-sinh-430a94405/', label: 'LinkedIn' },
                { Icon: FiMail, href: 'mailto:rajnishsinh2003@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.15 }}
                  style={{
                    width: 42,
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'backOut' }}
            style={{ position: 'relative', flexShrink: 0 }}
            className="hero-avatar-wrapper"
          >
            {/* Outer glow rings */}
            <div style={{
              position: 'absolute',
              inset: -30,
              borderRadius: '50%',
              border: '1px solid rgba(0,245,255,0.15)',
              animation: 'spin-slow 20s linear infinite',
            }}>
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                boxShadow: '0 0 10px var(--accent-cyan)',
                transform: 'translateX(-50%)',
              }} />
            </div>
            <div style={{
              position: 'absolute',
              inset: -55,
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.1)',
              animation: 'spin-slow 30s linear infinite reverse',
            }}>
              <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '5%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent-purple)',
                boxShadow: '0 0 10px var(--accent-purple)',
              }} />
            </div>

            {/* Avatar Circle */}
            <div
              className="pulse-glow-anim"
              style={{
                width: 260,
                height: 260,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(139,92,246,0.15))',
                border: '2px solid rgba(0,245,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                fontSize: '7rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
              }}>
                RS
              </div>
              {/* Inner glow */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(0,245,255,0.12), transparent 60%)',
              }} />
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: -10,
                right: -60,
                padding: '10px 16px',
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.2)',
                borderRadius: 14,
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
                minWidth: 90,
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>8.88</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CGPA</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: -10,
                left: -60,
                padding: '10px 16px',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 14,
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
                minWidth: 90,
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-purple)' }}>5+</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Projects</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>scroll down</span>
        <FiArrowDown />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @media (max-width: 900px) {
          .hero-avatar-wrapper { display: none; }
        }
      `}</style>
    </section>
  );
};

// Helper
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)}` : '255,255,255';
}

export default Hero;
