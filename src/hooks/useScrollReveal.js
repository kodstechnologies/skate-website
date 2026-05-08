import { useInView } from 'react-intersection-observer';

/**
 * Triggers animation ONCE when element enters viewport.
 * triggerOnce: true → no re-animation on scroll back.
 */
export function useScrollReveal(options = {}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
    ...options,
  });
  return { ref, inView };
}

export default useScrollReveal;
