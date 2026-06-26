import { useEffect, useRef } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  playbackRate?: number;
}

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before end to start fade out

export default function FadingVideo({ src, className = '', style, playbackRate = 1 }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const fadingOutRef = useRef<boolean>(false);

  const fadeTo = (video: HTMLVideoElement, target: number, duration: number) => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const startOpacity = parseFloat(video.style.opacity) || 0;
    const delta = target - startOpacity;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      video.style.opacity = String(startOpacity + delta * progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';
    video.playbackRate = playbackRate;

    const onLoaded = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(video, 1, FADE_MS);
    };

    const onTimeUpdate = () => {
      if (
        !fadingOutRef.current &&
        video.duration > 0 &&
        video.duration - video.currentTime <= FADE_OUT_LEAD &&
        video.duration - video.currentTime > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(video, 0, FADE_MS);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(video, 1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', onLoaded);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [src, playbackRate]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      style={{ opacity: 0, ...style }}
      className={className}
    />
  );
}
