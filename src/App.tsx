import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CapabilitiesSection from './components/CapabilitiesSection';
import DynamicsSection from './components/DynamicsSection';
import GallerySection from './components/GallerySection';
import TopicSection, { type TopicCard } from './components/TopicSection';
import { ThemeProvider, useTheme } from './ThemeContext';

// ── Actin Networks ──────────────────────────────────────────────
const ACTIN_CARDS: TopicCard[] = [
  {
    tags: ['Branching', 'Arp2/3', 'Protrusion'],
    iconPath: 'M12 2C8.13 2 5 5.13 5 9c0 3.87 4 10 7 13 3-3 7-9.13 7-13 0-3.87-3.13-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5Z',
    title: 'Branched Networks',
    body: 'Arp2/3-mediated branching creates the dendritic mesh driving lamellipodia protrusion at the leading edge.',
  },
  {
    tags: ['Stress Fiber', 'Contraction', 'Focal Adhesion'],
    iconPath: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
    title: 'Stress Fibers',
    body: 'Contractile actomyosin bundles anchored to focal adhesions that generate traction forces on the substrate.',
  },
  {
    tags: ['Cortex', 'Tension', 'Shape'],
    iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    title: 'Cortical Actin',
    body: 'A thin isotropic meshwork beneath the plasma membrane maintaining cell shape and mediating cortical tension.',
  },
];

// ── Microtubule Dynamics ─────────────────────────────────────────
const MT_CARDS: TopicCard[] = [
  {
    tags: ['GTP Cap', 'Rescue', 'Catastrophe'],
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    title: 'Dynamic Instability',
    body: 'Stochastic switches between polymerization and rapid depolymerization driven by the GTP hydrolysis state of tubulin.',
  },
  {
    tags: ['Centrosome', 'γ-tubulin', 'MTOC'],
    iconPath: 'M12 2l-5.5 9h11L12 2zm0 3.84L14.53 9h-5.06L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5S15.01 22 17.5 22s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zM3 21.5h8v-2H3v2z',
    title: 'Nucleation at MTOC',
    body: 'γ-tubulin ring complexes at the centrosome template new microtubule growth, establishing cell polarity.',
  },
  {
    tags: ['Kinetochore', 'Alignment', 'Spindle'],
    iconPath: 'M20 2H4v2l4.586 4.586A2 2 0 0 1 9 10v4a2 2 0 0 1-.586 1.414L4 20v2h16v-2l-4.414-4.586A2 2 0 0 1 15 14v-4a2 2 0 0 1 .586-1.414L20 4V2z',
    title: 'Mitotic Spindle',
    body: 'The bipolar spindle captures chromosomes via kinetochore-microtubule attachments for faithful segregation.',
  },
];

// ── Intermediate Filaments ───────────────────────────────────────
const IF_CARDS: TopicCard[] = [
  {
    tags: ['Epithelial', 'Keratin', 'Desmosomes'],
    iconPath: 'M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z',
    title: 'Keratin Filaments',
    body: 'Epithelial cytoskeletal cables forming a resilient network that anchors desmosomes and resists mechanical stress.',
  },
  {
    tags: ['Mesenchymal', 'Vimentin', 'Migration'],
    iconPath: 'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5z',
    title: 'Vimentin',
    body: 'Expressed in mesenchymal cells, vimentin provides viscoelastic resilience and promotes cell migration and invasion.',
  },
  {
    tags: ['Nuclear', 'Lamins', 'Chromatin'],
    iconPath: 'M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z',
    title: 'Nuclear Lamins',
    body: 'A fibrous meshwork lining the inner nuclear envelope, maintaining nuclear shape and organizing chromatin domains.',
  },
];

// ── Motor Proteins ───────────────────────────────────────────────
const MOTOR_CARDS: TopicCard[] = [
  {
    tags: ['Plus-end', 'Cargo', 'ATP'],
    iconPath: 'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5l5-3-1.22-1.22C19.91 16.03 22 13.07 22 12c0-5.18-3.94-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.07 2.09 6.03 5.22 7.78L6 21l5 3v-5l-2.28 2.28C6.81 20 5 17.21 5 14c0-4.08 3.05-7.44 7-7.93V2.05z',
    title: 'Kinesin',
    body: 'Plus-end directed motor that "walks" toward microtubule plus ends, transporting vesicles and organelles to the cell periphery.',
  },
  {
    tags: ['Minus-end', 'Retrograde', 'Dynactin'],
    iconPath: 'M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z',
    title: 'Dynein',
    body: 'A minus-end directed motor complex that powers retrograde cargo transport and positions the mitotic spindle.',
  },
  {
    tags: ['Actin', 'Contraction', 'Muscle'],
    iconPath: 'M8 5v14l11-7z',
    title: 'Myosin II',
    body: 'Forms bipolar thick filaments that slide actin antiparallel filaments past each other, generating contraction in muscle and non-muscle cells.',
  },
];

