import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Structure', href: '#topics' },
  { label: 'Dynamics', href: '#articles' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Research', href: '#about' },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastY = { current: 0 };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        className="liquid-glass pointer-events-auto flex items-center justify-center"
        style={{ width: 48, height: 48, borderRadius: '50%', cursor: 'default' }}
      >
        <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#fff' }}>
          c
        </span>
      </div>

      {/* Center pill nav — desktop */}
      <div
        className="liquid-glass pointer-events-auto hidden md:flex items-center gap-1"
        style={{ borderRadius: 9999, padding: '6px' }}
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
            className="font-body font-medium text-white/90 text-sm hover:text-white transition-colors"
            style={{ padding: '8px 12px', borderRadius: 9999, textDecoration: 'none' }}
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
          className="pointer-events-auto font-body font-semibold text-black text-sm flex items-center gap-1 whitespace-nowrap"
          style={{
            background: '#fff',
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

      {/* Right spacer (keeps logo centered on desktop) */}
      <div style={{ width: 48, height: 48 }} />
    </nav>
  );
}
