"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function InfoTooltip({
  className,
  anchor,
}: {
  anchor: string;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className}>
          <Link href={`/categories${anchor}`}>
            <HelpCircle className="ml-2 size-4 text-slate-500 hover:text-slate-700" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View risk categories documentation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
