'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  source?: string;
}

const stats: Stat[] = [
  { value: 62, suffix: ' Mt', label: 'E-waste generated worldwide each year', source: 'UN E-waste Monitor 2024' },
  { value: 22.3, decimals: 1, suffix: '%', label: 'Of it that is recycled properly', source: 'UN E-waste Monitor 2024' },
  { value: 91, prefix: '$', suffix: 'B', label: 'In recoverable materials thrown away yearly', source: 'UN raw-material estimate' },
  { value: 5, suffix: '', label: 'Certified drop-off sites in this guide', source: 'San Diego County' },
];

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const duration = 1400;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);

  return value;
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const v = useCountUp(stat.value, run);
  return (
    <div className="px-2 py-6 text-center sm:px-6">
      <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {stat.prefix}
        {v.toFixed(stat.decimals ?? 0)}
        {stat.suffix}
      </div>
      <div className="mx-auto mt-2 max-w-[15rem] text-sm leading-snug text-emerald-50/85">
        {stat.label}
      </div>
      {stat.source && (
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-emerald-200/55">
          {stat.source}
        </div>
      )}
    </div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16" aria-label="E-waste by the numbers">
      <div
        ref={ref}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-strong via-brand to-accent p-6 shadow-2xl shadow-emerald-950/30 sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100/85">
            E-waste, by the numbers
          </h2>
          <div className="mt-4 grid grid-cols-2 divide-emerald-100/10 lg:grid-cols-4 lg:divide-x">
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} run={run} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
