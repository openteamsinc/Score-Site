import { maturityColor, maturityIconPath } from "@/components/Maturity";
import { riskColor, riskIconPath } from "@/components/Risk";
import { PackageResult } from "@/utils/search_packages";
import { ComboboxOption } from "@headlessui/react";
import { mdiSearchWeb } from "@mdi/js";
import Icon from "@mdi/react";

type Props = {
  item: PackageResult;
};

export default function AutoCompleteOption({ item }: Props) {
  return (
    <ComboboxOption
      key={`${item.ecosystem}/${item.name}`}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? "bg-slate-200 text-slate-900" : "text-slate-700"
        }`
      }
      value={item}
    >
      {({ selected, active }) => (
        <>
          <span
            className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
          >
            {`${item.ecosystem}/${item.name}`}
          </span>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
            <div
              className={`flex size-6 items-center justify-center rounded bg-${riskColor(item.health_risk)}`}
            >
              <Icon
                className={`size-4 text-white`}
                path={riskIconPath(item.health_risk)}
              />
            </div>
            <div
              className={`flex size-6 items-center justify-center rounded ${maturityColor(item.maturity)}`}
            >
              <Icon
                className="size-4 text-white"
                path={maturityIconPath(item.maturity)}
              />
            </div>
          </div>
          {selected ? (
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                active ? "text-white" : "text-slate-200"
              }`}
            >
              <Icon className="size-5" aria-hidden="true" path={mdiSearchWeb} />
            </span>
          ) : null}
        </>
      )}
    </ComboboxOption>
  );
}
