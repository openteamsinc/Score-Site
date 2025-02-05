import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Note = {
  code: string;
  category: string;
  description: string;
  id: number;
};

type NotesData = {
  notes: Record<string, Note>;
  categories: string[];
  groups: Record<string, string[]>;
};

export default function CategoriesTable({ notes, categories }: NotesData) {
  // Group notes by category
  const notesByCategory = Object.values(notes).reduce(
    (acc, note) => {
      if (!acc[note.category]) {
        acc[note.category] = [];
      }
      acc[note.category].push(note);
      return acc;
    },
    {} as Record<string, Note[]>,
  );

  // Categories are pre-sorted in desired order

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Category</TableHead>
            <TableHead>Code & Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const categoryNotes = notesByCategory[category] || [];
            return categoryNotes.map((note, index) => (
              <TableRow key={note.id}>
                {index === 0 && (
                  <TableCell
                    rowSpan={categoryNotes.length}
                    className="align-top font-medium"
                  >
                    {category}
                  </TableCell>
                )}
                <TableCell>
                  <div className="mb-1 font-mono">{note.code}</div>
                  <div className="text-sm text-gray-600">
                    {note.description}
                  </div>
                </TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </div>
  );
}
