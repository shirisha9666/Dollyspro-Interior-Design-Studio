import { useReducedMotion, useSpring, useMotionValue, motion } from "framer-motion";

export default function InteractiveImage({
  src,
  alt,
  shape = "organic",
  className = "",
  loading = "lazy",
  children,
}) {
  const reduceMotion = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.5 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.5 });
  const lift = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.5 });

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltX.set(vertical * -5);
    tiltY.set(horizontal * 5);
    lift.set(5);
  };

  const resetPointer = () => {
    tiltX.set(0);
    tiltY.set(0);
    lift.set(0);
  };

  return (
    <motion.div
      className={`depth-image ${className}`}
      style={{
        transformPerspective: 1100,
        rotateX: tiltX,
        rotateY: tiltY,
        translateZ: lift,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className={`depth-image-face shape-${shape}`}>
        <img className="depth-image-photo" src={src} alt={alt} loading={loading} />
        {children}
      </div>
    </motion.div>
  );
}
