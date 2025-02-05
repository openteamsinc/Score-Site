import React from "react";

import { notFound } from "next/navigation";

import Risk from "@/components/Risk";
import Maturity from "@/components/Maturity";
import OtherStats from "@/components/OtherStats";

import PackageStats from "@/components/Stats/PackageStats";

import { fetchPackageScore, fetchNotes } from "@/utils/score_res";
import NoteList from "./NotesList";
import InfoTooltip from "@/components/InfoTooltip";

type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
};
export default async function PackageScoreComponent({ params }: Props) {
  const { ecosystem, packageName } = await params;
  const name = packageName.join("/");

  const [{ notes }, { package: pkg, status, score, source }] =
    await Promise.all([fetchNotes(), fetchPackageScore(ecosystem, name)]);

  if (status === "not_found") {
    notFound();
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Maturity: <Maturity value={score.maturity.value} />
            <InfoTooltip className="ml-auto" anchor="#maturity" />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.maturity.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>

        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Health & Risk: <Risk value={score.health_risk.value} />
            <InfoTooltip className="ml-auto" anchor="#health_risk" />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.health_risk.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Legal Risk: <Risk value={score.legal.value} />
            <InfoTooltip className="ml-auto" anchor="#legal" />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.legal.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>
      </div>
      <div>
        <h2 className="border-b border-b-slate-300">Package Stats</h2>
        <PackageStats score={score} pkg={pkg} ecosystem={ecosystem} />
        <h2 className="border-b border-b-slate-300">Source Stats</h2>
        <OtherStats score={score} />
      </div>
    </div>
  );
}
