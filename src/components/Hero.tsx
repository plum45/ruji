import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background video — 120% width, top-aligned */}
      <FadingVideo
        src="https://www.dropbox.com/scl/fi/eatqb1dephucbo0ldwqov/3D_character_head_rotation_video_202608081305.mp4?rlkey=06eaviikvb4ph3vltbkuxisus&raw=1"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%', zIndex: 0 }}
        playbackRate={0.75}
      />
      {/* Glow Effect Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Dark Vignette Overlay for Text Readability */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.15) 100%), linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)', 
          zIndex: 1,
          pointerEvents: 'none'
        }} 
      />

      {/* z-10 content layer */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Hero content — left aligned */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '4rem',
            paddingLeft: 'clamp(2rem, 5vw, 8rem)',
            paddingRight: '2rem',
            textAlign: 'left',
          }}
        >
          {/* Badge */}
          <motion.div {...FADE_UP(0.4)}
            className="liquid-glass"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, padding: '4px 4px 4px 4px', marginBottom: '1.5rem' }}
          >
            <span
              className="font-body font-semibold text-black text-xs"
              style={{ background: '#fff', borderRadius: 9999, padding: '4px 12px' }}
            >
              Teacher
            </span>
            <span className="font-body text-white/90 text-sm" style={{ paddingRight: 12 }}>
              E-Portfolio
            </span>
          </motion.div>

          {/* Headline — BlurText with shadow */}
          <BlurText
            text="Purim's Portfolio"
            className="font-heading text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontStyle: 'italic',
              lineHeight: 0.95,
              maxWidth: '850px',
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              justifyContent: 'flex-start',
              textShadow: '0 4px 30px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.85)',
            } as React.CSSProperties}
          />

          {/* Subheading with shadow */}
          <motion.p {...FADE_UP(0.8)}
            className="font-body font-light text-white"
            style={{ 
              fontSize: 'clamp(0.875rem, 2vw, 1.1rem)', 
              maxWidth: 580, 
              lineHeight: 1.6, 
              marginTop: '1rem', 
              marginBottom: 0,
              textShadow: '0 2px 15px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.85)',
            }}
          >
            ยินดีต้อนรับสู่แฟ้มสะสมผลงานอิเล็กทรอนิกส์การฝึกประสบการณ์วิชาชีพครู มุ่งเน้นการจัดการเรียนรู้เชิงรุก (Active Learning) การพัฒนาสื่อนวัตกรรม และการเรียนรู้ของผู้เรียนเป็นสำคัญ
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE_UP(1.1)}
            style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: '1.5rem' }}
          >
            <a
              href="#profile"
              className="liquid-glass-strong font-body font-medium text-sm flex items-center gap-1.5"
              style={{ borderRadius: 9999, padding: '10px 20px', textDecoration: 'none', color: 'inherit' }}
            >
              ดูประวัติส่วนตัว
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#teaching"
              className="font-body text-sm flex items-center gap-1.5"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              ผลงานการสอน
              <Play size={14} fill="currentColor" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
