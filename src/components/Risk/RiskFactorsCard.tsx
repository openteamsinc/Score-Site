import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { riskFactors } from "./data";
import RiskFactor from "./RiskFactor";

type Props = {
  affectedPackages: { [key: string]: string[] };
};

export default function RiskFactorsCard({ affectedPackages }: Props) {
  const riskFactorsWithAffectedPackages = Object.entries(riskFactors).filter(
    ([key]) => {
      return affectedPackages[key]?.length > 0;
    },
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-amber-500" />
          Risk Factors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {riskFactorsWithAffectedPackages.map(([key, factor]) => (
          <RiskFactor
            key={key}
            factorId={key}
            factor={factor}
            pkgList={affectedPackages[key]}
          />
        ))}
      </CardContent>
    </Card>
  );
}
