"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface WavyTextProps {
  text: string;
  className?: string;
  typing?: boolean;
  typingSpeed?: number; // ms por letra
}

const WavyText: React.FC<WavyTextProps> = ({ text, className, typing = false, typingSpeed = 60 }) => {
  const [visibleCount, setVisibleCount] = useState(typing ? 0 : text.length);

  useEffect(() => {
    if (!typing) return;
    setVisibleCount(0);
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < text.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [text, typing, typingSpeed]);

  return (
    <span className={className} style={{ display: "inline-block", whiteSpace: "pre" }}>
      {text.split("").map((char, i) =>
        i < visibleCount ? (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ skewY: [0, 10, -10, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.5,
              ease: "linear",
            }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ) : (
          <span key={i} style={{ display: "inline-block", opacity: 0 }}>
            {char}
          </span>
        )
      )}
    </span>
  );
};

export default WavyText;
