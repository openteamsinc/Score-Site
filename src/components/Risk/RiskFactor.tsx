import React from "react";

import { DollarSign } from "lucide-react";

import AffectedPackagesAccordion from "./AffectedPackagesAccordion";

type Props = {
  factorId: string;
  factor: {
    cost: number;
    description: string;
    diligence_impact: string;
  };
  pkgList: string[];
};
export default function RiskFactor({ factorId, factor, pkgList }: Props) {
  return (
    <div className="rounded-lg border">
      <div className="space-y-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{factorId.replace(/_/g, " ")}</h3>
            <span className="text-sm font-normal text-red-500">
              ({pkgList.length || 0} packages)
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="size-4" />
            Cost Impact: ${factor.cost.toLocaleString()}
          </div>
        </div>

        {/* Description and Impact */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Description</div>
            <div className="text-sm text-muted-foreground">
              {factor.description}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Impact</div>
            <div className="text-sm text-muted-foreground">
              {factor.diligence_impact}
            </div>
          </div>
        </div>

        <AffectedPackagesAccordion value={factorId} pkgList={pkgList} />
      </div>
    </div>
  );
}
