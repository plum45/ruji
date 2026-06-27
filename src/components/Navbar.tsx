import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const NAV_LINKS = [
  { label: 'Home',             tab: 'home',           href: '#hero' },
  { label: 'Components',       tab: 'overview',       href: '#overview' },
  { label: 'Microfilaments',   tab: 'microfilaments', href: '#microfilaments' },
  { label: 'Int. Filaments',   tab: 'intermediate',   href: '#intermediate' },
  { label: 'Microtubules',     tab: 'microtubules',   href: '#microtubules' },
  { label: 'Cell Structure',   tab: 'structure',      href: '#structure' },
  { label: 'Movement',         tab: 'movement',       href: '#movement' },
  { label: 'Cilia & Flagella', tab: 'cilia',          href: '#cilia' },
  { label: 'Cell Division',    tab: 'division',       href: '#division' },
  { label: 'Additional',       tab: 'additional',     href: '#additional' },
];


export default function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';
  const [menuOpen, setMenuOpen] = useState(false);

  const textColor = isLight ? '#111' : '#fff';
  const glassStyle = isLight
    ? {
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }
    : {
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      };

  const hoverBg = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)';

  const handleNav = (link: typeof NAV_LINKS[number]) => {
    setMenuOpen(false);
    setActiveTab(link.tab);
    
    setTimeout(() => {
      if (link.href === '#gallery') {
        const target = document.querySelector('#gallery');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Desktop navbar — hidden on mobile */}
      <nav
        className="fixed top-4 z-50 pointer-events-none"
        style={{ left: '50%', transform: 'translateX(-50%)', display: 'var(--nav-desktop-display, none)' }}
      >
        <div
          className={isLight ? 'pointer-events-auto flex items-center gap-1' : 'liquid-glass pointer-events-auto flex items-center gap-1'}
          style={{ borderRadius: 9999, padding: '5px 6px', ...glassStyle, whiteSpace: 'nowrap' }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.08, backgroundColor: hoverBg }}
            whileTap={{ scale: 0.95 }}
            style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: 4 }}
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.1rem', color: textColor }}>c</span>
          </motion.div>

          <div style={{ width: 1, height: 20, background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)', marginRight: 4 }} />

          {NAV_LINKS.map((link) => {
            const isActive = link.label === 'Gallery' ? false : activeTab === link.tab;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.05, backgroundColor: hoverBg }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.preventDefault(); handleNav(link); }}
                className="font-body font-medium text-sm transition-colors"
                style={{
                  padding: '6px 10px',
                  borderRadius: 9999,
                  textDecoration: 'none',
                  color: isActive
                    ? (isLight ? '#0284c7' : '#38bdf8')
                    : (isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)'),
                  backgroundColor: isActive
                    ? (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.15)')
                    : 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </motion.a>
            );
          })}

          <div style={{ width: 1, height: 20, background: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)', marginLeft: 4, marginRight: 4 }} />

          <motion.button
            whileHover={{ scale: 1.08, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            aria-label="Toggle theme"
            style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isLight ? <Moon size={16} color="#111" /> : <Sun size={16} color="#fff" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile navbar — hidden on desktop */}
      <nav
        className="fixed top-4 left-4 right-4 z-50 pointer-events-none"
        style={{ display: 'var(--nav-mobile-display, flex)', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {/* Logo */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto"
          style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...glassStyle }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.1rem', color: textColor }}>c</span>
        </motion.div>

        {/* Right buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            aria-label="Toggle theme"
            style={{ width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...glassStyle }}
          >
            {isLight ? <Moon size={16} color="#111" /> : <Sun size={16} color="#fff" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...glassStyle }}
          >
            {menuOpen ? <X size={18} color={textColor} /> : <Menu size={18} color={textColor} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed z-40 pointer-events-auto"
            style={{
              top: 68,
              left: 16,
              right: 16,
              borderRadius: '1.25rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              ...glassStyle,
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = link.label === 'Gallery' ? false : activeTab === link.tab;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link); }}
                  className="font-body font-medium text-sm"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    color: isActive
                      ? (isLight ? '#0284c7' : '#38bdf8')
                      : textColor,
                    backgroundColor: isActive
                      ? (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.15)')
                      : 'transparent',
                    display: 'block',
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
