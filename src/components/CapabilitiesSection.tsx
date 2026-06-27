import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { useSmoothMouse } from '../hooks/useSmoothMouse';
import { motion, useTransform } from 'framer-motion';

const CARDS = [
  {
    tags: ['Microfilaments', 'Motility', 'Shape', 'Actin'],
    iconPath: 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z',
    title: 'Microfilaments',
    body: 'เป็นเส้นใยโครงร่างเซลล์ที่มีขนาดเล็กที่สุด (เส้นผ่านศูนย์กลางประมาณ 5-9 นาโนเมตร) โครงสร้างเกิดจากโปรตีนแอกทิน (Actin) ต่อกันเป็นสายยาวและพันกันเป็นเกลียวคู่',
  },
  {
    tags: ['Transport', 'Mitosis', 'Tubulin', 'Rigid'],
    iconPath: 'M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z',
    title: 'Microtubules',
    body: 'เป็นหลอดกลวงโปรตีนทิวบูลินขนาดใหญ่ที่สุด มีคุณสมบัติยืดหดได้รวดเร็ว (Dynamic instability) โดยสร้างจากเซนโทรโซมหน้าที่หลัก: ช่วยค้ำจุนเซลล์, เป็นรางให้โปรตีนมอเตอร์ขนส่งสาร, สร้างเส้นใยสปินเดิลดึงแยกโครโมโซม และเป็นแกนกลางของซีเลียและแฟลเจลลา',
  },
  {
    tags: ['ATP Driven', 'Kinesin', 'Dynein', 'Myosin'],
    iconPath: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z',
    title: 'Intermidia filaments',
    body: 'เป็นเส้นใยโปรตีนเหนียวคล้ายเชือก ขนาดกลาง มีความเสถียรและคงทนสูงสุด ไม่มีขั้วและไม่ยืดหดตัวหน้าที่หลัก: ต้านทานแรงดึงเพื่อป้องกันเซลล์ฉีกขาด, ยึดเกาะเนื้อเยื่อ, ตรึงนิวเคลียสและออร์แกเนลล์ให้อยู่กับที่ และค้ำจุนเยื่อหุ้มนิวเคลียส',
  },
];

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

const CARD_ANIMATION = (delay: number) => ({
  initial: 'initial',
  whileInView: 'animate',
  whileHover: 'hover',
  viewport: { once: true, amount: 0.15 },
  variants: {
    initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
    animate: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: 'easeOut' as const }
    },
    hover: {
      y: -8,
      scale: 1.015,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  }
});

export default function CapabilitiesSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Detect mobile devices/Safari to serve transparent WebP instead of WebM
  const [isMobileOrSafari, setIsMobileOrSafari] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /mobi|android|iphone|ipad|ipod/.test(ua);
    const isSafari = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android');
    setIsMobileOrSafari(isMobile || isSafari);
  }, []);

  // Mouse tilt variables
  const { x, y } = useSmoothMouse();
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]); // subtle vertical tilt
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]); // subtle horizontal tilt

  const orbX = useTransform(x, [-0.5, 0.5], [30, -30]); // moves opposite to mouse
  const bgOrbY = useTransform(y, [-0.5, 0.5], [30, -30]);

  return (
    <section
      id="topics"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: isLight
          ? 'linear-gradient(180deg, #eef4f8 0%, #e0e8f0 100%)'
          : 'linear-gradient(180deg, #05080c 0%, #0b1018 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        perspective: 1200, // Enable 3D space
      }}
    >
      {/* Ambient background glow orbs */}
      <motion.div className="glow-orb orb-1" style={{ top: '10%', left: '-5%', x: orbX, y: bgOrbY }} />
      <motion.div className="glow-orb orb-2" style={{ bottom: '15%', right: '-5%', x: orbX, y: bgOrbY }} />

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
          transformStyle: 'preserve-3d', // Enable 3D tilt
        }}
      >
        {/* Header */}
        <motion.div {...FADE_UP(0)} style={{ marginBottom: '1.5rem' }}>
          <p
            className="font-body text-sm"
            style={{ marginBottom: '0.5rem', letterSpacing: '0.05em', color: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)' }}
          >
            // Cellular Anatomy
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
            Cytoskeleton
          </h2>
        </motion.div>

        {/* Two-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            flex: 1,
            minHeight: 0,
            width: '100%',
          }}
        >
          {/* Left Column: Squeezed Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                {...CARD_ANIMATION(0.15 + i * 0.1)}
                className="liquid-glass"
                style={{
                  borderRadius: '1.25rem',
                  padding: '1.125rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  minHeight: 0,
                  cursor: 'pointer',
                }}
              >
                {/* Top row: icon + tags */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: '0.5rem' }}>
                  {/* Icon box */}
                  <motion.div
                    className="liquid-glass"
                    variants={{
                      hover: { rotate: 15, scale: 1.05 }
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ width: 34, height: 34, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isLight ? "#111" : "white"}>
                      <path d={card.iconPath} />
                    </svg>
                  </motion.div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 4, maxWidth: '80%' }}>
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass font-body text-white/90"
                        style={{ borderRadius: 9999, padding: '2px 8px', fontSize: 10, whiteSpace: 'nowrap' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: title + body */}
                <div>
                  <h3
                    className="font-heading"
                    style={{ fontStyle: 'italic', fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, color: isLight ? '#111' : '#fff' }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-body text-xs" style={{ marginTop: '0.35rem', lineHeight: 1.5, color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}>
                    {card.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Transparent Video */}
          <div
            className="cytoskeleton-video-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '300px',
            }}
          >
            <motion.div
              animate={{
                y: [0, -18, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                filter: isLight
                  ? 'drop-shadow(0 25px 30px rgba(0, 0, 0, 0.12))'
                  : 'drop-shadow(0 30px 45px rgba(0, 0, 0, 0.55)) drop-shadow(0 15px 30px rgba(0, 229, 255, 0.15))',
              }}
            >
              {isMobileOrSafari ? (
                <img
                  src="/video_transparent.webp"
                  alt="Cytoskeleton 3D Model"
                  style={{
                    width: '100%',
                    maxHeight: '520px',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    maxHeight: '520px',
                    objectFit: 'contain',
                  }}
                >
                  <source src="/video_transparent.webm" type="video/webm" />
                </video>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
