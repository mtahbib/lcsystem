import { cn } from "@/lib/utils";

interface LetterheadTextProps {
  text: string | undefined | null;
  className?: string;
}

export default function LetterheadText({ text, className }: LetterheadTextProps) {
  const lines = (text ?? "").split("\n").filter((line) => line.trim().length > 0);
  const [first, ...rest] = lines;

  return (
    <div className={cn(className)}>
      {first && <p className="text-base font-bold">{first}</p>}
      {rest.map((line, index) => (
        <p key={index} className="text-sm">
          {line}
        </p>
      ))}
    </div>
  );
}