// ── Cell Motility ────────────────────────────────────────────────
const MOTILITY_CARDS: TopicCard[] = [
  {
    tags: ['Leading Edge', 'Protrusion', 'Actin'],
    iconPath: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    title: 'Lamellipodia',
    body: 'Broad, flat protrusions at the leading edge containing a branched actin network that pushes the membrane forward.',
  },
  {
    tags: ['Thin Protrusion', 'Filopodium', 'Sensing'],
    iconPath: 'M12 2v20M2 12h20',
    title: 'Filopodia',
    body: 'Slender finger-like projections packed with parallel actin bundles, acting as sensors that probe the extracellular environment.',
  },
  {
    tags: ['Integrin', 'ECM', 'Signaling'],
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z',
    title: 'Focal Adhesions',
    body: 'Multi-protein complexes linking integrins to the cytoskeleton that transmit traction forces and transduce mechanical signals.',
  },
];

// ── Cilia & Flagella ─────────────────────────────────────────────
const CILIA_CARDS: TopicCard[] = [
  {
    tags: ['9+2', 'Axoneme', 'Dynein Arms'],
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
    title: 'Axonemal Structure',
    body: 'The canonical 9+2 arrangement of doublet microtubules with outer and inner dynein arms drives the ciliary beat.',
  },
  {
    tags: ['Beating', 'Mucociliary', 'Waveform'],
    iconPath: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 5v-3',
    title: 'Ciliary Beat',
    body: 'Coordinated dynein-powered strokes create metachronal waves that propel mucus or move a cell through fluid.',
  },
  {
    tags: ['IFT', 'Assembly', 'BBSome'],
    iconPath: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z',
    title: 'Intraflagellar Transport',
    body: 'Bidirectional IFT trains carrying cargo along axonemal doublets, essential for cilia assembly and maintenance.',
  },
];

function AppInner() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <CapabilitiesSection />
        <DynamicsSection />

        {/* 5 new topic pages */}
        <TopicSection
          id="actin"
          label="// Actin Networks"
          heading={"Dynamic,\nnetworks."}
          cards={ACTIN_CARDS}
          bgColor={isLight ? '#eef2f7' : '#050a0f'}
          overlayColor={isLight ? 'linear-gradient(135deg, rgba(200,220,255,0.4) 0%, rgba(255,255,255,0.1) 100%)' : 'linear-gradient(135deg, rgba(0,20,40,0.8) 0%, rgba(0,0,0,0.3) 100%)'}
        />

        <TopicSection
          id="microtubules"
          label="// Microtubule Dynamics"
          heading={"Tracks &\npolarity."}
          cards={MT_CARDS}
          bgColor={isLight ? '#f0eef7' : '#080510'}
          overlayColor={isLight ? 'linear-gradient(135deg, rgba(220,200,255,0.4) 0%, rgba(255,255,255,0.1) 100%)' : 'linear-gradient(135deg, rgba(20,0,50,0.8) 0%, rgba(0,0,0,0.3) 100%)'}
        />

        <TopicSection
          id="intermediate"
          label="// Intermediate Filaments"
          heading={"Resilience,\nunder stress."}
          cards={IF_CARDS}
          bgColor={isLight ? '#f7f4ee' : '#0a0804'}
          overlayColor={isLight ? 'linear-gradient(135deg, rgba(255,240,200,0.4) 0%, rgba(255,255,255,0.1) 100%)' : 'linear-gradient(135deg, rgba(40,20,0,0.8) 0%, rgba(0,0,0,0.3) 100%)'}
        />

        <TopicSection
          id="motors"
          label="// Motor Proteins"
          heading={"Directed,\nmovement."}
          cards={MOTOR_CARDS}
          bgColor={isLight ? '#eef6f7' : '#04080a'}
          overlayColor={isLight ? 'linear-gradient(135deg, rgba(200,240,255,0.4) 0%, rgba(255,255,255,0.1) 100%)' : 'linear-gradient(135deg, rgba(0,30,40,0.8) 0%, rgba(0,0,0,0.3) 100%)'}
        />

        <TopicSection
          id="motility"
          label="// Cell Motility"
          heading={"Migration\n& sensing."}
          cards={MOTILITY_CARDS}
          bgColor={isLight ? '#f4eef7' : '#08050a'}
          overlayColor={isLight ? 'linear-gradient(135deg, rgba(240,200,255,0.4) 0%, rgba(255,255,255,0.1) 100%)' : 'linear-gradient(135deg, rgba(25,0,40,0.8) 0%, rgba(0,0,0,0.3) 100%)'}
        />

        <TopicSection
          id="cilia"
          label="// Cilia & Flagella"
          heading={"Beating\nin sync."}
          cards={CILIA_CARDS}
          bgColor={isLight ? '#eef7f2' : '#050a08'}
          overlayColor={isLight ? 'linear-gradient(135deg, rgba(200,255,220,0.4) 0%, rgba(255,255,255,0.1) 100%)' : 'linear-gradient(135deg, rgba(0,25,15,0.8) 0%, rgba(0,0,0,0.3) 100%)'}
        />

        <GallerySection />
      </main>

      {/* Footer */}
      <footer
        id="footer"
        style={{
          background: isLight ? '#e8e6e0' : '#000',
          padding: '4rem 2rem',
          textAlign: 'center',
          borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div
            className="liquid-glass pointer-events-auto flex items-center justify-center"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          >
            <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1rem', color: isLight ? '#111' : '#fff' }}>
              k
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }}>
            © 2026 Knowledge Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
