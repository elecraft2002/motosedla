"use client";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { PrismicNextLink } from "@prismicio/next";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
};

export default function EmblaCarousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnMouseEnter: true, delay: 10000 }),
  ]);
  // emblaApi?.on("scroll", (e) => {
  //   console.log(e.());
  // });
  const centerAnimation: HTMLMotionProps<"div"> = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.8 },
  };
  const sideAnimation = (side: "left" | "right"): HTMLMotionProps<"div"> => {
    return {
      initial: { opacity: 0, translateX: side === "left" ? 50 : -50 },
      animate: { opacity: 1, translateX: 0 },
      transition: { duration: 0.8, delay: 0.6 },
    };
  };
  //   const lastAnimation

  return (
    <AnimatePresence mode="wait">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4 touch-pan-y touch-pinch-zoom ">
          {slides.map((item, i) => {
            const content = item.background_content as any;
            console.log(content)
            let animation: HTMLMotionProps<"div"> = {};
            if (i === 0) animation = centerAnimation;
            else {
              if (i === 1) animation = sideAnimation("right");
              if (i === slides.length - 1) animation = sideAnimation("left");
            }
            return (
              <div key={i} className="m-8" style={{ flex: "0 0 60%" }}>
                <motion.div
                  {...animation}
                  className="overflow-hidden rounded-3xl h-[60vh] relative"
                >
                  {content.kind === "file" && (
                    <video
                      className="h-full w-full object-cover"
                      src={content.url}
                      autoPlay
                      loop
                      muted
                    />
                  )}
                  {content.kind === "image" && (
                    <Image
                      src={content.url}
                      alt={content.name}
                      width={1000}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute left-0 top-0 w-full h-full flex items-end ">
                    <PrismicNextLink field={item.link} className="ml-4 mb-8">
                      <p>{item.link_text}</p>
                    </PrismicNextLink>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatePresence>
  );
}

/* const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla mx-auto max-w-3xl">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex -ml-[1.2rem] touch-pan-y touch-pinch-zoom">
          {slides.map((item, i) => {
            const content = item.background_content as any;
            console.log(content);
            return (
              <div className="bg-red-400 aspect-[3/4] max-w-[70vw] max-h-[50vh] w-full h-full overflow-hidden rounded-3xl">
                {content.kind === "video" && (
                  <video
                    className="h-[90vh] w-screen object-cover"
                    src={content.url}
                    autoPlay
                    loop
                    muted
                  />
                )}
                {content.kind === "image" && (
                  <Image
                    src={content.url}
                    alt={content.name}
                    width={1000}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}; */
