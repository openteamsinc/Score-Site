import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import DependencyRow from "@/components/Risk/DependencyRow";

import MaturityRow from "@/components/Risk/MaturityRow";
import RiskFactorsCard from "@/components/Risk/RiskFactorsCard";
import { affectedPackages, projectData, breakdown } from "./data";

const RiskDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Project • {projectData.name}
        </h2>
      </div>
      {/* OpenTeams Insurance */}
      <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="size-6 text-green-500" />
            <span>Risk Mitigation Insurance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-4xl font-bold text-green-600">
            $11,222<span className="text-lg text-gray-600">/year</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  Core Coverage - $8,000
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  Up to $500,000 coverage for:
                </div>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                  {projectData.insurance.core.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  Legal Protection - $3,222
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  Up to $1M coverage for:
                </div>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                  {projectData.insurance.legal.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="mb-2 text-lg font-semibold text-gray-800">
              OpenTeams Support Services (Time & Materials)
            </div>
            <div className="grid grid-cols-2 gap-4">
              {projectData.insurance.support.items.map((item, i) => (
                <div key={i} className="text-sm">
                  <span className="text-gray-700">{item.service}:</span>
                  <span className="ml-2 text-gray-600">${item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dependency Health Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DependencyRow
              data={breakdown.health_risk.direct}
              title="Direct Dependencies"
            />
            <div className="border-t pt-4">
              <DependencyRow
                data={breakdown.health_risk.indirect}
                title="Indirect Dependencies"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maturity Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MaturityRow
              data={breakdown.maturity.direct}
              title="Direct Dependencies"
            />
            <div className="border-t pt-4">
              <MaturityRow
                data={breakdown.maturity.indirect}
                title="Indirect Dependencies"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <RiskFactorsCard affectedPackages={affectedPackages} />
    </div>
  );
};

export default RiskDashboard;
