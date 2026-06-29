import { motion, useTransform } from 'framer-motion';
import Marquee from './Marquee';
import FadingVideo from './FadingVideo';
import { useTheme } from '../ThemeContext';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

/** Ken Burns pan+zoom variants — each card gets one assigned by index */
const KENBURNS = [
  { animate: { scale: [1, 1.12, 1.08], x: [0, -12, 6], y: [0, -8, 4] } },
  { animate: { scale: [1.05, 1, 1.1], x: [0, 10, -6], y: [0, 6, -8] } },
  { animate: { scale: [1, 1.08, 1.14], x: [0, 8, -10], y: [0, -6, 10] } },
  { animate: { scale: [1.08, 1.14, 1.04], x: [-8, 4, 10], y: [6, -10, 2] } },
];

/** Placeholder image cards — gradient boxes with labels */
const ROW_1 = [
  { label: 'Actin Networks', gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', imagePath: '/gallery/actin_networks.png' },
  { label: 'Mitotic Spindle', gradient: 'linear-gradient(135deg, #000428, #004e92)', imagePath: '/gallery/mitotic_spindle.png' },
  { label: 'Cell Migration', gradient: 'linear-gradient(135deg, #141e30, #243b55)', imagePath: '/gallery/cell_migration.png' },
  { label: 'Lamellipodia', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', imagePath: '/gallery/lamellipodia.png' },
  { label: 'Axonemal Structure', gradient: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)', imagePath: '/gallery/axonemal_structure.png' },
  { label: 'Cytokinesis', gradient: 'linear-gradient(135deg, #200122, #6f0000)', imagePath: '/gallery/cytokinesis.png' },
];

const ROW_2 = [
  { label: 'Microtubules', gradient: 'linear-gradient(135deg, #232526, #414345)', imagePath: '/gallery/microtubules.png' },
  { label: 'Motor Proteins', gradient: 'linear-gradient(135deg, #0d324d, #7f5a83)', imagePath: '/gallery/motor_proteins.png' },
  { label: 'Kinetochore', gradient: 'linear-gradient(135deg, #0b486b, #f56217)', imagePath: '/gallery/kinetochore.png' },
  { label: 'Intermediate Filaments', gradient: 'linear-gradient(135deg, #1d4350, #a43931)', imagePath: '/gallery/intermediate_filaments.png' },
  { label: 'Cell Cortex', gradient: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)', imagePath: '/gallery/cell_cortex.png' },
  { label: 'Myosin Bundles', gradient: 'linear-gradient(135deg, #1f1c2c, #928dab)', imagePath: '/gallery/myosin_bundles.png' },
];

function Card({ label, gradient, imagePath, kenBurnsIndex = 0 }: { label: string; gradient: string; imagePath?: string; kenBurnsIndex?: number }) {
  const kb = KENBURNS[kenBurnsIndex % KENBURNS.length];
  return (
    <div
      className="liquid-glass"
      style={{
        width: 260,
        height: 160,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
      }}
    >
      {imagePath ? (
        <motion.img
          src={imagePath}
          alt={label}
          animate={kb.animate}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center center',
          }}
        />
      ) : (
        <div 
          style={{ 
            background: gradient, 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            inset: 0,
            opacity: 0.5, // Semi-transparent for colored glass look
          }} 
        />
      )}

      {/* Color tint overlay to blend microscopy images with the card theme */}
      <div 
        style={{ 
          background: gradient, 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          inset: 0,
          opacity: 0.15,
          mixBlendMode: 'overlay',
          zIndex: 1,
        }} 
      />

      {!imagePath && (
        <div style={{ position: 'absolute', inset: 0, border: '1.5px dashed rgba(255,255,255,0.25)', margin: '10px', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-body text-white/40 text-xs font-medium">Image Preview</span>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.25rem 1rem 1rem',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.98))',
          zIndex: 2,
        }}
      >
        <span className="font-heading font-semibold gallery-card-label" style={{ fontStyle: 'italic', fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.95), 0 8px 32px rgba(0,0,0,0.8)' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

import { useSmoothMouse } from '../hooks/useSmoothMouse';

export default function GallerySection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Mouse tilt variables
  const { x, y } = useSmoothMouse();
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]); // subtle vertical tilt
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]); // subtle horizontal tilt

  const videoX = useTransform(x, [-0.5, 0.5], [25, -25]); // moves opposite to mouse
  const videoY = useTransform(y, [-0.5, 0.5], [25, -25]);

  return (
    <section
      id="gallery"
      className="snap-start snap-always"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: isLight ? '#fff' : '#000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        perspective: 1200, // Enable 3D space
      }}
    >
      {/* Background video parallax wrapper */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-25px', // Extend slightly so we don't see edges on translation
          zIndex: 0,
          x: videoX,
          y: videoY,
        }}
      >
        <FadingVideo
          src="https://www.dropbox.com/scl/fi/h5k8xh5dfoaq74ofehpne/3D_glass_sculpture_fluid_motion_202606271449.mp4?rlkey=1grlebvruxp2pqz628uf7ixh9&raw=1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: isLight ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.35)', 
          }} 
        />
      </motion.div>

      {/* Centered Content Wrapper */}
      <motion.div 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d', // Enable 3D tilt
        }}
      >
        {/* Header */}
        <motion.div
          {...FADE_UP(0)}
          style={{ 
            textAlign: 'center', 
            marginBottom: '2.5rem', 
            paddingLeft: '1rem', 
            paddingRight: '1rem' 
          }}
        >
          <p 
            className="font-body text-sm" 
            style={{ 
              marginBottom: '1rem', 
              letterSpacing: '0.05em',
              color: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)'
            }}
          >
            // Gallery
          </p>
          <h2
            className="font-heading"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
              color: isLight ? '#111' : '#fff'
            }}
          >
            Visual explorations
          </h2>
        </motion.div>

        {/* 3D Tilted Wrapper for Marquees */}
        <div
          style={{
            position: 'relative',
            transform: 'perspective(1200px) rotateX(10deg) rotateY(-8deg) rotateZ(-3deg) scale(1.0)',
            transformOrigin: 'center center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '100%',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
          }}
        >
          {/* Row 1 — scrolls left */}
          <motion.div {...FADE_UP(0.15)}>
            <Marquee speed={30} direction="left" gap={20}>
              {ROW_1.map((item, i) => (
                <Card key={item.label} {...item} kenBurnsIndex={i} />
              ))}
            </Marquee>
          </motion.div>

          {/* Row 2 — scrolls right */}
          <motion.div {...FADE_UP(0.25)}>
            <Marquee speed={25} direction="right" gap={20}>
              {ROW_2.map((item, i) => (
                <Card key={item.label} {...item} kenBurnsIndex={i + 2} />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
