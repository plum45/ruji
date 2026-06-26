import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ContentPageProps {
  pageId: string;
  onBack: () => void;
}

interface PageData {
  title: string;
  subtitle: string;
  image: string;
  part: string;
  content: string[];
}

const PAGE_DETAILS: Record<string, PageData> = {
  part1: {
    part: 'Part I',
    title: 'Bioluminescent Sanctuary',
    subtitle: 'Subterranean anomalies and bioluminescence',
    image: '/bioluminescent_fungi.png',
    content: [
      'Deep beneath the surface layer of the ancient forest lies an quiet network of living filaments. Here, sunlight never penetrates; instead, life generates its own cold luminosity.',
      'Through chemical pathways, these organisms convert enzymatic energy into a deep blue-purple radiance. This biological glow serves as a beacon, guiding subterranean creatures and signaling complex symbiotic transactions.',
      'Our lenses captured these structural nodes in absolute darkness. The organic shapes twist and bend in a quiet dance of life, providing a glimpse into a sanctuary completely isolated from the solar world.',
    ],
  },
  part2: {
    part: 'Part II',
    title: 'Microscopic Spores',
    subtitle: 'The architecture of genesis and growth',
    image: '/microscopic_spores.png',
    content: [
      'Every forest begins at a scale invisible to the naked eye. Microscopic spores float in the humid atmosphere, carrying the blueprints of massive ecosystems within microscopic capsules.',
      'Under high magnification, these spores reveal geometric complexity that rivals modern architectural designs. Green and gold nodes of biological information pulse with latent energy, waiting for the perfect temperature and humidity to initiate division.',
      'This chapter explores the tiny spherical containers of life. They remind us that the grandest structures are built from the most delicate and beautiful microscopic blueprints.',
    ],
  },
  part3: {
    part: 'Part III',
    title: 'Crystalline Flora',
    subtitle: 'Geometric light channels in plant veins',
    image: '/crystalline_leaf.png',
    content: [
      'Leaves are more than mere light collectors; they are highly optimized light-guiding matrices. In certain plant variations, the cellular veins calcify into crystalline tunnels.',
      'These tunnels channel photons deep into the leaf interior, distributing solar energy with near-perfect efficiency. When illuminated, the veins glow like fiber-optic cables, highlighting the mathematical precision of natural design.',
      'We isolate these leaf grids against deep black backdrops, exposing the delicate pipelines that carry sap, light, and life throughout the biological system.',
    ],
  },
};

export const ContentPage = ({ pageId, onBack }: ContentPageProps) => {
  const data = PAGE_DETAILS[pageId];

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 bg-[#010101] w-full min-h-screen overflow-y-auto px-6 py-24 sm:px-12 md:px-24 flex flex-col justify-between"
    >
      {/* Decorative blurred background orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="liquid-glass absolute -top-12 left-0 flex items-center gap-3 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Sanctuary</span>
        </button>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto pt-6">
          {/* Image Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 liquid-glass rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-square w-full"
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Content Panel */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3 block font-light"
            >
              {data.part}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-garamond text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight mb-4 tracking-wide"
            >
              {data.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/80 font-light text-sm sm:text-base tracking-wide border-l-2 border-white/20 pl-4 mb-8 italic"
            >
              {data.subtitle}
            </motion.p>

            <div className="space-y-5">
              {data.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-white/60 font-light text-sm sm:text-base leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Footer inside content page */}
      <footer className="relative z-10 w-full text-center text-[10px] uppercase tracking-[0.3em] text-white/20 select-none mt-16">
        Organic Visions • {data.title}
      </footer>
    </motion.div>
  );
};
