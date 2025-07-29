'use client';

import React from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ children, className = '', delay = 0 }) => {
  const words = children.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="inline-block animate-fade-in-up"
              style={{
                animationDelay: `${delay + (wordIndex * 100) + (charIndex * 50)}ms`,
                animationFillMode: 'both'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
