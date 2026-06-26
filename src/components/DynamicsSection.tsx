import { motion } from 'framer-motion';
import FadingVideo from './FadingVideo';
import TopicSection, { type TopicCard } from './TopicSection';

const CARDS: TopicCard[] = [
  {
    tags: ['Microfilaments', 'Motility', 'Shape', 'Actin'],
    iconPath: 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z',
    title: 'Actin Filaments',
    body: 'Microfilaments providing mechanical support, determining cell shape, and enabling directed cell movement.',
  },
  {
    tags: ['Transport', 'Mitosis', 'Tubulin', 'Rigid'],
    iconPath: 'M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z',
    title: 'Microtubules',
    body: 'Rigid hollow rods functioning as tracks for intracellular transport and orchestrating chromosome separation.',
  },
  {
    tags: ['ATP Driven', 'Kinesin', 'Dynein', 'Myosin'],
    iconPath: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z',
    title: 'Motor Proteins',
    body: 'Specialized enzymes generating force and directing cargo payloads across the vast cytoskeletal network.',
  },
];

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function DynamicsSection() {
  return (
    <section
      id="articles"
      style={{
        position: 'relative',
        height: '100svh',
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 'clamp(3.5rem, 7vh, 5.5rem) clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 3vh, 2.5rem)',
          minHeight: 0,
        }}
      >
        {/* Header */}
        <motion.div {...FADE_UP(0)} style={{ marginBottom: '1rem' }}>
          <p className="font-body text-white/60 text-sm" style={{ marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            // Cytoskeleton
          </p>
          <h2
            className="font-heading text-white"
            style={{ fontStyle: 'italic', fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}
          >
            Structural,<br />integrity.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            flex: 1,
            minHeight: 0,
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              {...FADE_UP(0.1 + i * 0.08)}
              className="liquid-glass"
              style={{ borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}
            >
              {/* Image Placeholder */}
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '0.75rem',
                  marginBottom: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed rgba(255,255,255,0.15)',
                  minHeight: 80,
                }}
              >
                <span className="font-body text-white/25 text-xs">Image Placeholder</span>
              </div>

              {/* Icon + tags */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: '0.75rem' }}>
                <div className="liquid-glass" style={{ width: 38, height: 38, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d={card.iconPath} /></svg>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 4 }}>
                  {card.tags.map((tag) => (
                    <span key={tag} className="liquid-glass font-body text-white/80" style={{ borderRadius: 9999, padding: '3px 8px', fontSize: 10, whiteSpace: 'nowrap' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title + body */}
              <div>
                <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
                  {card.title}
                </h3>
                <p className="font-body font-light text-white/80 text-xs" style={{ marginTop: '0.5rem', lineHeight: 1.55, maxWidth: '30ch' }}>
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
