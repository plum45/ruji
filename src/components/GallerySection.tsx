import { motion } from 'framer-motion';
import Marquee from './Marquee';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

/** Placeholder image cards — gradient boxes with labels */
const ROW_1 = [
  { label: 'Bioluminescence', gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
  { label: 'Deep Ocean', gradient: 'linear-gradient(135deg, #000428, #004e92)' },
  { label: 'Crystal Forms', gradient: 'linear-gradient(135deg, #141e30, #243b55)' },
  { label: 'Nebula Gas', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { label: 'Arctic Light', gradient: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' },
  { label: 'Volcanic Core', gradient: 'linear-gradient(135deg, #200122, #6f0000)' },
];

const ROW_2 = [
  { label: 'Neural Maps', gradient: 'linear-gradient(135deg, #232526, #414345)' },
  { label: 'Quantum Field', gradient: 'linear-gradient(135deg, #0d324d, #7f5a83)' },
  { label: 'Tidal Patterns', gradient: 'linear-gradient(135deg, #0b486b, #f56217)' },
  { label: 'Mycorrhizal Net', gradient: 'linear-gradient(135deg, #1d4350, #a43931)' },
  { label: 'Solar Wind', gradient: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)' },
  { label: 'Fossil Record', gradient: 'linear-gradient(135deg, #1f1c2c, #928dab)' },
];

function Card({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div
      className="liquid-glass"
      style={{
        width: 280,
        height: 180,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ background: gradient, width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
        }}
      >
        <span className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: '1.25rem' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        background: '#000',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        {...FADE_UP(0)}
        style={{ textAlign: 'center', marginBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        <p className="font-body text-white/80 text-sm" style={{ marginBottom: '1rem', letterSpacing: '0.05em' }}>
          // Gallery
        </p>
        <h2
          className="font-heading text-white"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Visual explorations
        </h2>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <motion.div {...FADE_UP(0.15)} style={{ marginBottom: '1.5rem' }}>
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
    </section>
  );
}
