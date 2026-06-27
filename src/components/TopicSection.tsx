import { motion, useTransform } from 'framer-motion';
import { useSmoothMouse } from '../hooks/useSmoothMouse';
import { useTheme } from '../ThemeContext';
import { ReadMoreText } from './ReadMoreText';

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
  accentColor?: string;  // theme accent color for tags/icons e.g. '#06b6d4'
}

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 24 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const CARD_ANIMATION = (delay: number) => ({
  initial: 'initial',
  whileInView: 'animate',
  whileHover: 'hover',
  viewport: { once: true, amount: 0.1 },
  variants: {
    initial: { filter: 'blur(8px)', opacity: 0, y: 24 },
    animate: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' as const }
    },
    hover: {
      y: -8,
      scale: 1.015,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  }
});

// Converts hex color to rgba with given alpha
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function TopicSection({
  id,
  label,
  heading,
  cards,
  bgColor = '#000',
  overlayColor = 'rgba(0,0,0,0.3)',
  accentColor = '#ffffff',
}: TopicSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const headingLines = heading.split('\n');

  // Mouse tilt variables
  const { x, y } = useSmoothMouse();
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  const orbX = useTransform(x, [-0.5, 0.5], [30, -30]);
  const orbY = useTransform(y, [-0.5, 0.5], [30, -30]);

  // Accent-derived colors
  const tagBg = hexToRgba(accentColor, isLight ? 0.12 : 0.18);
  const iconBg = hexToRgba(accentColor, isLight ? 0.1 : 0.15);
  const cardBorder = hexToRgba(accentColor, isLight ? 0.15 : 0.2);
  const accentGlow = hexToRgba(accentColor, 0.12);

  return (
    <section
      id={id}
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: bgColor,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        perspective: 1200,
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayColor,
          zIndex: 0,
        }}
      />

      {/* Accent glow orb (unique per tab) */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 500,
          height: 500,
          background: accentGlow,
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: 400,
          height: 400,
          background: accentGlow,
          borderRadius: '50%',
          filter: 'blur(120px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient mouse-tracked orbs */}
      <motion.div className="glow-orb orb-1" style={{ top: '15%', left: '10%', x: orbX, y: orbY }} />
      <motion.div className="glow-orb orb-2" style={{ bottom: '20%', right: '10%', x: orbX, y: orbY }} />

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 'clamp(3.5rem, 7vh, 5.5rem) clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 3vh, 2.5rem)',
          minHeight: 0,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Header */}
        <motion.div {...FADE_UP(0)} style={{ marginBottom: '1.5rem' }}>
          {/* Accent line */}
          <div style={{
            width: 40,
            height: 3,
            background: accentColor,
            borderRadius: 2,
            marginBottom: '0.75rem',
            opacity: 0.8,
          }} />
          <p
            className="font-body text-sm"
            style={{
              marginBottom: '0.5rem',
              letterSpacing: '0.05em',
              color: isLight ? hexToRgba(accentColor, 0.7) : hexToRgba(accentColor, 0.6),
            }}
          >
            {label}
          </p>
          <h2
            className="font-heading"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
              color: isLight ? '#111' : '#fff',
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
            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`,
            gap: '1rem',
            flex: 1,
            minHeight: 0,
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              {...CARD_ANIMATION(0.1 + i * 0.08)}
              className="liquid-glass"
              style={{
                borderRadius: '1.25rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: 0,
                cursor: 'pointer',
                border: `1px solid ${cardBorder}`,
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
                  <motion.img
                    src={card.imagePath}
                    alt={card.title}
                    variants={{ hover: { scale: 1.05 } }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    flex: 1,
                    background: hexToRgba(accentColor, 0.05),
                    borderRadius: '0.75rem',
                    marginBottom: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px dashed ${hexToRgba(accentColor, 0.2)}`,
                    minHeight: 80,
                  }}
                >
                  <span
                    className="font-body text-xs"
                    style={{ color: hexToRgba(accentColor, 0.35) }}
                  >
                    Image Placeholder
                  </span>
                </div>
              )}

              {/* Top row: icon + tags */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: '0.75rem' }}>
                <motion.div
                  variants={{ hover: { rotate: 15, scale: 1.05 } }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '0.625rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: iconBg,
                    border: `1px solid ${hexToRgba(accentColor, 0.25)}`,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={accentColor}>
                    <path d={card.iconPath} />
                  </svg>
                </motion.div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 4 }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body"
                      style={{
                        borderRadius: 9999,
                        padding: '3px 8px',
                        fontSize: 10,
                        whiteSpace: 'nowrap',
                        background: tagBg,
                        color: isLight ? accentColor : hexToRgba(accentColor, 0.9),
                        border: `1px solid ${hexToRgba(accentColor, 0.2)}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title + body */}
              <div>
                <h3
                  className="font-heading"
                  style={{
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    margin: 0,
                    color: isLight ? '#111' : '#fff',
                  }}
                >
                  {card.title}
                </h3>
                <ReadMoreText text={card.body} isLight={isLight} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
