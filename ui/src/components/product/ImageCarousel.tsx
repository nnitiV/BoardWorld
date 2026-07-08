import Image from "next/image";
import { useState } from "react";

interface ImageCarouselProps {
  src: string[];
  alt: string;
}

export default function ImageCarousel({ src, alt }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % src.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + src.length) % src.length);
  };

  if (!src || src.length === 0) return null;

  return (
    // 1. Removed w-3/4. This component should simply fill whatever container it is placed in.
    <div className="relative w-full group">
      
      {/* 2. Swapped to aspect-square and a white background so product images look natural */}
      <div className="relative overflow-hidden rounded-xl aspect-square bg-white border border-slate-200 shadow-sm">
        
        <div
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
        >
          {src.map((imageSrc, index) => (
            <div className="w-full h-full relative shrink-0" key={index}>
              <Image
                src={`http://localhost:5173${imageSrc}`}
                alt={`${alt} - Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                // 3. Changed to object-contain so board game boxes aren't violently cropped!
                className="object-contain p-4 cursor-pointer"
                onClick={() => setActiveIndex(index)}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {src.length > 1 && (
          <>
            <button
              className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
              onClick={prevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
              onClick={nextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {src.length > 1 && (
        <div className="absolute z-20 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2">
          {src.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-blue-950 w-6" : "bg-slate-300 w-2 hover:bg-slate-400"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}