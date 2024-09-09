import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Configuration`.
 */
export type ConfigurationProps =
  SliceComponentProps<Content.ConfigurationSlice>;

/**
 * Component for "Configuration" Slices.
 */
const Configuration = ({ slice }: ConfigurationProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for configuration (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Configuration;
