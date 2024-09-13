"use client";
import Button, { ButtonType } from "@/components/Button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";

/**
 * Props for `Configuration`.
 */
export type ConfigurationProps =
  SliceComponentProps<Content.ConfigurationSlice>;

/**
 * Component for "Configuration" Slices.
 */
interface Context {
  context: React.Dispatch<React.SetStateAction<Map<string, number>>>;
}
const Configuration = ({
  slice,
  context,
}: ConfigurationProps & Context): JSX.Element => {
  const formatString = (text: string | null) => {
    if (!text) return "";
    return text.replaceAll(" ", "-").toLowerCase();
  };
  const [selected, handleSelected] = useState<string | null>(null);
  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    const selectedParam = params[formatString(slice.primary.name)];
    if (selectedParam) {
      handleSelected(formatString(selectedParam));
      const price = slice.primary.options.find((option) => {
        return formatString(option.option_name) == formatString(selectedParam);
      });
      context((map) => {
        const newMap = new Map(map);
        newMap.set(formatString(slice.primary.name), price?.price ?? 0);
        return newMap;
      });
    }
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <form className="flex flex-col gap-3">
        <h3>{slice.primary.name}</h3>
        <div className="flex flex-wrap gap-4">
          {slice.primary.options.map((option, i) => {
            return (
              <Button
                type={ButtonType.secondary}
                key={i}
                selected={selected == formatString(option.option_name)}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelected(
                    formatString(
                      selected == formatString(option.option_name)
                        ? null
                        : option.option_name
                    )
                  );

                  const params = Object.fromEntries(
                    new URLSearchParams(location.search)
                  );
                  let newParams = {
                    ...params,
                    [formatString(slice.primary.name)]: formatString(
                      option.option_name
                    ),
                  };
                  context((map) => {
                    const newMap = new Map(map);
                    newMap.set(
                      formatString(slice.primary.name),
                      option.price ?? 0
                    );
                    return newMap;
                  });
                  if (selected == formatString(option.option_name)) {
                    context((map) => {
                      const newMap = new Map(map);
                      newMap.delete(formatString(slice.primary.name));
                      return newMap;
                    });
                    delete newParams[formatString(slice.primary.name)];
                  }
                  const urlParams =
                    "?" + new URLSearchParams(newParams).toString();
                  window.history.pushState({ id: 1 }, "", urlParams);
                }}
              >
                {option.option_name}
              </Button>
            );
          })}
        </div>
      </form>
    </section>
  );
};

export default Configuration;
