import { motion } from 'framer-motion';

const FADE_UP = (delay: number) => ({
  initial: { filter: 'blur(8px)', opacity: 0, y: 30 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function DynamicsSection() {
  return (
    <section
      id="articles"
      className="snap-start snap-always"
      style={{
        position: 'relative',
        height: '100svh',
        background: '#000',
        paddingTop: 'clamp(4rem, 8vh, 6rem)',
        paddingBottom: '2rem',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <motion.div {...FADE_UP(0)} style={{ marginBottom: 'clamp(1rem, 3vh, 3rem)' }}>
          <p className="font-body text-white/80 text-sm" style={{ marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            // Dynamics
          </p>
          <h2
            className="font-heading text-white"
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Cellular movement<br />in real-time.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1 min-h-0">
          {/* Large featured item */}
          <motion.div
            {...FADE_UP(0.1)}
            className="liquid-glass md:col-span-2 flex flex-col justify-end p-6 md:p-8"
            style={{ borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
          >
            {/* Subtle gradient background for visual interest + Image Placeholder */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(30,10,60,0.5), transparent)', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <div style={{ border: '1px dashed rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)' }}>
                <span className="font-body text-white/30 text-sm">Image Placeholder</span>
              </div>
            </div>
            
            <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', margin: '-1.5rem', padding: '3rem 1.5rem 1.5rem' }}>
              <span className="font-body text-xs text-white/70 mb-2 block tracking-wider uppercase">Featured</span>
              <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', margin: 0, marginBottom: '0.5rem' }}>
                Kinesin Walking
              </h3>
              <p className="font-body text-white/80 text-sm md:text-base" style={{ maxWidth: '55ch', lineHeight: 1.6, margin: 0 }}>
                Observe the precise, step-by-step movement of kinesin motor proteins as they haul vital cellular cargo along microtubule tracks, fueled entirely by ATP hydrolysis.
              </p>
            </div>
          </motion.div>

          {/* Vertical Stack for smaller items */}
          <div className="flex flex-col gap-4 md:gap-6 md:col-span-1 min-h-0">
            <motion.div
              {...FADE_UP(0.2)}
              className="liquid-glass flex-1 flex flex-col justify-end p-6"
              style={{ borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,40,50,0.4), transparent)', zIndex: 0 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                <div style={{ border: '1px dashed rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)' }}>
                  <span className="font-body text-white/30 text-xs">Image Placeholder</span>
                </div>
              </div>
              <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', margin: '-1.5rem', padding: '2rem 1.5rem 1.5rem' }}>
                <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', margin: 0, marginBottom: '0.5rem' }}>
                  Polymerization
                </h3>
                <p className="font-body text-white/80 text-xs md:text-sm" style={{ lineHeight: 1.5, margin: 0 }}>
                  The dynamic instability of microtubules, rapidly alternating between growth and shrinkage.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...FADE_UP(0.3)}
              className="liquid-glass flex-1 flex flex-col justify-end p-6"
              style={{ borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(50,15,20,0.4), transparent)', zIndex: 0 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                <div style={{ border: '1px dashed rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)' }}>
                  <span className="font-body text-white/30 text-xs">Image Placeholder</span>
                </div>
              </div>
              <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', margin: '-1.5rem', padding: '2rem 1.5rem 1.5rem' }}>
                <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', margin: 0, marginBottom: '0.5rem' }}>
                  Actin Treadmilling
                </h3>
                <p className="font-body text-white/80 text-xs md:text-sm" style={{ lineHeight: 1.5, margin: 0 }}>
                  Continuous filament assembly at the plus end and disassembly at the minus end.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
