"use client";
import React from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
} from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import useSearchPackages from "./useSearchPackages";
import Options from "./Options";
import { PackageResult } from "@/utils/search_packages";
import { useRouter } from "next/navigation";
import { SiPypi, SiAnaconda, SiNpm } from "react-icons/si";

export default function SearchAutocomplete() {
  const [query, setQuery] = React.useState("");
  const [selectedSource, setSelectedSource] = React.useState("");
  const { packages, loading } = useSearchPackages(query, selectedSource || "");

  const sources = [
    {
      id: "pypi",
      label: "pypi",
      icon: <SiPypi className="mr-2 text-blue-500" />,
    },
    {
      id: "conda",
      label: "conda",
      icon: <SiAnaconda className="mr-2" style={{ color: "#3EB022" }} />,
    },
    {
      id: "npm",
      label: "npm",
      icon: <SiNpm className="mr-2" style={{ color: "#C23B33" }} />,
    },
  ];

  const router = useRouter();

  return (
    <div className="mx-auto w-screen">
      <Combobox
        onChange={(value: { ecosystem: string; name: string } | null) => {
          if (!value) return;
          router.push(`/${value.ecosystem}/${value.name}`);
        }}
      >
        <div className="relative mt-1 flex justify-center">
          <div className="flex w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-32 items-center justify-center rounded-l-lg bg-blue-500 px-4 text-sm font-medium text-white lg:w-52">
                {selectedSource
                  ? sources.find((s) => s.id === selectedSource)?.label
                  : "Source"}
                <Icon
                  path={mdiChevronDown}
                  className="ml-2 size-5 text-white"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32 lg:w-52">
                <DropdownMenuRadioGroup
                  value={selectedSource}
                  onValueChange={setSelectedSource}
                >
                  {sources.map((source) => (
                    <DropdownMenuRadioItem key={source.id} value={source.id}>
                      {source.icon} {source.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <ComboboxInput
              className="w-full rounded-r-lg border-none p-2 pl-3 pr-10 text-xl leading-10 text-gray-900 focus:ring-0"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item: PackageResult | null) =>
                item ? `${item.ecosystem}/${item.name}` : ""
              }
              placeholder={
                selectedSource ? "Search packages..." : "Select a source first"
              }
              disabled={!selectedSource}
            />
            {selectedSource && (
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Icon
                  path={mdiChevronDown}
                  className="size-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>
            )}
          </div>

          <ComboboxOptions className="absolute left-0 top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
            <Options query={query} packages={packages} loading={loading} />
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
