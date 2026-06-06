/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { ImageOff } from 'lucide-react';
import { IMG } from '../../assets/images';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className, 
  fallback = IMG.product, // Real Alcho product shot — never external stock
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden bg-brand-fill", className)}>
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-brand-border-strong flex items-center justify-center">
           <div className="w-8 h-8 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface text-brand-text-secondary p-4 text-center">
          <ImageOff size={32} className="mb-2 opacity-20" />
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Image Unavailable</span>
        </div>
      ) : (
        <img
          src={src || fallback}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700",
            loading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};
