import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({ 
  children, 
  className = "", 
  spotlightColor = "rgba(255, 255, 255, 0.25)" 
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/50",
        "before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none",
        "before:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--spotlight-color,rgba(255,255,255,0.05)),transparent_80%)]",
        "hover:before:opacity-60 focus-within:before:opacity-60",
        className
      )}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--spotlight-color": spotlightColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};