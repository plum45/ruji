import { motion, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';
import { useSmoothMouse } from '../hooks/useSmoothMouse';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function Hero() {
  // Mouse parallax variables for the floating orb
  const { x, y } = useSmoothMouse();
  const orbX = useTransform(x, [-0.5, 0.5], [-35, 35]); // subtle drift horizontal
  const orbY = useTransform(y, [-0.5, 0.5], [-35, 35]); // subtle drift vertical

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
        src="https://www.dropbox.com/scl/fi/1ps43mtjxmkbfwwncotcm/Untitled-design.mp4?rlkey=g1lbbmqla0h65lftu9fdiq399&raw=1"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%', zIndex: 0 }}
        playbackRate={0.75}
      />

      {/* Floating Glassy Orb (desktop only, aligned right) */}
      <div
        className="orb-wrapper"
        style={{
          position: 'absolute',
          right: '8vw',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          display: 'var(--orb-display, flex)',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            x: orbX,
            y: orbY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <video 
            className="glassy-orb" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
          </video>
        </motion.div>
      </div>

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
              style={{ borderRadius: 9999, padding: '10px 20px', textDecoration: 'none', color: 'inherit' }}
            >
              Explore Structure
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#articles"
              className="font-body text-sm flex items-center gap-1.5"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              View Dynamics
              <Play size={14} fill="currentColor" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
