import React, { useEffect, useRef } from 'react';

export const MagneticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isHovering = false;
    let isClicking = false;
    let isTracking = false;

    // Fast pointer move handler with ZERO DOM queries for instantaneous zero-lag tracking
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isTracking) {
        isTracking = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.display = 'block';
        ring.style.display = 'block';
        document.documentElement.classList.add('custom-cursor-active');
      }

      // Direct instant hardware translation for the central dot (0ms latency)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    // Event-driven hover detection (fires ONLY when crossing elements, NEVER per-frame)
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        isHovering = true;
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        isHovering = false;
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseLeave = () => {
      isTracking = false;
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ringX = mouseX;
      ringY = mouseY;
      isTracking = true;
      if (dot) dot.style.display = 'block';
      if (ring) ring.style.display = 'block';
      document.documentElement.classList.add('custom-cursor-active');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animId: number;

    const render = () => {
      if (isTracking) {
        // Fast, highly responsive exponential damping (0.38 lerp factor)
        // Keeps the ring closely tethered to the dot with fluid organic momentum without sluggish lag
        ringX += (mouseX - ringX) * 0.38;
        ringY += (mouseY - ringY) * 0.38;

        const scale = isClicking ? 0.78 : isHovering ? 1.55 : 1.0;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden select-none"
    >
      {/* Outer Fine Circular Outline Ring (matching reference screenshot) */}
      <div
        ref={ringRef}
        style={{ display: 'none' }}
        className="fixed top-0 left-0 -ml-[19px] -mt-[19px] w-[38px] h-[38px] rounded-full border-[1.5px] border-[#2563eb] dark:border-[#38bdf8] will-change-transform pointer-events-none transition-transform duration-75 ease-out"
      />

      {/* Central Solid Navy/Cyan Dot (matching reference screenshot) */}
      <div
        ref={dotRef}
        style={{ display: 'none' }}
        className="fixed top-0 left-0 -ml-[3.5px] -mt-[3.5px] w-[7px] h-[7px] rounded-full bg-[#1e3a8a] dark:bg-[#38bdf8] shadow-xs will-change-transform pointer-events-none"
      />
    </div>
  );
};
