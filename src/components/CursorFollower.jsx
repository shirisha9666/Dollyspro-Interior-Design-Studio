import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const position = useRef({ x: -100, y: -100 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    if (!pointer.matches) return undefined;
    let frame = 0;

    const move = (event) => {
      position.current = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
        }
        frame = 0;
      });
    };
    const target = (event) => {
      const element = event.target.closest("[data-cursor], a, button");
      setLabel(element?.dataset.cursor ?? (element ? "↗" : ""));
    };
    const hide = (event) => {
      const current = event.target.closest("[data-cursor], a, button");
      const next = event.relatedTarget?.closest?.("[data-cursor], a, button");
      if (current !== next) setLabel("");
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", target);
    document.addEventListener("pointerout", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", target);
      document.removeEventListener("pointerout", hide);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={cursorRef} className={`cursor-follower ${label ? "is-active" : ""}`} aria-hidden="true">
      {label}
    </span>
  );
}
