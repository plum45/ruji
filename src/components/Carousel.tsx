
interface CardItem {
  id: string;
  title: string;
  part: string;
  image: string;
  description: string;
}

interface CarouselProps {
  onCardClick: (pageId: string) => void;
}

export const Carousel = ({ onCardClick }: CarouselProps) => {
  const cards: CardItem[] = [
    {
      id: 'part1',
      title: 'Bioluminescent Sanctuary',
      part: 'Part 1',
      image: '/bioluminescent_fungi.png',
      description: 'Discover the subterranean fungal networks glowing in the abyss.',
    },
    {
      id: 'part2',
      title: 'Microscopic Spores',
      part: 'Part 2',
      image: '/microscopic_spores.png',
      description: 'Journey inside the cellular architecture that births life.',
    },
    {
      id: 'part3',
      title: 'Crystalline Flora',
      part: 'Part 3',
      image: '/crystalline_leaf.png',
      description: 'Observe the liquid light pulsating through geometric plant veins.',
    },
  ];

  // Double the list to ensure seamless looping marquee
  const marqueeItems = [...cards, ...cards, ...cards, ...cards];

  return (
    <div className="w-full overflow-hidden py-12 relative z-10">
      {/* Fade indicators on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#010101] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#010101] to-transparent z-20 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee-slow flex gap-6 hover:[animation-play-state:paused]">
        {marqueeItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            onClick={() => onCardClick(item.id)}
            className="liquid-glass group w-72 sm:w-80 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] select-none"
          >
            {/* Image Container */}
            <div className="h-44 sm:h-48 overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-light bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/10">
                {item.part}
              </span>
            </div>

            {/* Content Container */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-garamond text-xl sm:text-2xl text-white font-normal tracking-wide mb-2 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom indicator */}
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] tracking-[0.15em] uppercase text-white/40 group-hover:text-white/80 transition-colors duration-300">
                <span>Enter Chapter</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
