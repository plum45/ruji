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
      style={{
        position: 'relative',
        background: '#000',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      <motion.div {...FADE_UP(0)} style={{ marginBottom: '4rem' }}>
        <p className="font-body text-white/80 text-sm" style={{ marginBottom: '1rem', letterSpacing: '0.05em' }}>
          // Dynamics
        </p>
        <h2
          className="font-heading text-white"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Cellular movement<br />in real-time.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large featured item */}
        <motion.div
          {...FADE_UP(0.1)}
          className="liquid-glass lg:col-span-2 flex flex-col justify-end p-8"
          style={{ borderRadius: '1.5rem', minHeight: 450, position: 'relative', overflow: 'hidden' }}
        >
          {/* Subtle gradient background for visual interest */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(30,10,60,0.5), transparent)', zIndex: 0 }} />
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <span className="font-body text-xs text-white/70 mb-3 block tracking-wider uppercase">Featured</span>
            <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: '2.5rem', margin: 0, marginBottom: '1rem' }}>
              Kinesin Walking
            </h3>
            <p className="font-body text-white/80" style={{ maxWidth: '55ch', lineHeight: 1.6, margin: 0 }}>
              Observe the precise, step-by-step movement of kinesin motor proteins as they haul vital cellular cargo along microtubule tracks, fueled entirely by ATP hydrolysis.
            </p>
          </div>
        </motion.div>

        {/* Vertical Stack for smaller items */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <motion.div
            {...FADE_UP(0.2)}
            className="liquid-glass flex-1 flex flex-col justify-end p-8"
            style={{ borderRadius: '1.5rem', minHeight: 250, position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,40,50,0.4), transparent)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: '1.75rem', margin: 0, marginBottom: '0.5rem' }}>
                Polymerization
              </h3>
              <p className="font-body text-white/80 text-sm" style={{ lineHeight: 1.6, margin: 0 }}>
                The dynamic instability of microtubules, rapidly alternating between growth and shrinkage.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...FADE_UP(0.3)}
            className="liquid-glass flex-1 flex flex-col justify-end p-8"
            style={{ borderRadius: '1.5rem', minHeight: 250, position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(50,15,20,0.4), transparent)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 className="font-heading text-white" style={{ fontStyle: 'italic', fontSize: '1.75rem', margin: 0, marginBottom: '0.5rem' }}>
                Actin Treadmilling
              </h3>
              <p className="font-body text-white/80 text-sm" style={{ lineHeight: 1.6, margin: 0 }}>
                Continuous filament assembly at the plus end and disassembly at the minus end.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
