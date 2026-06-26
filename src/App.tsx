import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CapabilitiesSection from './components/CapabilitiesSection';
import DynamicsSection from './components/DynamicsSection';
import GallerySection from './components/GallerySection';

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <CapabilitiesSection />
        <DynamicsSection />
        <GallerySection />
      </main>

      {/* Footer */}
      <footer id="footer" style={{ background: '#000', padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div
            className="liquid-glass pointer-events-auto flex items-center justify-center"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          >
            <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1rem', color: '#fff' }}>
              k
            </span>
          </div>
          <p className="font-body text-white/50 text-sm">
            © 2026 Knowledge Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
