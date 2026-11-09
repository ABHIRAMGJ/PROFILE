import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'right' | 'left' | 'up';
}

/**
 * ScrollReveal wrapper component using IntersectionObserver.
 * Triggers a reveal animation sliding in from the right when the component enters the viewport.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  direction = 'right',
}) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Initial transform based on direction (default: sliding in from the right)
  const initialTranslate =
    direction === 'right'
      ? 'translate3d(60px, 0, 0)'
      : direction === 'left'
      ? 'translate3d(-60px, 0, 0)'
      : 'translate3d(0, 50px, 0)';

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : initialTranslate,
        transitionDelay: `${delayMs}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
