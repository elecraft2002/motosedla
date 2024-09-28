"use client";
import Image from "next/image";
import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Image {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export default function SliderGallery({ images }: { images: Image[] }) {
  console.log(images);
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={i}>
              <figure className="w-full aspect-1 flex items-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={!i ? "eager" : "lazy"}
                  className="object-contain rounded-md"
                />
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
