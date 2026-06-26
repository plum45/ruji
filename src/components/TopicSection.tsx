import { motion } from 'framer-motion';

export interface TopicCard {
  tags: string[];
  iconPath: string;
  title: string;
  body: string;
  imagePath?: string;
}

interface TopicSectionProps {
  id: string;
  label: string;         // e.g. "// Actin Networks"
  heading: string;       // big italic heading (can include \n for line break)
  cards: TopicCard[];
  bgColor?: string;      // fallback solid bg, default #000
  overlayColor?: string; // gradient overlay
}

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 24 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

export default function TopicSection({
  id,
  label,
  heading,
  cards,
  bgColor = '#000',
  overlayColor = 'rgba(0,0,0,0.3)',
}: TopicSectionProps) {
  const headingLines = heading.split('\n');

  return (
    <section
      id={id}
      style={{
        position: 'relative',
        height: '100svh',
        background: bgColor,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayColor,
          zIndex: 0,
        }}
      />

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
          <p
            className="font-body text-white/60 text-sm"
            style={{ marginBottom: '0.5rem', letterSpacing: '0.05em' }}
          >
            {label}
          </p>
          <h2
            className="font-heading text-white"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cards.length}, 1fr)`,
            gap: '1rem',
            flex: 1,
            minHeight: 0,
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              {...FADE_UP(0.1 + i * 0.08)}
              className="liquid-glass"
              style={{
                borderRadius: '1.25rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: 0,
              }}
            >
              {/* Image / Placeholder */}
              {card.imagePath ? (
                <div
                  style={{
                    flex: 1,
                    borderRadius: '0.75rem',
                    marginBottom: '0.875rem',
                    overflow: 'hidden',
                    minHeight: 80,
                    display: 'flex',
                  }}
                >
                  <img
                    src={card.imagePath}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
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
              )}

              {/* Top row: icon + tags */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: '0.75rem' }}>
                <div
                  className="liquid-glass"
                  style={{ width: 38, height: 38, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d={card.iconPath} />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 4 }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass font-body text-white/80"
                      style={{ borderRadius: 9999, padding: '3px 8px', fontSize: 10, whiteSpace: 'nowrap' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title + body */}
              <div>
                <h3
                  className="font-heading text-white"
                  style={{ fontStyle: 'italic', fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-body font-light text-white/80 text-xs"
                  style={{ marginTop: '0.5rem', lineHeight: 1.55, maxWidth: '30ch' }}
                >
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
