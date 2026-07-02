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
  return (
    <div className={"relative"}>
      <div className="flex h-8/9 w-3/4 mx-auto gap-6 overflow-hidden transition-all  scrollbar-none">
        <div
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          className={`h-full w-full flex transition-transform duration-500 ease-in-out`}
        >
          {src.length > 0 &&
            src.map((_, index) => (
              <div
                className={`w-full h-full mx-auto relative flex shrink-0 rounded-lg overflow-hidden`}
                key={index}
              >
                <Image
                  src={src[index]}
                  alt={alt}
                  className="object-fill"
                  onClick={() => setActiveIndex(index)}
                  width={900}
                  height={900}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-0 left-1/2 space-x-3 rtl:space-x-reverse ">
        {src.length > 1 &&
          src.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-base bg-slate-950 rounded-2xl p-2 cursor-pointer transition-all hover:bg-slate-950/75 ${activeIndex === index ? "bg-slate-950/50" : "bg-slate-950"}`}
              aria-current="true"
              onClick={() => setActiveIndex(index)}
              aria-label="Slide 1"
            ></button>
          ))}
      </div>
      {src.length > 1 && (
        <>
          <button
            className="flex justify-center items-center absolute left-5 top-0 h-full rounded-2xl cursor-pointer"
            onClick={prevImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-12 h-fit bg-slate-300 rounded-full p-2 transition-all hover:bg-slate-300 hover:scale-110"
            >
              <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
            </svg>
          </button>
          <button
            className="flex justify-center items-center absolute right-5 top-0 h-full rounded-2xl cursor-pointer"
            onClick={nextImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-12 h-fit bg-slate-300 rounded-full p-2 transition-all hover:bg-slate-300 hover:scale-110"
            >
              <path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
