import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Boot log lines with realistic timestamps ───────────────────────────────
const BOOT_LINES = [
  { time: "0.000", text: "Booting Portfolio..." },
  { time: "0.200", text: "Loading kernel modules..." },
  { time: "0.400", text: "Initializing React v19..." },
  { time: "0.600", text: "Loading Three.js renderer..." },
  { time: "0.800", text: "Connecting AI modules..." },
  { time: "1.000", text: "Mounting file system..." },
  { time: "1.200", text: "Loading projects database..." },
  { time: "1.400", text: "Initializing terminal interface..." },
  { time: "1.600", text: "Configuring network stack..." },
  { time: "1.800", text: "Starting matrix background service..." },
  { time: "2.000", text: "Authenticating visitor..." },
  { time: "2.200", text: "" },
  { time: "2.500", text: "Initiating decryption sequence..." },
  { time: "2.800", text: "0x7F 0x2A 0x8B 0x9C 0xFF >> DECRYPTING PAYLOAD..." },
  { time: "3.000", text: "0x11 0x00 0xA4 0xB2 0x01 >> BYPASSING FIREWALL..." },
  { time: "3.200", text: "0x55 0x99 0x22 0x11 0x00 >> INJECTING UI KERNEL..." },
  { time: "3.600", text: "DECRYPTION COMPLETE. SYSTEM UNLOCKED." },
  { time: "3.800", text: "███████████████████████████████████ 100%" },
  { time: "4.000", text: "" },
  { time: "4.200", text: "ACCESS GRANTED.", isHighlight: true },
  { time: "4.400", text: "Welcome, visitor." },
  { time: "4.600", text: "" },
  { time: "4.800", text: "Starting terminal session..." },
];

// Header block shown before timestamped lines
const HEADER_LINES = ["PARIKSHAT'S PORTFOLIO", "=====================", ""];

