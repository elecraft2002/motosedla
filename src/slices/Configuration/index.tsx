"use client";
import Button, { ButtonType } from "@/components/Button";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
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
  }, [searchParams]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-wrap gap-4 border-b-1 p-4 border-black">
        {/* <div className="w-44 aspect-1">
          <PrismicNextImage
            field={slice.primary.reference_image.small}
            className="rounded-md w-full h-full"
          />
        </div> */}
        <form className="flex flex-col gap-3">
          <h3 className="font-bold">{slice.primary.name}</h3>
          <span>
            <PrismicRichText field={slice.primary.description} />
          </span>
          <div className="flex flex-wrap gap-4">
            {slice.primary.options.map((option, i) => {
              return (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="">
                    <PrismicNextImage
                      className={clsx(
                        "rounded-md h-32 w-32 bg-white transition-all cursor-pointer object-contain border-red-500 ",
                        selected == formatString(option.option_name) &&
                          "border-2"
                      )}
                      loading="lazy"
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
                      field={option.image.small}
                    />
                  </div>
                  <Button
                    className="m-auto"
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
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Configuration;
