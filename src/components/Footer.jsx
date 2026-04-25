import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL = [
  { Icon: FiGithub, href: 'https://github.com/rajnishsinh2003', label: 'GitHub' },
  { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/rajnish-sinh-430a94405/', label: 'LinkedIn' },
  { Icon: FiMail, href: 'mailto:rajnishsinh2003@gmail.com', label: 'Email' },
];

const scrollTo = (href) => {
  const id = href.replace('#', '');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-glass)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div className="blob" style={{ width: 400, height: 400, background: 'rgba(0,245,255,0.03)', bottom: '-20%', left: '-5%', animationDelay: '0s' }} />
      <div className="blob" style={{ width: 300, height: 300, background: 'rgba(139,92,246,0.04)', top: '-10%', right: '10%', animationDelay: '2s' }} />

      <div className="container" style={{ paddingTop: 60, paddingBottom: 24, position: 'relative', zIndex: 2 }}>
        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--border-glass)' }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{
              fontSize: '2rem', fontWeight: 900,
              background: 'linear-gradient(135deg,var(--accent-cyan),var(--accent-purple))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontFamily: 'var(--font-mono)',
              letterSpacing: '-1px', marginBottom: 12,
            }}>
              RS.
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Crafting elegant digital experiences with code, creativity, and a passion for innovation. 
              Always learning, always building.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIAL.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', fontSize: '1rem',
                    textDecoration: 'none', transition: 'color 0.2s ease',
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={e => { e.preventDefault(); scrollTo(href); }}
                  whileHover={{ x: 4 }}
                  style={{
                    fontSize: '0.88rem', color: 'var(--text-muted)',
                    textDecoration: 'none', transition: 'color 0.2s ease',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  <span style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem' }}>→</span>
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Email', value: 'rajnishsinh2003@gmail.com', href: 'mailto:rajnishsinh2003@gmail.com' },
                { label: 'Phone', value: '+91 7359458990', href: 'tel:+917359458990' },
                { label: 'Location', value: 'Rajkot, Gujarat 🇮🇳', href: null },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, marginBottom: 2 }}>{label.toUpperCase()}</p>
                  {href ? (
                    <a href={href} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>{value}</a>
                  ) : (
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            © {year} Rajnishkumar Sinh. Made with{' '}
            <FiHeart style={{ color: '#ef4444', fill: '#ef4444' }} />{' '}
            using React & Framer Motion
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['React', 'Framer Motion', 'Vite', 'Tailwind'].map(tech => (
              <span key={tech} className="tech-badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'absolute',
          bottom: 24, right: 24,
          width: 42, height: 42,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,var(--accent-cyan),var(--accent-purple))',
          border: 'none',
          color: '#000',
          fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0,245,255,0.3)',
          zIndex: 10,
        }}
        aria-label="Back to top"
      >
        <FiArrowUp />
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
