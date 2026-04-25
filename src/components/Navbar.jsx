import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px' }}>
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={e => { e.preventDefault(); handleNav('#home'); }}
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: '1.6rem', fontWeight: 900, textDecoration: 'none',
            background: 'linear-gradient(135deg,var(--accent-cyan),var(--accent-purple))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', letterSpacing: '-1px', fontFamily: 'var(--font-mono)'
          }}
        >
          RS.
        </motion.a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="nav-desktop">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = active === id;
            return (
              <motion.a
                key={label}
                href={href}
                onClick={e => { e.preventDefault(); handleNav(href); }}
                whileHover={{ y: -1 }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(0,245,255,0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(0,245,255,0.15)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {label}
              </motion.a>
            );
          })}

          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); handleNav('#contact'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginLeft: 8,
              padding: '8px 20px',
              background: 'linear-gradient(135deg,var(--accent-cyan),var(--accent-purple))',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#000',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(0,245,255,0.2)',
            }}
          >
            Hire Me
          </motion.a>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              marginLeft: 12,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              fontSize: '1.2rem',
              cursor: 'none',
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            display: 'none',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--border-glass)',
            borderRadius: 10,
            color: 'var(--text-primary)',
            padding: '8px 10px',
            fontSize: '1.2rem',
          }}
          className="menu-btn"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(3,7,18,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--border-glass)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={e => { e.preventDefault(); handleNav(href); }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: active === href.replace('#', '') ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    background: active === href.replace('#', '') ? 'rgba(0,245,255,0.08)' : 'transparent',
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
