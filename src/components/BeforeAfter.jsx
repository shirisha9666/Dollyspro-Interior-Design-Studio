import { useState } from "react";

const beforeImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88";
const afterImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88";

export default function BeforeAfter() {
  const [position, setPosition] = useState(52);

  return (
    <div className="before-after" data-cursor="Drag">
      <img className="before-after-base" src={beforeImage} alt="Living room before a considered redesign" loading="lazy" />
      <div className="before-after-reveal" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={afterImage} alt="The same living room, reimagined with warmer natural finishes" loading="lazy" />
      </div>
      <span className="before-after-label before-label">Before</span>
      <span className="before-after-label after-label">After</span>
      <span className="before-after-handle" style={{ left: `${position}%` }} aria-hidden="true">
        <span />
      </span>
      <label className="before-after-range-label">
        <span className="sr-only">Compare before and after images</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label="Reveal more of the redesigned room"
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </label>
    </div>
  );
}
