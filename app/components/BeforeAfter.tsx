"use client";
import { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string; // image sale
  afterImage: string; // image propre
  alt?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = "Comparaison avant / après",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    if (x >= 0 && x <= 100) setPosition(x);
  };

  useEffect(() => {
    const handleMouseUp = () =>
      window.removeEventListener("mousemove", handleMove as any);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-lg cursor-col-resize select-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onTouchMove={handleMove}
    >
      {/* Image AVANT (sale) en fond complet */}
      <img
        src={beforeImage}
        alt={`${alt} - avant`}
        className="w-full h-auto object-cover"
      />

      {/* Image APRÈS (propre) qui se révèle depuis la droite */}
      <div
        className="absolute top-0 right-0 h-full overflow-hidden"
        style={{ width: `${100 - position}%` }}
      >
        <img
          src={afterImage}
          alt={`${alt} - après`}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Barre coulissante */}
      <div className="absolute top-0 bottom-0" style={{ left: `${position}%` }}>
        <div className="w-1 bg-white shadow-lg h-full relative">
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
