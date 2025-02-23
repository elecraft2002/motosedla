import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Map`.
 */
export type MapProps = SliceComponentProps<Content.MapSlice>;

/**
 * Component for "Map" Slices.
 */
const Map = ({ slice }: MapProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <iframe
          width="100%"
          height="600"
          src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=+(${decodeURIComponent(slice.primary.search_term || "")})&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
        >
        </iframe>
      </Bounded>
    </section>
  );
};

export default Map;
