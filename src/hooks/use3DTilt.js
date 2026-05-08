import { useMotionValue, useTransform, useSpring } from 'framer-motion';

export function use3DTilt({ intensity = 10, springOpts = { stiffness: 180, damping: 28 } } = {}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), springOpts);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), springOpts);
  const scale   = useSpring(1, springOpts);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onMouseLeave  = () => { rawX.set(0); rawY.set(0); };
  const onHoverStart  = () => scale.set(1.03);
  const onHoverEnd    = () => scale.set(1);

  return { rotateX, rotateY, scale, onMouseMove, onMouseLeave, onHoverStart, onHoverEnd };
}
