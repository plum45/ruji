import { useRef, useEffect, ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode[];
  /** px/sec — lower = slower */
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
}

/**
 * Infinite looping marquee — pure CSS animation, no JS scroll loop.
 * Duplicates children so the seam is invisible.
 * Pauses and scales cards on hover.
 */
export default function Marquee({
  children,
  speed = 40,
  direction = 'left',
  gap = 24,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate animation duration based on content width and speed
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const recalc = () => {
      // Each "half" of the track is one copy of children
      const halfWidth = track.scrollWidth / 2;
      const duration = halfWidth / speed;
      track.style.setProperty('--marquee-duration', `${duration}s`);
    };

    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [speed, children]);

  const items = [...children, ...children]; // duplicate for seamless loop

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        // Fade edges
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation-name: var(--marquee-dir);
          animation-duration: var(--marquee-duration, 20s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        /* Pause the whole track when any child is hovered */
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease;
          cursor: default;
        }
        .marquee-item:hover {
          transform: scale(1.05);
          position: relative;
          z-index: 2;
        }
      `}</style>

      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          gap,
          '--marquee-dir': direction === 'left' ? 'marquee-left' : 'marquee-right',
        } as React.CSSProperties}
      >
        {items.map((child, i) => (
          <div key={i} className="marquee-item" style={{ marginRight: gap }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
