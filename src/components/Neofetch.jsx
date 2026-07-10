import { useState, useEffect, useRef } from 'react';

const ASCII_LOGO = [
  '    ██████╗  ██████╗ ███████╗',
  '    ██╔══██╗██╔═══██╗██╔════╝',
  '    ██████╔╝██║   ██║███████╗',
  '    ██╔═══╝ ██║   ██║╚════██║',
  '    ██║     ╚██████╔╝███████║',
  '    ╚═╝      ╚═════╝ ╚══════╝',
  '     Portfolio  v2.0',
];

const PAGE_LOAD_TIME = Date.now();

function formatUptime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} min${minutes !== 1 ? 's' : ''}`);
  parts.push(`${seconds} sec${seconds !== 1 ? 's' : ''}`);

  return parts.join(', ');
}

export default function Neofetch({ theme = 'Matrix Green' }) {
  const [uptime, setUptime]         = useState('0 secs');
  const [resolution, setResolution] = useState('');

    useEffect(() => {
    const tick = () => setUptime(formatUptime(Date.now() - PAGE_LOAD_TIME));
    tick(); // immediate first render
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

    useEffect(() => {
    const updateRes = () => setResolution(`${window.innerWidth}x${window.innerHeight}`);
    updateRes();
    window.addEventListener('resize', updateRes);
    return () => window.removeEventListener('resize', updateRes);
  }, []);

    const infoLines = [
    { key: '',           value: 'visitor@parikshat',              isBold: true },
    { key: '',           value: '-'.repeat(22),                    isDivider: true },
    { key: 'OS',         value: "Parikshat's Portfolio" },
    { key: 'Host',       value: 'Parikshat Singh' },
    { key: 'Kernel',     value: 'React 19 + Vite' },
    { key: 'Uptime',     value: uptime },
    { key: 'Shell',      value: 'portfolio-terminal 1.0' },
    { key: 'Resolution', value: resolution },
    { key: 'DE',         value: 'Three.js Cyber' },
    { key: 'Theme',      value: theme },
    { key: 'Terminal',   value: 'Portfolio Terminal' },
    { key: 'CPU',        value: 'Curiosity Processor @ ∞GHz' },
    { key: 'Memory',     value: 'Unlimited Ideas' },
    { key: 'GPU',        value: 'Creativity Engine v3.0' },
  ];

    const swatchColors = [
    '#1a1a2e', '#e74c3c', '#2ecc71', '#f1c40f',
    '#3498db', '#9b59b6', '#1abc9c', '#ecf0f1',
  ];

  return (
    <div className="font-[var(--font-mono)] text-sm leading-relaxed select-text">
      <div className="flex gap-4 lg:gap-6">

        {}
        <div className="shrink-0 hidden sm:block">
          <pre className="text-[var(--theme-primary)] text-glow text-[0.65rem] lg:text-xs leading-tight whitespace-pre">
            {ASCII_LOGO.join('\n')}
          </pre>

          {}
          <div className="flex gap-0 mt-3 ml-4">
            {swatchColors.map((color) => (
              <span
                key={color}
                className="inline-block w-3 h-3"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {}
        <div className="flex flex-col gap-0">
          {infoLines.map((line, idx) => {
            // Username header line
            if (line.isBold) {
              return (
                <span key={idx} className="text-[var(--theme-primary)] font-bold text-glow">
                  {line.value}
                </span>
              );
            }

            // Divider
            if (line.isDivider) {
              return (
                <span key={idx} className="text-[var(--theme-text-muted)]">
                  {line.value}
                </span>
              );
            }

            // Key: Value pair
            return (
              <span key={idx}>
                <span className="text-[var(--theme-primary)] font-bold">{line.key}</span>
                <span className="text-[var(--theme-text-muted)]">: </span>
                <span className="text-[var(--theme-text)]">{line.value}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
