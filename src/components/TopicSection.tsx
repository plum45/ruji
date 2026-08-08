import { motion, useTransform } from 'framer-motion';
import { useSmoothMouse } from '../hooks/useSmoothMouse';
import { useTheme } from '../ThemeContext';

export interface TopicCard {
  tags: string[];
  iconPath: string;
  title: string;
  body: string;
  imagePath?: string;
  images?: string[];
}

interface TopicSectionProps {
  id: string;
  label: string;         // e.g. "// Activities"
  heading: string;       // big italic heading
  cards: TopicCard[];
  bgColor?: string;      // fallback solid bg
  overlayColor?: string; // gradient overlay
  accentColor?: string;  // theme accent color
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
      y: -4,
      scale: 1.01,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  }
});

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

  // Mouse tilt variables
  const { x, y } = useSmoothMouse();
  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);
  const orbX = useTransform(x, [-0.5, 0.5], [30, -30]);
  const orbY = useTransform(y, [-0.5, 0.5], [30, -30]);

  // Accent-derived colors
  const tagBg = hexToRgba(accentColor, isLight ? 0.12 : 0.18);
  const iconBg = hexToRgba(accentColor, isLight ? 0.1 : 0.15);
  const cardBorder = hexToRgba(accentColor, isLight ? 0.15 : 0.2);
  const accentGlow = hexToRgba(accentColor, 0.12);

  // If cards have images, render each card as its own full 100vh section
  const isSectionPerCard = cards.some((c) => (c.images && c.images.length > 0) || c.imagePath);

  if (isSectionPerCard) {
    return (
      <>
        {cards.map((card, cardIndex) => (
          <section
            key={card.title}
            id={cardIndex === 0 ? id : `${id}-${cardIndex + 1}`}
            style={{
              position: 'relative',
              minHeight: '100vh',
              background: bgColor,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              perspective: 1200,
              padding: 'clamp(3.5rem, 6vh, 5rem) clamp(1.5rem, 5vw, 5rem)',
            }}
          >
            {/* Background gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: overlayColor, zIndex: 0 }} />

            {/* Glow orbs */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: cardIndex % 2 === 0 ? '-5%' : 'auto',
                right: cardIndex % 2 === 1 ? '-5%' : 'auto',
                width: 500,
                height: 500,
                background: accentGlow,
                borderRadius: '50%',
                filter: 'blur(100px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Ambient mouse orbs */}
            <motion.div className="glow-orb orb-1" style={{ top: '15%', left: '10%', x: orbX, y: orbY }} />

            {/* Main Content */}
            <motion.div
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '1400px',
                width: '100%',
                margin: '0 auto',
                flex: 1,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Header / Section Tag */}
              <motion.div {...FADE_UP(0)} style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: 40,
                    height: 3,
                    background: accentColor,
                    borderRadius: 2,
                    marginBottom: '0.5rem',
                    opacity: 0.8,
                  }}
                />
                <p
                  className="font-body text-xs font-semibold"
                  style={{
                    letterSpacing: '0.05em',
                    color: isLight ? hexToRgba(accentColor, 0.8) : hexToRgba(accentColor, 0.7),
                    marginBottom: '0.25rem',
                  }}
                >
                  {label} ({String(cardIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')})
                </p>
                <h2
                  className="font-heading"
                  style={{
                    fontStyle: 'italic',
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    color: isLight ? '#111' : '#fff',
                  }}
                >
                  {card.title}
                </h2>
              </motion.div>

              {/* Main Activity Glass Card */}
              <motion.div
                {...CARD_ANIMATION(0.2)}
                className="liquid-glass"
                style={{
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.25rem, 3vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  border: `1px solid ${cardBorder}`,
                }}
              >
                {/* Top row: tags + icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: iconBg,
                        border: `1px solid ${hexToRgba(accentColor, 0.25)}`,
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill={accentColor}>
                        <path d={card.iconPath} />
                      </svg>
                    </div>
                    <span className="font-heading text-xl font-bold italic" style={{ color: isLight ? '#111' : '#fff' }}>
                      {card.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs font-semibold"
                        style={{
                          borderRadius: 9999,
                          padding: '4px 12px',
                          background: tagBg,
                          color: isLight ? accentColor : hexToRgba(accentColor, 0.9),
                          border: `1px solid ${hexToRgba(accentColor, 0.25)}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3-Image Gallery Grid */}
                {card.images && card.images.length > 0 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`,
                      gap: '0.75rem',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                    }}
                  >
                    {card.images.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`${card.title} ${idx + 1}`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: '100%',
                          height: 'clamp(220px, 34vh, 380px)',
                          objectFit: 'cover',
                          objectPosition: 'center 15%',
                          borderRadius: '0.75rem',
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Single Image fallback */}
                {card.imagePath && !card.images && (
                  <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                    <motion.img
                      src={card.imagePath}
                      alt={card.title}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: 'clamp(220px, 34vh, 380px)',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        borderRadius: '0.75rem',
                      }}
                    />
                  </div>
                )}

                {/* Description Body */}
                <p
                  className="font-body text-sm md:text-base"
                  style={{
                    lineHeight: 1.8,
                    margin: 0,
                    color: isLight ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
                  }}
                >
                  {card.body}
                </p>
              </motion.div>
            </motion.div>
          </section>
        ))}
      </>
    );
  }

  // Default Grid layout for non-image cards
  const headingLines = heading.split('\n');

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
      <div style={{ position: 'absolute', inset: 0, background: overlayColor, zIndex: 0 }} />
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
      <motion.div className="glow-orb orb-1" style={{ top: '15%', left: '10%', x: orbX, y: orbY }} />
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
        <motion.div {...FADE_UP(0)} style={{ marginBottom: '1.5rem' }}>
          <div style={{ width: 40, height: 3, background: accentColor, borderRadius: 2, marginBottom: '0.75rem', opacity: 0.8 }} />
          <p className="font-body text-sm" style={{ marginBottom: '0.5rem', letterSpacing: '0.05em', color: isLight ? hexToRgba(accentColor, 0.7) : hexToRgba(accentColor, 0.6) }}>
            {label}
          </p>
          <h2 className="font-heading" style={{ fontStyle: 'italic', fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0, color: isLight ? '#111' : '#fff' }}>
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`, gap: '1rem', flex: 1, minHeight: 0 }}>
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
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: '0.75rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: iconBg, border: `1px solid ${hexToRgba(accentColor, 0.25)}` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={accentColor}>
                    <path d={card.iconPath} />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 4 }}>
                  {card.tags.map((tag) => (
                    <span key={tag} className="font-body" style={{ borderRadius: 9999, padding: '3px 8px', fontSize: 10, whiteSpace: 'nowrap', background: tagBg, color: isLight ? accentColor : hexToRgba(accentColor, 0.9), border: `1px solid ${hexToRgba(accentColor, 0.2)}` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="font-heading" style={{ fontStyle: 'italic', fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', letterSpacing: '-0.03em', lineHeight: 1, margin: 0, color: isLight ? '#111' : '#fff' }}>
                {card.title}
              </h3>
              <p className="font-body text-xs md:text-sm mt-2" style={{ lineHeight: 1.6, color: isLight ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.8)' }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
