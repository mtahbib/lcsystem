import { useEffect, useRef, useState, type ReactNode } from "react";

const MM_TO_PX = 3.7795;
// A4 height minus top/bottom @page margins, with a generous safety buffer so
// font-metric differences between the measuring pass and the final print
// render never tip content onto a 2nd page.
const PAGE_HEIGHT_PX = (297 - 20) * MM_TO_PX * 0.92;

interface Props {
  children: ReactNode;
}

export default function PrintFitPage({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const compute = () => {
      if (cancelled) return;
      const height = el.scrollHeight;
      const next = height > PAGE_HEIGHT_PX ? PAGE_HEIGHT_PX / height : 1;
      setScale(Math.max(0.5, Math.min(1, Number(next.toFixed(3)))));
    };

    // Fonts finishing their load after the first paint (e.g. the serif
    // certificate heading, or Geist) silently change scrollHeight — measuring
    // before they're ready produces a wrong scale. Re-measure once fonts
    // settle, and once more after the browser has actually painted that.
    compute();
    document.fonts?.ready.then(() => {
      requestAnimationFrame(() => requestAnimationFrame(compute));
    });

    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("beforeprint", compute);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("beforeprint", compute);
    };
  }, [children]);

  return (
    <div
      ref={ref}
      className="print-fit"
      style={{ ["--print-scale" as string]: scale }}
    >
      {children}
    </div>
  );
}
