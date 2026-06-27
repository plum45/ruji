import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { useSmoothMouse } from '../hooks/useSmoothMouse';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 24 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function IntroSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax variables
  const { x, y } = useSmoothMouse();
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]); // subtle vertical tilt
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]); // subtle horizontal tilt

  const orbX = useTransform(x, [-0.5, 0.5], [-25, 25]); // drift horizontal
  const orbY = useTransform(y, [-0.5, 0.5], [-25, 25]); // drift vertical

  const bgOrbX = useTransform(x, [-0.5, 0.5], [30, -30]); // moves opposite to mouse
  const bgOrbY = useTransform(y, [-0.5, 0.5], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="intro"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: isLight
          ? 'linear-gradient(180deg, #f7f5f0 0%, #eae7e0 100%)'
          : 'linear-gradient(180deg, #0b0a08 0%, #050504 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        perspective: 1200, // Enable 3D space
      }}
    >
      {/* Ambient background glow orbs */}
      <motion.div className="glow-orb orb-1" style={{ top: '15%', right: '5%', x: bgOrbX, y: bgOrbY }} />
      <motion.div className="glow-orb orb-2" style={{ bottom: '15%', left: '5%', x: bgOrbX, y: bgOrbY }} />

      {/* Content wrapper with 3D Parallax Tilt */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 6rem)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Split Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Left Column: Glassy Orb Video */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              x: orbX,
              y: orbY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="orb-wrapper" style={{ width: '100%', maxWidth: '400px', height: '400px' }}>
              <video
                className="glassy-orb"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%' }}
              >
                <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
              </video>
              <div className="orb-overlay" />
            </div>
          </motion.div>

          {/* Right Column: Introduction Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div {...FADE_UP(0.2)}>
              <p
                className="font-body text-sm"
                style={{
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                  color: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)',
                }}
              >
                // Introduction
              </p>
              <h2
                className="font-heading"
                style={{
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: isLight ? '#111' : '#fff',
                }}
              >
                The cellular<br />framework.
              </h2>
            </motion.div>

            <motion.div {...FADE_UP(0.4)} className="liquid-glass" style={{ borderRadius: '1.25rem', padding: '1.5rem 2rem' }}>
              <p
                className="font-body text-sm"
                style={{
                  lineHeight: 1.7,
                  margin: 0,
                  color: isLight ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)',
                }}
              >
                The cytoskeleton is a dynamic, complex network of interlinking protein filaments present in the cytoplasm of all cells. It extends from the cell nucleus to the cell membrane and is composed of similar proteins in various organisms. 
                <br /><br />
                Unlike a mechanical scaffold, the cytoskeleton is a highly dynamic structure that continuously reorganizes as the cell changes shape, divides, or responds to its external environment, acting as both a cellular highway and structural engine.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
