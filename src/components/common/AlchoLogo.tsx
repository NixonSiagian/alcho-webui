/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AlchoLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const AlchoLogo: React.FC<AlchoLogoProps> = ({ className, variant = 'full' }) => {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        {/* Outer Maroon Border Shape */}
        <path
          d="M20 80C20 80 40 40 80 30H320C360 40 380 80 380 80C380 80 360 120 320 130H80C40 120 20 80 20 80Z"
          fill="#581212"
        />
        {/* Inner Yellow Shape */}
        <path
          d="M35 80C35 80 50 48 85 40H315C350 48 365 80 365 80C365 80 350 112 315 120H85C50 112 35 80 35 80Z"
          fill="url(#paint0_linear)"
        />
        
        {/* Alcho Text Recreation */}
        <text
          x="200"
          y="105"
          textAnchor="middle"
          style={{
            fontFamily: "'Dancing Script', 'Pacifico', cursive",
            fontSize: "90px",
            fontWeight: "bold",
            fill: "#581212",
            stroke: "white",
            strokeWidth: "2px",
            paintOrder: "stroke fill"
          }}
        >
          Alcho
        </text>

        <defs>
          <linearGradient id="paint0_linear" x1="200" y1="40" x2="200" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F7DF6B" />
            <stop offset="1" stopColor="#E6C135" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
