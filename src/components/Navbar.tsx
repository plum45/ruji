import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Cytoskeleton', href: '#articles' },
  { label: 'Actin', href: '#actin' },
  { label: 'Microtubules', href: '#microtubules' },
  { label: 'Motors', href: '#motors' },
  { label: 'Motility', href: '#motility' },
  { label: 'Gallery', href: '#gallery' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  const textColor = isLight ? '#111' : '#fff';
  const glassStyle = isLight
    ? {
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }
    : {
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      };

  const hoverBg = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)';

  return (
    <nav className="fixed top-4 z-50 pointer-events-none" style={{ left: '50%', transform: 'translateX(-50%)' }}>
      {/* Single centered pill containing logo + links + theme toggle */}
      <div
        className={isLight ? 'pointer-events-auto flex items-center gap-1' : 'liquid-glass pointer-events-auto flex items-center gap-1'}
        style={{ borderRadius: 9999, padding: '5px 6px', ...glassStyle, whiteSpace: 'nowrap' }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.08, backgroundColor: hoverBg }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginRight: 4,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.1rem', color: textColor }}>
            c
          </span>
        </motion.div>

        {/* Divider */}
        <div style={{
          width: 1,
          height: 20,
          background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)',
          marginRight: 4,
        }} />

        {/* Links */}
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            whileHover={{ scale: 1.05, backgroundColor: hoverBg }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              const target = document.querySelector(link.href);
              if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-body font-medium text-sm transition-colors"
            style={{
              padding: '6px 10px',
              borderRadius: 9999,
              textDecoration: 'none',
              color: isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
              whiteSpace: 'nowrap',
            }}
          >
            {link.label}
          </motion.a>
        ))}

        {/* Divider */}
        <div style={{
          width: 1,
          height: 20,
          background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)',
          marginLeft: 4,
          marginRight: 4,
        }} />

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.08, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          aria-label="Toggle theme"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLight
            ? <Moon size={16} color="#111" />
            : <Sun size={16} color="#fff" />
          }
        </motion.button>
      </div>
    </nav>
  );
}
