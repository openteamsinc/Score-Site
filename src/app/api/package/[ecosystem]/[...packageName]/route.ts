import { cachedNotes, Notes } from "@/utils/database";
import packageScore from "@/utils/packageScore";
import { NextRequest } from "next/server";

type Props = {
  params: {
    ecosystem: string;
    packageName: string[];
  };
};

type T = {
  health_risk?: { notes?: string[] };
  maturity?: { notes?: string[] };
};
function replaceNoteIdWithTextCode(val: T, notes: Notes) {
  console.log("replaceNoteIdWithTextCode", notes);
  if (val.health_risk?.notes != null) {
    val.health_risk.notes = val.health_risk.notes.map((noteId) => {
      console.log("noteId", noteId);
      return notes[noteId]?.code || "Unknown";
    });
  }
  if (val.maturity?.notes != null) {
    val.maturity.notes = val.maturity.notes.map((noteId) => {
      console.log("noteId", noteId);
      return notes[noteId]?.code || "Unknown";
    });
  }
}

export async function GET(
  request: NextRequest,
  { params: { ecosystem, packageName } }: Props,
) {
  const name = packageName.join("/");
  const { pkg, source } = await packageScore(ecosystem, name);
  const notes = await cachedNotes();

  if (pkg == null || source == null) {
    return Response.json({ error: "Not Found" }, { status: 404 });
  }
  // @ts-expect-error dont care about packages for json response
  delete source.packages;

  replaceNoteIdWithTextCode(pkg, notes);
  replaceNoteIdWithTextCode(source, notes);

  return Response.json({ ecosystem, name, source, pkg });
}
