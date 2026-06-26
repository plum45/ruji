import { motion } from 'framer-motion';
import FadingVideo from './FadingVideo';

const CARDS = [
  {
    tags: ['Deep Dives', 'Research', 'Evidence-Based', 'Peer-Reviewed'],
    iconPath: 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z',
    title: 'Visual Learning',
    body: 'Every article is built around rich diagrams, illustrations, and real data — making complex concepts effortlessly clear.',
  },
  {
    tags: ['Weekly Drops', 'Curated', 'Time-Saving', 'Ready to Read'],
    iconPath: 'M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z',
    title: 'Curated Collections',
    body: 'Handpicked series of articles grouped by theme, so you can explore an entire subject with one continuous reading session.',
  },
  {
    tags: ['Expert Authors', 'Verified Facts', 'Cited Sources', 'No Ads'],
    iconPath: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z',
    title: 'Expert Insights',
    body: 'Written by domain specialists, each piece goes beyond the surface — giving you the "why" behind every discovery.',
  },
];

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function CapabilitiesSection() {
  return (
    <section
      id="topics"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Background video — full bleed */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          padding: 'clamp(5rem, 10vw, 6rem) clamp(1.5rem, 5vw, 5rem) 2.5rem',
        }}
      >
        {/* Header */}
        <motion.div {...FADE_UP(0)} style={{ marginBottom: 'auto' }}>
          <p
            className="font-body text-white/80 text-sm"
            style={{ marginBottom: '1.5rem', letterSpacing: '0.05em' }}
          >
            // What We Offer
          </p>
          <h2
            className="font-heading text-white"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 9vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Knowledge,<br />refined.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              {...FADE_UP(0.15 + i * 0.1)}
              className="liquid-glass"
              style={{
                borderRadius: '1.25rem',
                padding: '1.5rem',
                minHeight: 360,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top row: icon + tags */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                {/* Icon box */}
                <div
                  className="liquid-glass"
                  style={{ width: 44, height: 44, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d={card.iconPath} />
                  </svg>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 6, maxWidth: '70%' }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass font-body text-white/90"
                      style={{ borderRadius: 9999, padding: '4px 10px', fontSize: 11, whiteSpace: 'nowrap' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Bottom: title + body */}
              <div style={{ marginTop: '1.5rem' }}>
                <h3
                  className="font-heading text-white"
                  style={{ fontStyle: 'italic', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-body font-light text-white/90 text-sm"
                  style={{ marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '32ch' }}
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
