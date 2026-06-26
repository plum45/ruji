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
    number: '500+',
    label: 'In-depth Articles',
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
    number: '12+',
    label: 'Topics Covered',
  },
];

const PARTNERS = ['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background video — 120% width, top-aligned */}
      <FadingVideo
        src="https://res.cloudinary.com/dd6uh0fb2/video/upload/2026-06-26_17-14-33_Lumina_1_r8rbdk.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%', zIndex: 0 }}
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
            paddingTop: '6rem',
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
              Explore the latest knowledge articles
            </span>
          </motion.div>

          {/* Headline — BlurText */}
          <BlurText
            text="Discover Knowledge Beyond Boundaries"
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
            Curated insights on science, nature, and the world around us — presented with a design worthy of the content inside.
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE_UP(1.1)}
            style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: '1.5rem' }}
          >
            <a
              href="#topics"
              className="liquid-glass-strong font-body font-medium text-white text-sm flex items-center gap-1.5"
              style={{ borderRadius: 9999, padding: '10px 20px', textDecoration: 'none' }}
            >
              Start Reading
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#articles"
              className="font-body text-white text-sm flex items-center gap-1.5"
              style={{ textDecoration: 'none' }}
            >
              Browse Topics
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
            Featured in top knowledge communities globally
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
