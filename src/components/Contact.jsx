import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'rajnishsinh2003@gmail.com',
    href: 'mailto:rajnishsinh2003@gmail.com',
    color: 'var(--accent-cyan)',
    rgb: '0,245,255',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 7359458990',
    href: 'tel:+917359458990',
    color: 'var(--accent-purple)',
    rgb: '139,92,246',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Rajkot, Gujarat, India',
    href: 'https://maps.google.com/?q=Rajkot,Gujarat,India',
    color: 'var(--accent-pink)',
    rgb: '236,72,153',
  },
];

const SOCIAL_LINKS = [
  { Icon: FiGithub, href: 'https://github.com/rajnishsinh2003', label: 'GitHub', color: '#ffffff' },
  { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/rajnish-sinh-430a94405/', label: 'LinkedIn', color: '#0077b5' },
  { Icon: FiMail, href: 'mailto:rajnishsinh2003@gmail.com', label: 'Email', color: 'var(--accent-cyan)' },
];

const Contact = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    setStatus('sending');

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, 'messages'), {
        ...form,
        createdAt: serverTimestamp(),
      });
      
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('idle');
      alert("Something went wrong. Please try again or use direct contact methods.");
    }
  };

  return (
    <section id="contact" className="section" ref={ref} style={{
      background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,245,255,0.04) 0%, transparent 70%), var(--bg-primary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">// GET IN TOUCH</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'start' }}>

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass-card" style={{ padding: 32, marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>
                Open to Opportunities
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                I'm currently seeking internship and entry-level opportunities in Full Stack, Android, or AI development. 
                Whether it's a project, collaboration, or just a chat — I'm always happy to connect!
              </p>

              {/* Status badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 50,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)', animation: 'pulse-glow 2s infinite' }} />
                Available for work
              </div>
            </div>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href, color, rgb }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === 'Location' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, scale: 1.01 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `rgba(${rgb},0.1)`,
                    border: `1px solid rgba(${rgb},0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', color, flexShrink: 0,
                  }}>
                    <Icon />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, marginBottom: 2 }}>{label.toUpperCase()}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.12 }}
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)', fontSize: '1.1rem',
                    textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card"
            style={{ padding: 36 }}
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    textAlign: 'center', padding: '40px 20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      width: 70, height: 70, borderRadius: '50%',
                      background: 'rgba(16,185,129,0.15)',
                      border: '2px solid rgba(16,185,129,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem', color: 'var(--accent-green)',
                      boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                    }}
                  >
                    <FiCheck />
                  </motion.div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                  noValidate
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>NAME *</label>
                      <input
                        className="form-input"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                      />
                      {errors.name && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>EMAIL *</label>
                      <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        style={{ borderColor: errors.email ? '#ef4444' : undefined }}
                      />
                      {errors.email && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4 }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>SUBJECT</label>
                    <input
                      className="form-input"
                      name="subject"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>MESSAGE *</label>
                    <textarea
                      className="form-input"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      value={form.message}
                      onChange={handleChange}
                      style={{
                        resize: 'vertical', minHeight: 120,
                        borderColor: errors.message ? '#ef4444' : undefined,
                      }}
                    />
                    {errors.message && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4 }}>{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '14px 32px',
                      background: status === 'sending'
                        ? 'rgba(255,255,255,0.08)'
                        : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                      border: 'none',
                      borderRadius: 12,
                      color: status === 'sending' ? 'var(--text-muted)' : '#000',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: status === 'sending' ? 'none' : '0 0 20px rgba(0,245,255,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid var(--accent-cyan)', borderTopColor: 'transparent', borderRadius: '50%' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <><FiSend /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
          #contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
