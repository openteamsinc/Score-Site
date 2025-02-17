import React from "react";

import { mdiAlert, mdiCircleSmall } from "@mdi/js";
import Icon from "@mdi/react";
import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

import Risk from "@/components/Risk";
import Maturity from "@/components/Maturity";
import OtherStats from "@/components/OtherStats";
import RiskHelp from "@/components/Help/Risk";
import PackageStats from "@/components/Stats/PackageStats";

import { fetchPackageScore, fetchNotes } from "@/utils/score_res";

type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
};

export default async function PackageScoreComponent({ params }: Props) {
  const { ecosystem, packageName } = await params;
  const name = packageName.join("/");

  const [notes, { package: pkg, status, score, source }] = await Promise.all([
    fetchNotes(),
    fetchPackageScore(ecosystem, name),
  ]);

  if (status === "not_found") {
    notFound();
  }

  if (status === "invalid_ecosystem") {
    const message = `Ecosystem ${ecosystem} is not supported`;
    return <ErrorMessage message={message} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Maturity: <Maturity value={score.maturity.value} />
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
            {score.maturity.notes.map((noteId, index) => (
              <li key={index} className="mb-2 flex items-start">
                <span className="h-5 px-2">
                  <Icon path={mdiCircleSmall} size={0.5} />
                </span>

                {notes[noteId]?.description || `Unknown id ${noteId}`}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Health & Risk: <Risk value={score.health_risk.value} />
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
            {score.health_risk.notes
              .filter((n) => n != null)
              .map((noteId, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <span className="h-5 px-2">
                    <Icon
                      path={mdiAlert}
                      size={0.5}
                      className="text-yellow-600"
                    />
                  </span>
                  {notes[noteId]?.description || `Unknown id ${noteId}`}
                  <RiskHelp
                    note={notes[noteId]}
                    ecosystem={ecosystem}
                    packageName={name}
                    score={score}
                    source={source}
                  />
                </li>
              ))}
          </ul>
        </section>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Legal Risk: <Risk value={score.legal.value} />
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
            {score.legal.notes
              .filter((n) => n != null)
              .map((noteId, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <span className="h-5 px-2">
                    <Icon
                      path={mdiAlert}
                      size={0.5}
                      className="text-yellow-600"
                    />
                  </span>
                  {notes[noteId]?.description || `Unknown id ${noteId}`}
                  <RiskHelp
                    note={notes[noteId]}
                    ecosystem={ecosystem}
                    packageName={name}
                    score={score}
                    source={source}
                  />
                </li>
              ))}
          </ul>
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
