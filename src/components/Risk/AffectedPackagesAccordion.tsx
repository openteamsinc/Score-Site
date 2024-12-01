import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  value: string;
  pkgList: string[];
};
export default function AffectedPackagesAccordion({ value, pkgList }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={value} className="border-none">
        <AccordionTrigger className="py-0 hover:no-underline">
          <span className="text-sm font-medium">Affected Packages</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {pkgList.map((pkg) => (
              <div key={pkg} className="rounded-md bg-muted px-2 py-1 text-sm">
                {pkg}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
