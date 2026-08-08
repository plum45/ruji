import { motion, useTransform } from 'framer-motion';
import Marquee from './Marquee';
import FadingVideo from './FadingVideo';
import { useTheme } from '../ThemeContext';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

/** Ken Burns pan+zoom variants — each card gets one assigned by index */
const KENBURNS = [
  { animate: { scale: [1, 1.12, 1.08], x: [0, -12, 6], y: [0, -8, 4] } },
  { animate: { scale: [1.05, 1, 1.1], x: [0, 10, -6], y: [0, 6, -8] } },
  { animate: { scale: [1, 1.08, 1.14], x: [0, 8, -10], y: [0, -6, 10] } },
  { animate: { scale: [1.08, 1.14, 1.04], x: [-8, 4, 10], y: [6, -10, 2] } },
];

/** Gallery image cards — filled with real teacher photos and media */
const ROW_1 = [
  { label: 'กิจกรรมบุญบั้งไฟ', gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', imagePath: 'https://www.dropbox.com/scl/fi/vwdjrbl6n65vo303vhkgo/715305167_1534475648476178_354223048349085859_n.jpg?rlkey=iziofog406o1sef8uh1onrn2d&raw=1' },
  { label: 'ประชุมเตรียมเปิดภาคเรียน', gradient: 'linear-gradient(135deg, #000428, #004e92)', imagePath: 'https://www.dropbox.com/scl/fi/m71sd4de5ymmpua0dgn84/696940132_1513148423942234_6542711132573575747_n.jpg?rlkey=y1nhwf1ld15qz871jcj76k1e3&raw=1' },
  { label: 'ต้อนรับนักเรียน', gradient: 'linear-gradient(135deg, #141e30, #243b55)', imagePath: 'https://www.dropbox.com/scl/fi/u4wyytkge55oqp9ghlwhe/702652947_1517318753525201_2860933062066954796_n.jpg?rlkey=8fpshfbr9u2liz7i6zc9kiul0&raw=1' },
  { label: 'เซิ้งบุญบั้งไฟ', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', imagePath: 'https://www.dropbox.com/scl/fi/fltuwp39w4qa79vsrl86x/IMG_6933.JPG?rlkey=f7zip06r1jas6dz7mkakzkmft&raw=1' },
  { label: 'บรรยากาศการสอน', gradient: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)', imagePath: 'https://www.dropbox.com/scl/fi/ogan1ahrtf7c29g774ild/IMG_0637.jpg?rlkey=ilz2sjbb00gbtoyhe457o222g&raw=1' },
  { label: 'Action Potential AI', gradient: 'linear-gradient(135deg, #200122, #6f0000)', imagePath: '/ai_media_1.png' },
  { label: 'BioExplore 3D', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', imagePath: '/ai_media_2.png' },
  { label: 'Blooket Learning', gradient: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', imagePath: '/web_online_1.png' },
];

const ROW_2 = [
  { label: 'การทดลองและฝึกปฏิบัติ', gradient: 'linear-gradient(135deg, #232526, #414345)', imagePath: 'https://www.dropbox.com/scl/fi/zt2y8jutsp2g03xkvm8wj/IMG_0559.jpg?rlkey=qruf7upy1gv6c5be8gspglfbd&raw=1' },
  { label: 'บรรยากาศในชั้นเรียน', gradient: 'linear-gradient(135deg, #0d324d, #7f5a83)', imagePath: 'https://www.dropbox.com/scl/fi/9bwlbpx5lxt13efnmwy5a/IMG_0640.jpg?rlkey=o3wgix0tvhjlq2aa0vhc2fnzd&raw=1' },
  { label: 'ร่วมกิจกรรมทำบุญ', gradient: 'linear-gradient(135deg, #0b486b, #f56217)', imagePath: 'https://www.dropbox.com/scl/fi/27khn8kyizkv6gz3klapf/IMG_0662.jpg?rlkey=7n4e5febt2qodh1seibuw8deq&raw=1' },
  { label: 'แนะนำตัววันเปิดภาคเรียน', gradient: 'linear-gradient(135deg, #1d4350, #a43931)', imagePath: 'https://www.dropbox.com/scl/fi/gbibnb5tw05h2lxi54d2t/702305477_1517957523461324_2327958114495464782_n.jpg?rlkey=fote59p26zlnxjug8pgf2j797&raw=1' },
  { label: 'การประชุมวิชาการ', gradient: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)', imagePath: 'https://www.dropbox.com/scl/fi/qkqav6hg5ycow4oxgiivs/697351469_1513150307275379_3091590413808241786_n.jpg?rlkey=5erze8sxmlwv8mt4j5p2jv6n7&raw=1' },
  { label: 'ZEP QUIZ Metaverse', gradient: 'linear-gradient(135deg, #1f1c2c, #928dab)', imagePath: '/web_online_2.png' },
  { label: 'BioDigital Human 3D', gradient: 'linear-gradient(135deg, #4b6cb7, #182848)', imagePath: '/web_online_3.png' },
  { label: 'การเรียนรู้เชิงรุก', gradient: 'linear-gradient(135deg, #00b4db, #0083b0)', imagePath: 'https://www.dropbox.com/scl/fi/epeblqgjbnvtn63liclqw/IMG_0619.jpg?rlkey=4e45bkygxjf4xte6shlojoxhz&raw=1' },
];

function Card({ label, gradient, imagePath, kenBurnsIndex = 0 }: { label: string; gradient: string; imagePath?: string; kenBurnsIndex?: number }) {
  const kb = KENBURNS[kenBurnsIndex % KENBURNS.length];
  return (
    <div
      className="liquid-glass"
      style={{
        width: 260,
        height: 160,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
      }}
    >
      {imagePath ? (
        <motion.img
          src={imagePath}
          alt={label}
          animate={kb.animate}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center center',
          }}
        />
      ) : (
        <div 
          style={{ 
            background: gradient, 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            inset: 0,
            opacity: 0.5, // Semi-transparent for colored glass look
          }} 
        />
      )}

      {/* Color tint overlay to blend microscopy images with the card theme */}
      <div 
        style={{ 
          background: gradient, 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          inset: 0,
          opacity: 0.15,
          mixBlendMode: 'overlay',
          zIndex: 1,
        }} 
      />

      {!imagePath && (
        <div style={{ position: 'absolute', inset: 0, border: '1.5px dashed rgba(255,255,255,0.25)', margin: '10px', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-body text-white/40 text-xs font-medium">Image Preview</span>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.25rem 1rem 1rem',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.98))',
          zIndex: 2,
        }}
      >
        <span className="font-heading font-semibold gallery-card-label" style={{ fontStyle: 'italic', fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.95), 0 8px 32px rgba(0,0,0,0.8)' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

import { useSmoothMouse } from '../hooks/useSmoothMouse';

export default function GallerySection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Mouse tilt variables
  const { x, y } = useSmoothMouse();
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]); // subtle vertical tilt
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]); // subtle horizontal tilt

  const videoX = useTransform(x, [-0.5, 0.5], [25, -25]); // moves opposite to mouse
  const videoY = useTransform(y, [-0.5, 0.5], [25, -25]);

  return (
    <section
      id="gallery"
      className="snap-start snap-always"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: isLight ? '#fff' : '#000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        perspective: 1200, // Enable 3D space
      }}
    >
      {/* Background video parallax wrapper */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-25px', // Extend slightly so we don't see edges on translation
          zIndex: 0,
          x: videoX,
          y: videoY,
        }}
      >
        <FadingVideo
          src="https://www.dropbox.com/scl/fi/h5k8xh5dfoaq74ofehpne/3D_glass_sculpture_fluid_motion_202606271449.mp4?rlkey=1grlebvruxp2pqz628uf7ixh9&raw=1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: isLight ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.35)', 
          }} 
        />
      </motion.div>

      {/* Centered Content Wrapper */}
      <motion.div 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d', // Enable 3D tilt
        }}
      >
        {/* Header */}
        <motion.div
          {...FADE_UP(0)}
          style={{ 
            textAlign: 'center', 
            marginBottom: '2.5rem', 
            paddingLeft: '1rem', 
            paddingRight: '1rem' 
          }}
        >
          <p 
            className="font-body text-sm" 
            style={{ 
              marginBottom: '1rem', 
              letterSpacing: '0.05em',
              color: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)'
            }}
          >
            // Gallery
          </p>
          <h2
            className="font-heading"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
              color: isLight ? '#111' : '#fff'
            }}
          >
            Visual explorations
          </h2>
        </motion.div>

        {/* 3D Tilted Wrapper for Marquees */}
        <div
          style={{
            position: 'relative',
            transform: 'perspective(1200px) rotateX(10deg) rotateY(-8deg) rotateZ(-3deg) scale(1.0)',
            transformOrigin: 'center center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '100%',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
          }}
        >
          {/* Row 1 — scrolls left */}
          <motion.div {...FADE_UP(0.15)}>
            <Marquee speed={30} direction="left" gap={20}>
              {ROW_1.map((item, i) => (
                <Card key={item.label} {...item} kenBurnsIndex={i} />
              ))}
            </Marquee>
          </motion.div>

          {/* Row 2 — scrolls right */}
          <motion.div {...FADE_UP(0.25)}>
            <Marquee speed={25} direction="right" gap={20}>
              {ROW_2.map((item, i) => (
                <Card key={item.label} {...item} kenBurnsIndex={i + 2} />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