function BootSequence({ onBootComplete }) {
  // Index tracks how many lines have been revealed so far
  const [lineIndex, setLineIndex] = useState(0);
  // Header prints first, then boot lines
  const [headerDone, setHeaderDone] = useState(false);
  // Controls the exit animation
  const [isExiting, setIsExiting] = useState(false);

  // Ref to auto-scroll the log container
  const logRef = useRef(null);

  // Total lines across both header and boot log
  const totalLines = HEADER_LINES.length + BOOT_LINES.length;

  // ── Reveal header lines one by one ──────────────────────────────────────
  useEffect(() => {
    if (headerDone) return;

    if (lineIndex >= HEADER_LINES.length) {
      // Header fully printed – switch to boot lines
      setHeaderDone(true);
      setLineIndex(0);
      return;
    }

    // Slightly faster cadence for the header (80ms)
    const timer = setTimeout(() => {
      setLineIndex((prev) => prev + 1);
    }, 80);

    return () => clearTimeout(timer);
  }, [lineIndex, headerDone]);

  // ── Reveal boot-log lines one by one ────────────────────────────────────
  useEffect(() => {
    if (!headerDone) return;
    if (lineIndex >= BOOT_LINES.length) return;

    // Vary timing for authenticity: empty / progress lines are faster
    const currentLine = BOOT_LINES[lineIndex];
    let delay;
    if (currentLine.text === "") {
      delay = 60; // blank lines flash by
    } else if (currentLine.text.includes("███")) {
      delay = 200; // progress bar gets a dramatic pause
    } else if (currentLine.isHighlight) {
      delay = 250; // ACCESS GRANTED lingers a beat
    } else {
      // Semi-random between 80–160ms for a natural feel
      delay = 80 + Math.random() * 80;
    }

    const timer = setTimeout(() => {
      setLineIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [lineIndex, headerDone]);

  // ── Trigger exit once all boot lines are printed ────────────────────────
  useEffect(() => {
    if (!headerDone) return;
    if (lineIndex < BOOT_LINES.length) return;

    // Wait 800ms after the last line, then begin exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 800);

    return () => clearTimeout(exitTimer);
  }, [lineIndex, headerDone]);

  // Callback once the exit animation finishes
  const handleExitComplete = useCallback(() => {
    onBootComplete?.();
  }, [onBootComplete]);

  // ── Auto-scroll to newest line ──────────────────────────────────────────
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lineIndex, headerDone]);

  // ── Progress percentage (based on boot lines only) ─────────────────────
  const progress = headerDone
    ? Math.min((lineIndex / BOOT_LINES.length) * 100, 100)
    : 0;

  // ── Build the visible lines array ──────────────────────────────────────
  const visibleHeader = HEADER_LINES.slice(
    0,
    headerDone ? HEADER_LINES.length : lineIndex
  );
  const visibleBoot = headerDone ? BOOT_LINES.slice(0, lineIndex) : [];
  
  // Determine if glitch effect should be active
  // The user found the colorful RGB glitch "cringe", so we remove it.
  const isSequenceComplete = headerDone && lineIndex >= BOOT_LINES.length;
  const glitchClass = "";

  // The sleek, simple graphic overlay that appears at the very end
  const ScreenBreakGraphic = () => (
    <motion.div 
      className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: [0, 1, 1], scale: [0.95, 1, 1] }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center p-8 border border-[#00ffc6] bg-[#00ffc6]/5 shadow-[0_0_30px_rgba(0,255,198,0.15)] rounded-sm">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#00ffc6] tracking-[0.2em] text-center uppercase drop-shadow-[0_0_8px_rgba(0,255,198,0.6)]">
          System Unlocked
        </h1>
        <p className="mt-3 text-[#00ffc6] text-sm sm:text-lg tracking-[0.5em] font-medium uppercase opacity-90">
          Access Granted
        </p>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={glitchClass}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            width: "100%",
            height: "100dvh",
            backgroundColor: "#0a0a0f",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'JetBrains Mono', monospace",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          {}
          <div
            ref={logRef}
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "1.5rem 1rem",
              scrollbarWidth: "none",
            }}
            className="boot-log-scroll"
          >
            {}
            {visibleHeader.map((line, i) => (
              <div
                key={`header-${i}`}
                style={{
                  color: "#00ffc6",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  minHeight: "1.4em",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {line}
              </div>
            ))}

            {}
            {visibleBoot.map((entry, i) => (
              <div
                key={`boot-${i}`}
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  minHeight: "1.4em",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  color: entry.isHighlight ? "#00ffc6" : "#b0b0b0",
                  fontWeight: entry.isHighlight ? 700 : 400,
                  textShadow: entry.isHighlight
                    ? "0 0 8px rgba(0, 255, 198, 0.6)"
                    : "none",
                }}
              >
                {entry.text === "" ? (
                  // Render blank line (spacer)
                  "\u00A0"
                ) : (
                  <>
                    <span style={{ color: "#555" }}>[</span>
                    <span style={{ color: "#888" }}>
                      {"  "}
                      {entry.time}
                    </span>
                    <span style={{ color: "#555" }}>]</span>{" "}
                    <span>{entry.text}</span>
                  </>
                )}
              </div>
            ))}

            {}
            {!isExiting && (
              <span
                style={{
                  display: "inline-block",
                  width: "0.6em",
                  height: "1.1em",
                  backgroundColor: "#00ffc6",
                  verticalAlign: "text-bottom",
                  animation: "cursorBlink 1s step-end infinite",
                }}
              />
            )}
          </div>

          {}
          {isSequenceComplete && <ScreenBreakGraphic />}

          {}
          <div
            style={{
              height: "3px",
              width: "100%",
              backgroundColor: "#1a1a2e",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                backgroundColor: "#00ffc6",
                boxShadow: "0 0 10px rgba(0, 255, 198, 0.5)",
                width: `${progress}%`,
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>

          {}
          <style>{`
            @keyframes cursorBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .boot-log-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BootSequence;
