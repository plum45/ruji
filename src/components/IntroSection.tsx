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

  const bgOrbX = useTransform(x, [-0.5, 0.5], [30, -30]); // moves opposite to mouse
  const bgOrbY = useTransform(y, [-0.5, 0.5], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="intro"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: isLight ? '#f7f5f0' : '#0b0a08',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        perspective: 1200, // Enable 3D space
      }}
    >
      {/* Background video — full bleed background like Hero section */}
      <video
        src="https://www.dropbox.com/scl/fi/3i4rfwk8eiwj5pag7iovh/Person_performing_greeting_anima-_202608081341.mp4?rlkey=om9ka54vnlk0gie7uzx5ebroo&raw=1"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '25% center',
          zIndex: 0,
          mixBlendMode: isLight ? 'multiply' : 'normal',
          filter: isLight ? 'contrast(1.12) brightness(1.06)' : 'brightness(0.85)',
          opacity: 0.95,
          pointerEvents: 'none',
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Soft gradient overlay for text readability on the right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLight
            ? 'linear-gradient(to right, rgba(247,245,240,0.1) 0%, rgba(247,245,240,0.4) 40%, rgba(247,245,240,0.92) 75%)'
            : 'linear-gradient(to right, rgba(11,10,8,0.1) 0%, rgba(11,10,8,0.4) 40%, rgba(11,10,8,0.92) 75%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient background glow orbs */}
      <motion.div className="glow-orb orb-1" style={{ top: '15%', right: '5%', x: bgOrbX, y: bgOrbY, zIndex: 2 }} />
      <motion.div className="glow-orb orb-2" style={{ bottom: '15%', left: '5%', x: bgOrbX, y: bgOrbY, zIndex: 2 }} />

      {/* Content wrapper with 3D Parallax Tilt */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          padding: 'clamp(3rem, 6vh, 4.5rem) clamp(1.5rem, 4vw, 5rem)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Split Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '2rem',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
          className="lg:!grid-cols-[1fr_1fr]"
        >
          {/* Left Column: Empty space so background video person is visible */}
          <div style={{ minHeight: '200px' }} />

          {/* Right Column: Text Box on the Right with reduced size & placeholder content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxWidth: '480px',
              marginLeft: 'auto',
              width: '100%',
            }}
          >
            <motion.div {...FADE_UP(0.2)}>
              <p
                className="font-body text-sm"
                style={{
                  marginBottom: '0.4rem',
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
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: isLight ? '#111' : '#fff',
                }}
              >
                Professional<br />Teacher.
              </h2>
            </motion.div>

            {/* Reduced Size Liquid Glass Container with Placeholder Content */}
            <motion.div
              {...FADE_UP(0.4)}
              className="liquid-glass"
              style={{
                borderRadius: '1.25rem',
                padding: '1.5rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p
                className="font-body text-sm"
                style={{
                  lineHeight: 1.7,
                  margin: 0,
                  color: isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                }}
              >
                ยินดีต้อนรับสู่แฟ้มสะสมผลงานอิเล็กทรอนิกส์ (E-Portfolio) การฝึกประสบการณ์วิชาชีพครูของ <strong style={{ color: isLight ? '#0284c7' : '#38bdf8' }}>ครูภูริม</strong>
              </p>

              <div
                style={{
                  borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <p className="font-body text-xs" style={{ color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)', margin: 0 }}>
                  • [เนื้อหาสมมุติ] การจัดการเรียนรู้เชิงรุก (Active Learning)
                </p>
                <p className="font-body text-xs" style={{ color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)', margin: 0 }}>
                  • [เนื้อหาสมมุติ] การประยุกต์ใช้นวัตกรรมดิจิทัลเพื่อการศึกษา (EdTech)
                </p>
                <p className="font-body text-xs" style={{ color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)', margin: 0 }}>
                  • [เนื้อหาสมมุติ] การวัดและประเมินผลตามสภาพจริงผู้เรียน
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
