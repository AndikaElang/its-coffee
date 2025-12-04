'use client';

import { cn } from '@/lib/utils';
import { ImageIcon, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageWithLoadingProps {
  src?: string | null;
  alt: string;
  className?: string;
  imageClassname?: string;
  imageFull?: boolean;
  clickable?: boolean;
}

export function ImageWithLoading({
  src,
  alt,
  className = '',
  imageFull = true,
  imageClassname,
  clickable = false,
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClick = () => {
    if (clickable) setIsOpen(true);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => clickable && setIsHovered(true)}
      onMouseLeave={() => clickable && setIsHovered(false)}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
          <ImageIcon className="w-12 h-12 mb-2" />
          <span className="text-sm">Image not available</span>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className={cn(
          imageFull && 'w-full h-full object-cover',
          imageClassname,
          ` ${clickable ? 'cursor-pointer' : ''} transition-opacity duration-300 ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`,
        )}
        onLoad={handleLoad}
        onError={handleError}
        onClick={handleClick}
      />

      {clickable && isHovered && !isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ease-out cursor-pointer animate-in fade-in"
          onClick={handleClick}
        >
          <div className="bg-white/90 rounded-full p-3 shadow-lg transition-transform duration-300 ease-out scale-100 hover:scale-105">
            <Maximize2 className="w-6 h-6 text-gray-800 transition-transform duration-200" />
          </div>
        </div>
      )}

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-[9999] animate-in fade-in duration-200"
            onClick={() => {
              setIsOpen(false);
              setIsHovered(false);
            }}
          >
            <img
              src={src || '/placeholder.svg'}
              alt={alt}
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-5 right-5 text-white text-2xl font-bold cursor-pointer transition-transform duration-200 hover:scale-105 hover:rotate-90"
              onClick={() => {
                setIsOpen(false);
                setIsHovered(false);
              }}
            >
              ✕
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
