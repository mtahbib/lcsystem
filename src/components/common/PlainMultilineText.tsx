import { cn } from "@/lib/utils";

interface PlainMultilineTextProps {
  text: string | undefined | null;
  className?: string;
}

export default function PlainMultilineText({ text, className }: PlainMultilineTextProps) {
  const lines = (text ?? "").split("\n").filter((line) => line.trim().length > 0);

  return (
    <div className={cn(className)}>
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}
