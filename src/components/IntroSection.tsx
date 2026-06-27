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

  const orbX = useTransform(x, [-0.5, 0.5], [-25, 25]); // drift horizontal
  const orbY = useTransform(y, [-0.5, 0.5], [-25, 25]); // drift vertical

  const bgOrbX = useTransform(x, [-0.5, 0.5], [30, -30]); // moves opposite to mouse
  const bgOrbY = useTransform(y, [-0.5, 0.5], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="intro"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: isLight
          ? 'linear-gradient(180deg, #f7f5f0 0%, #eae7e0 100%)'
          : 'linear-gradient(180deg, #0b0a08 0%, #050504 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        perspective: 1200, // Enable 3D space
      }}
    >
      {/* Ambient background glow orbs */}
      <motion.div className="glow-orb orb-1" style={{ top: '15%', right: '5%', x: bgOrbX, y: bgOrbY }} />
      <motion.div className="glow-orb orb-2" style={{ bottom: '15%', left: '5%', x: bgOrbX, y: bgOrbY }} />

      {/* Content wrapper with 3D Parallax Tilt */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          padding: 'clamp(3rem, 6vh, 4.5rem) clamp(1rem, 3vw, 3.5rem)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Split Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1800px',
            margin: '0 auto',
          }}
          className="lg:!grid-cols-[1fr_1.8fr]"
        >
          {/* Left Column: Glassy Orb Video */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              x: orbX,
              y: orbY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="orb-wrapper" style={{ width: '100%', maxWidth: '400px', height: '400px' }}>
              <video
                className="glassy-orb"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%' }}
              >
                <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
              </video>
              <div className="orb-overlay" />
            </div>
          </motion.div>

          {/* Right Column: Introduction Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div {...FADE_UP(0.2)}>
              <p
                className="font-body text-sm"
                style={{
                  marginBottom: '0.5rem',
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
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: isLight ? '#111' : '#fff',
                }}
              >
                The cellular<br />framework.
              </h2>
            </motion.div>

            <motion.div
              {...FADE_UP(0.4)}
              className="liquid-glass"
              style={{
                borderRadius: '1.25rem',
                padding: '2rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <p
                className="font-body text-sm"
                style={{
                  lineHeight: 1.9,
                  margin: 0,
                  color: isLight ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)',
                  textAlign: 'justify',
                  textIndent: '2.5rem',
                }}
              >
                โครงร่างเซลล์ (Cytoskeleton) คือเครือข่ายเส้นใยโปรตีนภายในไซโทพลาซึมของเซลล์ยูแคริโอต ที่ไม่ได้แข็งทื่อแต่มีพลวัตสูง (Dynamic) สามารถประกอบและสลายตัวได้อย่างรวดเร็วเพื่อตอบสนองต่อสิ่งเร้า ประกอบด้วยเส้นใย 3 ชนิดหลัก คือ ไมโครฟิลาเมนต์ (Microfilaments) ที่ยืดหยุ่นสูง, ไมโครทิวบูล (Microtubules) ที่เป็นหลอดกลวงแข็งแรง และอินเทอร์มีเดียทฟิลาเมนต์ (Intermediate filaments) ที่ช่วยรับแรงดึงและต้านทานความเครียดทางกล การทำงานประสานกันของเส้นใยเหล่านี้เป็นรากฐานสำคัญในการรักษารูปร่างเซลล์ จัดระเบียบออร์แกเนลล์ และช่วยให้เซลล์คงสภาพได้อย่างสมบูรณ์
              </p>
              <p
                className="font-body text-sm"
                style={{
                  lineHeight: 1.9,
                  margin: 0,
                  color: isLight ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)',
                  textAlign: 'justify',
                  textIndent: '2.5rem',
                }}
              >
                นอกจากการค้ำจุน โครงร่างเซลล์ยังเป็นกลไกหลักที่ทำให้เกิดการเคลื่อนที่ (Motility) โดยทำงานร่วมกับโปรตีนมอเตอร์ (Motor proteins) ที่ใช้พลังงานจาก ATP ในการเคลื่อนที่ เช่น โปรตีนไมโอซิน (Myosin) ที่ทำงานร่วมกับไมโครฟิลาเมนต์เพื่อขับเคลื่อนการหดตัวของกล้ามเนื้อและการคลานของเซลล์ ขณะที่โปรตีนไคนีซิน (Kinesin) และไดนีน (Dynein) จะเคลื่อนที่บนรางไมโครทิวบูลเพื่อขนส่งสารและออร์แกเนลล์ นอกจากนี้ ไมโครทิวบูลและไดนีนยังเป็นแกนกลางของซีเลีย (Cilia) และแฟลเจลลา (Flagella) ที่ช่วยในการโบกพัดและขับเคลื่อนเซลล์อย่างแม่นยำ
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
