import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem("dollyspro-loaded"));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("dollyspro-loaded", "true");
      setVisible(false);
    }, reduceMotion ? 200 : 800);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Dollyspro Interior Design Studio"
        >
          <motion.span
            className="loader-wordmark"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            dollyspro
            <small>INTERIOR DESIGN STUDIO</small>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
