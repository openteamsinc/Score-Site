import React from "react";

import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";

import RiskHelp from "@/components/Help/Risk";

import { Score, Notes } from "@/utils/score_res";

type Props = {
  name: string;
  ecosystem: string;
  score: Score;
  notes: Notes;
  scoreNotes: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
};

export default function NoteList({
  notes,
  ecosystem,
  name,
  score,
  source,
  scoreNotes,
}: Props) {
  return (
    <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
      {scoreNotes
        .filter((n) => n != null)
        .map((noteId, index) => (
          <li key={index} className="mb-2 flex items-start">
            <span className="h-5 px-2">
              <Icon path={mdiAlert} size={0.5} className="text-yellow-600" />
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
  );
}
