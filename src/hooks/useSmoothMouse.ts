import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Tracks the mouse position on screen and returns smoothed spring values
 * ranging from -0.5 to 0.5. Perfect for creating dampened parallax
 * and 3D tilt effects.
 */
export function useSmoothMouse() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for premium inertia effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to range [-0.5, 0.5]
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    // Listen on window for global mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return { x: springX, y: springY };
}
