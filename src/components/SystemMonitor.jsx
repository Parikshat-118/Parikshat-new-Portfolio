import { useState, useEffect, useCallback } from 'react';

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const lerp = (current, target) => Math.round(current * 0.7 + target * 0.3);

const buildBar = (percent, total = 10) => {
  const filled = Math.round((percent / 100) * total);
  return {
    filled: '█'.repeat(filled),
    empty: '░'.repeat(total - filled),
  };
};

export default function SystemMonitor() {
  const [stats, setStats] = useState({
    cpu: 65,
    ram: 40,
    net: 18,
  });

    const updateStats = useCallback(() => {
    setStats((prev) => ({
      cpu: lerp(prev.cpu, randInt(30, 95)),
      ram: lerp(prev.ram, randInt(20, 60)),
      net: lerp(prev.net, randInt(5, 50)),
    }));
  }, []);

  useEffect(() => {
    // Tick every 2 seconds
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, [updateStats]);

  const cpuBar = buildBar(stats.cpu);
  const ramBar = buildBar(stats.ram);
  const netBar = buildBar(stats.net);

  return (
    <div
      className="text-xs font-[var(--font-mono)] select-none whitespace-nowrap flex items-center gap-3 lg:gap-4 px-2"
      aria-label="System monitor"
    >
      {}
      <span className="flex items-center gap-1">
        <span className="text-[var(--theme-text-muted)]">CPU</span>
        <span>
          <span className="text-[var(--theme-primary)]" style={{ transition: 'all 0.6s ease' }}>
            {cpuBar.filled}
          </span>
          <span className="text-[var(--theme-primary)] opacity-30">{cpuBar.empty}</span>
        </span>
        <span
          className="text-[var(--theme-primary)] w-[32px] text-right tabular-nums"
          style={{ transition: 'all 0.6s ease' }}
        >
          {stats.cpu}%
        </span>
      </span>

      {}
      <span className="flex items-center gap-1">
        <span className="text-[var(--theme-text-muted)]">RAM</span>
        <span>
          <span className="text-[var(--theme-primary)]" style={{ transition: 'all 0.6s ease' }}>
            {ramBar.filled}
          </span>
          <span className="text-[var(--theme-primary)] opacity-30">{ramBar.empty}</span>
        </span>
        <span
          className="text-[var(--theme-primary)] w-[32px] text-right tabular-nums"
          style={{ transition: 'all 0.6s ease' }}
        >
          {stats.ram}%
        </span>
      </span>

      {}
      <span className="flex items-center gap-1">
        <span className="text-[var(--theme-text-muted)]">NET</span>
        <span>
          <span className="text-[var(--theme-primary)]" style={{ transition: 'all 0.6s ease' }}>
            {netBar.filled}
          </span>
          <span className="text-[var(--theme-primary)] opacity-30">{netBar.empty}</span>
        </span>
        <span
          className="text-[var(--theme-primary)] w-[52px] text-right tabular-nums"
          style={{ transition: 'all 0.6s ease' }}
        >
          {stats.net}MB/s
        </span>
      </span>
    </div>
  );
}
