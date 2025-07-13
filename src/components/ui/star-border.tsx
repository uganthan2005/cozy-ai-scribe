import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  [key: string]: any;
}

export const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "hsl(var(--primary))",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps) => {
  useEffect(() => {
    const styleId = "star-border-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes star-movement-bottom {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(-100%, 0%); opacity: 0; }
        }
        @keyframes star-movement-top {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(100%, 0%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Component 
      className={cn("relative inline-block rounded-2xl overflow-hidden", className)}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-1/2 opacity-70 -bottom-3 -right-[250%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-movement-bottom ${speed} linear infinite alternate`,
        }}
      />
      <div
        className="absolute opacity-70 w-[300%] h-1/2 -top-3 -left-[250%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-movement-top ${speed} linear infinite alternate`,
        }}
      />
      <div className="relative border border-border bg-background text-foreground text-sm text-center px-6 py-4 rounded-2xl z-10 transition-all duration-300 hover:bg-accent">
        {children}
      </div>
    </Component>
  );
};