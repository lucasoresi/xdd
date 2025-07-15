"use client";

import { 
  CSSProperties, 
  ReactNode, 
  useEffect, 
  useRef, 
  useState 
} from "react";

import { cn } from "../../lib/utils";

interface NeonGradientCardProps {
  className?: string;
  children?: ReactNode;
  borderSize?: number;
  borderRadius?: number;
  [key: string]: any;
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
        } as CSSProperties
      }
      className={cn(
        "relative z-10 h-fit w-fit rounded-[--border-radius] bg-white p-[--border-size]",
        "before:absolute before:inset-0 before:-z-10 before:h-[--card-height] before:w-[--card-width] before:rounded-[--border-radius] before:content-['']",
        "before:bg-[conic-gradient(from_180deg_at_50%_50%,#ff2975_0deg,#00FFF1_72deg,#ff2975_144deg,#00FFF1_216deg,#ff2975_288deg,#00FFF1_1turn)]",
        "before:animate-spin before:[animation-duration:3s]",
        "dark:bg-black",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full rounded-[calc(var(--border-radius)-var(--border-size))] bg-white p-6",
          "dark:bg-black"
        )}
      >
        {children}
      </div>
    </div>
  );
};