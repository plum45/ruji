import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

const STATS = [
  {
    icon: (
      // Clock icon (SVG outline)
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    number: '50+',
    label: 'Cell Types',
  },
  {
    icon: (
      // Globe icon (SVG outline)
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    number: '3',
    label: 'Filament Systems',
  },
];

const PARTNERS = ['BioSys', 'CellTech', 'CytoLab', 'Kinesin', 'Myosin'];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background video — 120% width, top-aligned */}
      <FadingVideo
        src="https://www.dropbox.com/scl/fi/pqynwn6da76xdf9i260gy/Untitled-20design.mp4?rlkey=ww7pk7zikgw5fq1r0m7yvaeo9&raw=1"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%', zIndex: 0 }}
        playbackRate={0.75}
      />

      {/* z-10 content layer */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Hero content — left aligned */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '4rem',
            paddingLeft: 'clamp(2rem, 5vw, 8rem)',
            paddingRight: '2rem',
            textAlign: 'left',
          }}
        >
          {/* Badge */}
          <motion.div {...FADE_UP(0.4)}
            className="liquid-glass"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, padding: '4px 4px 4px 4px', marginBottom: '1.5rem' }}
          >
            <span
              className="font-body font-semibold text-black text-xs"
              style={{ background: '#fff', borderRadius: 9999, padding: '4px 12px' }}
            >
              New
            </span>
            <span className="font-body text-white/90 text-sm" style={{ paddingRight: 12 }}>
              Explore cellular mechanics
            </span>
          </motion.div>

          {/* Headline — BlurText */}
          <BlurText
            text="Cytoskeleton and Motility"
            className="font-heading text-white"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontStyle: 'italic',
              lineHeight: 0.85,
              maxWidth: '700px',
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              justifyContent: 'flex-start',
            } as React.CSSProperties}
          />

          {/* Subheading */}
          <motion.p {...FADE_UP(0.8)}
            className="font-body font-light text-white"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', maxWidth: 520, lineHeight: 1.6, marginTop: '1rem', marginBottom: 0 }}
          >
            Exploring the intricate network of protein filaments that organize the cell and drive its dynamic movements.
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE_UP(1.1)}
            style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: '1.5rem' }}
          >
            <a
              href="#topics"
              className="liquid-glass-strong font-body font-medium text-sm flex items-center gap-1.5"
              style={{ borderRadius: 9999, padding: '10px 20px', textDecoration: 'none', color: '#fff' }}
            >
              Explore Structure
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#articles"
              className="font-body text-sm flex items-center gap-1.5"
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              View Dynamics
              <Play size={14} fill="white" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div {...FADE_UP(1.3)}
            style={{ display: 'flex', alignItems: 'stretch', gap: 16, marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="liquid-glass"
                style={{ borderRadius: '1.25rem', padding: '20px', width: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}
              >
                {s.icon}
                <div>
                  <div
                    className="font-heading text-white"
                    style={{ fontStyle: 'italic', fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}
                  >
                    {s.number}
                  </div>
                  <div className="font-body font-light text-white text-xs" style={{ marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partners strip */}
        <motion.div {...FADE_UP(1.4)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, paddingBottom: '2rem', paddingLeft: 'clamp(2rem, 5vw, 8rem)', paddingRight: '2rem' }}
        >
          <div
            className="liquid-glass font-body font-medium text-white text-xs"
            style={{ borderRadius: 9999, padding: '4px 14px' }}
          >
            Supported by leading molecular biology research centers
          </div>
          <div style={{ display: 'flex', gap: 'clamp(2rem, 4vw, 4rem)', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="font-heading text-white"
                style={{ fontStyle: 'italic', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '-0.02em' }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
