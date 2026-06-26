import { motion } from 'framer-motion';

export const Introduction = () => {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-2"
      />
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-garamond text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide"
      >
        A Digital Herbarium of the Unseen
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-white/60 font-light leading-relaxed text-sm sm:text-base md:text-lg max-w-2xl"
      >
        Step beyond the visual spectrum. Organic Visions invites you to explore three distinct biological anomalies—micro-structures, glowing spores, and crystalline grids. Each chapter reveals a synthetic natural order captured through precision lensing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mt-2"
      />
    </section>
  );
};
