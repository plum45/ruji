import { motion } from 'framer-motion';
import Marquee from './Marquee';
import FadingVideo from './FadingVideo';
import { useTheme } from '../ThemeContext';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

/** Placeholder image cards — gradient boxes with labels */
const ROW_1 = [
  { label: 'Actin Networks', gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
  { label: 'Mitotic Spindle', gradient: 'linear-gradient(135deg, #000428, #004e92)' },
  { label: 'Cell Migration', gradient: 'linear-gradient(135deg, #141e30, #243b55)' },
  { label: 'Lamellipodia', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { label: 'Axonemal Structure', gradient: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' },
  { label: 'Cytokinesis', gradient: 'linear-gradient(135deg, #200122, #6f0000)' },
];

const ROW_2 = [
  { label: 'Microtubules', gradient: 'linear-gradient(135deg, #232526, #414345)' },
  { label: 'Motor Proteins', gradient: 'linear-gradient(135deg, #0d324d, #7f5a83)' },
  { label: 'Kinetochore', gradient: 'linear-gradient(135deg, #0b486b, #f56217)' },
  { label: 'Intermediate Filaments', gradient: 'linear-gradient(135deg, #1d4350, #a43931)' },
  { label: 'Cell Cortex', gradient: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)' },
  { label: 'Myosin Bundles', gradient: 'linear-gradient(135deg, #1f1c2c, #928dab)' },
];

function Card({ label, gradient }: { label: string; gradient: string }) {
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
      <div style={{ position: 'absolute', inset: 0, border: '1.5px dashed rgba(255,255,255,0.25)', margin: '10px', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="font-body text-white/40 text-xs font-medium">Image Preview</span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        }}
      >
        <span className="font-heading text-white font-medium" style={{ fontStyle: 'italic', fontSize: '1.25rem', letterSpacing: '-0.02em', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
      }}
    >
      {/* Background video — full bleed */}
      <FadingVideo
        src="https://www.dropbox.com/scl/fi/h5k8xh5dfoaq74ofehpne/3D_glass_sculpture_fluid_motion_202606271449.mp4?rlkey=1grlebvruxp2pqz628uf7ixh9&raw=1"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: isLight ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.35)', 
          zIndex: 1 
        }} 
      />

      {/* Header */}
      <motion.div
        {...FADE_UP(0)}
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          marginBottom: '2.5rem', 
          paddingTop: '5rem', // Clear navbar
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
          zIndex: 10,
          transform: 'perspective(1200px) rotateX(10deg) rotateY(-8deg) rotateZ(-3deg) scale(1.0)',
          transformOrigin: 'center center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}
      >
        {/* Row 1 — scrolls left */}
        <motion.div {...FADE_UP(0.15)}>
          <Marquee speed={30} direction="left" gap={20}>
            {ROW_1.map((item) => (
              <Card key={item.label} {...item} />
            ))}
          </Marquee>
        </motion.div>

        {/* Row 2 — scrolls right */}
        <motion.div {...FADE_UP(0.25)}>
          <Marquee speed={25} direction="right" gap={20}>
            {ROW_2.map((item) => (
              <Card key={item.label} {...item} />
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
