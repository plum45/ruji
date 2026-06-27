import { useEffect, useState } from 'react';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
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
  const [hidden, setHidden] = useState(false);
  const lastY = { current: 0 };
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = isLight ? '#111' : '#fff';
  const glassStyle = isLight
    ? {
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }
    : {};

  return (
    <nav
      className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 pointer-events-none"
      style={{
        transform: hidden ? 'translateY(-140%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Logo */}
      <div
        className={isLight ? 'pointer-events-auto flex items-center justify-center' : 'liquid-glass pointer-events-auto flex items-center justify-center'}
        style={{ width: 48, height: 48, borderRadius: '50%', cursor: 'default', ...glassStyle }}
      >
        <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.25rem', color: textColor }}>
          c
        </span>
      </div>

      {/* Center pill nav — desktop */}
      <div
        className={isLight ? 'pointer-events-auto hidden md:flex items-center gap-1' : 'liquid-glass pointer-events-auto hidden md:flex items-center gap-1'}
        style={{ borderRadius: 9999, padding: '6px', ...glassStyle }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              const target = document.querySelector(link.href);
              if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-body font-medium text-sm transition-colors"
            style={{
              padding: '8px 12px',
              borderRadius: 9999,
              textDecoration: 'none',
              color: isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#footer"
          onClick={(e) => {
            const target = document.querySelector('#footer');
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="pointer-events-auto font-body font-semibold text-sm flex items-center gap-1 whitespace-nowrap"
          style={{
            background: isLight ? '#111' : '#fff',
            color: isLight ? '#fff' : '#111',
            borderRadius: 9999,
            padding: '8px 16px',
            textDecoration: 'none',
            marginLeft: 4,
          }}
        >
          Read Now
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Right: theme toggle */}
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="pointer-events-auto flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: isLight ? '0 4px 24px rgba(0,0,0,0.08)' : 'inset 0 1px 1px rgba(255,255,255,0.1)',
          transition: 'background 0.3s ease',
        }}
      >
        {isLight
          ? <Moon size={18} color="#111" />
          : <Sun size={18} color="#fff" />
        }
      </button>
    </nav>
  );
}
