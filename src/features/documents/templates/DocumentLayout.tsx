import type { ReactNode } from "react";
import type { LCRecord } from "@/types/lc";
import LetterheadText from "@/components/common/LetterheadText";
import { cn } from "@/lib/utils";

interface DocumentLayoutProps {
  lc: LCRecord;
  logo: string;
  title: string;
  children: ReactNode;
  bordered?: boolean;
}

export default function DocumentLayout({
  lc,
  logo,
  title,
  children,
  bordered = true,
}: DocumentLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl bg-white p-8 text-[13px] text-black print:max-w-none print:p-0">
      <div className={cn("flex items-start justify-between gap-4", bordered && "border-b pb-4")}>
        <img
          src={logo}
          alt="Company logo"
          className={cn("object-contain", bordered ? "h-16 w-16" : "h-20 w-auto")}
        />
        <LetterheadText text={lc.beneficiary.details} className="text-right" />
      </div>

      <h1 className="my-4 text-center text-lg font-bold tracking-wide">{title}</h1>

      <div className={bordered ? "space-y-3" : "space-y-4"}>{children}</div>
    </div>
  );
}
