import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggeredFadeProps {
  text: string;
}

export const StaggeredFade = ({ text }: StaggeredFadeProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: '0.25em' 
    },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutQuad or cubic-bezier
        delay: i * 0.07,
      },
    }),
  };

  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="inline-block"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={charVariants}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
