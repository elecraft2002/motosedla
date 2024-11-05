import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps, JSXMapSerializer } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { PrismicRichText } from "@/components/PrismicRichText";
import ScrollIcon from "@/components/ScrollIcon";
import EmblaCarousel from "./EmblaCarousel";
import TextAnimation from "@/components/TextAnimation";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h2" size="xl" className="mb-4 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),
};

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  if (slice.variation === "heroSlider")
    return (
      <section className="pt-24 relative min-h-screen flex flex-col">
        <EmblaCarousel
          options={{ loop: true }}
          slides={slice.primary.section}
        />
        {slice.primary.phrase && <div className="m-auto"><TextAnimation text={slice.primary.phrase} /></div>}
        {/* <span className="text-center">
          <PrismicRichText field={slice.primary.text} />
        </span> */}
      </section>
    );
  if (slice.variation === "heroVideo")
    return (
      <section className="relative h-[90vh]">
        {isFilled.linkToMedia(slice.primary.background_video) && (
          <div className="absolute ">
            <video
              className="h-[90vh] w-screen object-cover"
              src={slice.primary.background_video.url}
              autoPlay
              loop
              muted
            />
          </div>
        )}
        <Bounded yPadding="base" className="relative h-full ">
          <div className="flex flex-col justify-between h-full items-center">
            <div className="grid justify-items-center gap-8">
              <div className="max-w-2xl text-center">
                <PrismicRichText
                  field={slice.primary.text}
                  components={components}
                />
              </div>
              {isFilled.link(slice.primary.buttonLink) && (
                <PrismicNextLink
                  field={slice.primary.buttonLink}
                  className="rounded bg-white px-5 py-3 font-medium text-slate-800"
                >
                  {slice.primary.buttonText || "Learn More"}
                </PrismicNextLink>
              )}
            </div>
            <span className="mt-auto">
              <ScrollIcon />
            </span>
          </div>
        </Bounded>
      </section>
    );

  return (
    <section className="relative">
      {isFilled.image(slice.primary.backgroundImage) && (
        <PrismicNextImage
          field={slice.primary.backgroundImage}
          alt=""
          fill={true}
          className="pointer-events-none select-none object-cover opacity-40"
        />
      )}
      <Bounded yPadding="lg" className="relative">
        <div className="grid justify-items-center gap-8">
          <div className="max-w-2xl text-center">
            <PrismicRichText
              field={slice.primary.text}
              components={components}
            />
          </div>
          {isFilled.link(slice.primary.buttonLink) && (
            <PrismicNextLink
              field={slice.primary.buttonLink}
              className="rounded bg-white px-5 py-3 font-medium text-slate-800"
            >
              {slice.primary.buttonText || "Learn More"}
            </PrismicNextLink>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default Hero;
