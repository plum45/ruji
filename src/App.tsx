import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { StaggeredFade } from './components/StaggeredFade';
import { Carousel } from './components/Carousel';
import { Introduction } from './components/Introduction';
import { ContentPage } from './components/ContentPage';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'part1' | 'part2' | 'part3'>('home');

  const navLinks = [
    { name: 'Wander', action: () => setCurrentPage('home') },
    { name: 'Sanctuary', action: () => setCurrentPage('part1') },
    { name: 'Spores', action: () => setCurrentPage('part2') },
    { name: 'Flora', action: () => setCurrentPage('part3') },
  ];

  const handleCardClick = (pageId: string) => {
    setCurrentPage(pageId as any);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#010101] text-white">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-70"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#010101] pointer-events-none" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 w-full px-6 py-6 md:py-8 flex items-center justify-between md:justify-center md:gap-20 lg:gap-32">
        {/* Brand Name */}
        <button
          onClick={() => setCurrentPage('home')}
          className="text-white uppercase font-light text-sm md:text-base tracking-[0.25em] md:tracking-[0.3em] select-none hover:opacity-80 transition-opacity duration-300 bg-transparent border-none cursor-pointer"
        >
          Organic Visions
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              className={`uppercase text-xs md:text-sm tracking-[0.2em] transition-colors duration-300 font-light bg-transparent border-none cursor-pointer ${
                (currentPage === 'home' && link.name === 'Wander') ||
                (currentPage === 'part1' && link.name === 'Sanctuary') ||
                (currentPage === 'part2' && link.name === 'Spores') ||
                (currentPage === 'part3' && link.name === 'Flora')
                  ? 'text-white font-normal'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden text-white/90 hover:text-white transition-colors duration-300 p-2 z-50 focus:outline-none bg-transparent border-none cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-4 right-4 z-50 md:hidden mobile-menu-glass rounded-2xl py-8 flex flex-col items-center gap-5"
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => {
                  link.action();
                  setIsMobileMenuOpen(false);
                }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: 0.05 + index * 0.06,
                }}
                className="text-white/90 hover:text-white uppercase font-light text-sm tracking-[0.25em] transition-colors duration-300 py-1 w-full text-center bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Router */}
      <div className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* Hero Content Section */}
              <section className="relative z-10 w-full min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] flex flex-col items-center justify-center text-center px-5 sm:px-8 pb-12">
                <h1 className="font-garamond font-normal text-white leading-[1.08] tracking-tight mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-8xl lg:text-9xl flex flex-col items-center">
                  <span className="block overflow-hidden py-1">
                    <StaggeredFade text="WITNESS THE" />
                  </span>
                  <span className="block overflow-hidden py-1">
                    <StaggeredFade text="HIDDEN REALM" />
                  </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 1.6 }}
                  className="text-white/70 font-light leading-relaxed max-w-xs sm:max-w-md md:max-w-lg mb-8 sm:mb-10 text-sm sm:text-base md:text-lg"
                >
                  An odyssey through delicate living forms,
                  <br className="hidden sm:inline" /> revealed by lens and curiosity.
                </motion.p>

                {/* CTA Button (Scrolls down to Intro/Carousel) */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 2.0 }}
                  onClick={() => {
                    document.getElementById('explore-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="liquid-glass text-white/90 uppercase tracking-[0.18em] sm:tracking-[0.2em] text-xs sm:text-sm font-light rounded-full px-7 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 cursor-pointer"
                >
                  Begin the Experience
                </motion.button>
              </section>

              {/* Anchor point to scroll down */}
              <div id="explore-anchor" className="w-full" />

              {/* Introduction Section */}
              <Introduction />

              {/* Infinite Loop Carousel Section */}
              <Carousel onCardClick={handleCardClick} />
            </motion.div>
          ) : (
            <ContentPage
              key={currentPage}
              pageId={currentPage}
              onBack={() => setCurrentPage('home')}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Main Footer (only visible when on home screen) */}
      {currentPage === 'home' && (
        <footer className="relative z-10 w-full py-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/20 select-none">
          © {new Date().getFullYear()} Organic Visions. All rights reserved.
        </footer>
      )}
    </div>
  );
}

export default App;
