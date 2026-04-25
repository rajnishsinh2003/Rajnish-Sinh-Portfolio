import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background blobs */}
          <div className="blob" style={{ width: 400, height: 400, background: 'rgba(0,245,255,0.06)', top: '10%', left: '20%', animationDelay: '0s' }} />
          <div className="blob" style={{ width: 300, height: 300, background: 'rgba(139,92,246,0.08)', bottom: '15%', right: '15%', animationDelay: '2s' }} />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="loader-logo"
          >
            RS.
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
          >
            Loading Portfolio
          </motion.p>

          <div style={{ width: 200 }}>
            <div className="loader-bar-track">
              <motion.div
                className="loader-bar-fill"
                style={{ background: 'linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: 8, fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {Math.min(Math.round(progress), 100)}%
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[0,1,2].map(i => (
              <motion.div
                key={i}
                style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
