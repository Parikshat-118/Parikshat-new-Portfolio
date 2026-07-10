import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Matrix Rain Constants
// ---------------------------------------------------------------------------
const KATAKANA = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS = '0123456789';
const CHARACTERS = KATAKANA + LATIN + NUMS;

const ERROR_SNIPPETS = [
  'ERR_SYS_FAULT',
  'OVERFLOW_ERROR',
  'NULL_POINTER',
  'CONNECTION_REFUSED',
  '0x00000000',
  'ACCESS_DENIED',
  'SEGMENTATION_FAULT'
];

export default function CyberBackground({
  visible = true,
  themeColor = '#00ffc6',
  // mousePosition is ignored for 2D matrix, but kept for prop compatibility
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set exact window size
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    
    // Array to track the Y coordinate of each column
    let drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at random negative heights so they don't all fall at once
    }

    let animationFrameId;

    const draw = () => {
      // Semi-transparent black to create trailing effect, exactly like original HTML
      ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = themeColor;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const text = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [visible, themeColor]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 0.15
        }}
      />
    </div>
  );
}
