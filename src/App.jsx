import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import BootSequence from './components/BootSequence'
import CyberBackground from './components/CyberBackground'
import Terminal from './components/Terminal'
import Sidebar from './components/Sidebar'
import SystemMonitor from './components/SystemMonitor'
import CommandPalette from './components/CommandPalette'
import Neofetch from './components/Neofetch'
import MobileNav from './components/MobileNav'
import AIAssistant from './components/AIAssistant'
import { Menu, Monitor, ScanLine, Palette, Clock } from 'lucide-react'

// Lazy load content views
const About = lazy(() => import('./components/views/About'))
const Projects = lazy(() => import('./components/views/Projects'))
const Skills = lazy(() => import('./components/views/Skills'))
const Experience = lazy(() => import('./components/views/Experience'))
const Videos = lazy(() => import('./components/views/Videos'))
const Certificates = lazy(() => import('./components/views/Certificates'))
const Resume = lazy(() => import('./components/views/Resume'))
const Contact = lazy(() => import('./components/views/Contact'))
const Stats = lazy(() => import('./components/views/Stats'))

const THEMES = {
  green: { name: 'Matrix Green', color: '#00ffc6', key: 'green' },
  blue: { name: 'Blue Terminal', color: '#00aaff', key: 'blue' },
  amber: { name: 'Amber Retro', color: '#ffaa00', key: 'amber' },
  purple: { name: 'Purple Neon', color: '#bf5fff', key: 'purple' },
  white: { name: 'White Minimal', color: '#1a1a2e', key: 'white' },
}

function App() {
  // ─── Core State ───
  const [booted, setBooted] = useState(false)
  const [activeView, setActiveView] = useState('about')
  const [theme, setTheme] = useState('green')
  const [showMatrix, setShowMatrix] = useState(true)
  const [showCRT, setShowCRT] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [devMode, setDevMode] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState(null)
  const [showNeofetch, setShowNeofetch] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const terminalRef = useRef(null)
  const startTime = useRef(Date.now())

  // ─── Clock State ───
  const [clock, setClock] = useState('')

  useEffect(() => {
    const updateViewportMode = () => setIsMobile(window.innerWidth < 768)
    updateViewportMode()
    window.addEventListener('resize', updateViewportMode)
    return () => window.removeEventListener('resize', updateViewportMode)
  }, [])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-IN', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
      const day = now.toLocaleDateString('en-IN', { weekday: 'long' })
      const date = now.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
      setClock(`${time} IST | ${day}, ${date}`)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // ─── Mouse Tracking (for 3D background + dynamic lighting) ───
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })

      // Dynamic lighting: update CSS custom property for cursor glow position
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ─── Apply Theme ───
  useEffect(() => {
    if (theme === 'green') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  // ─── Keyboard Shortcuts ───
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + K: Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
      }
      // Ctrl + Shift + D: Developer Mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setDevMode(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // ─── Custom Cursor ───
  useEffect(() => {
    if (window.innerWidth < 768) return

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)

    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    document.body.appendChild(glow)

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX - 6}px`
      cursor.style.top = `${e.clientY - 6}px`
      glow.style.left = `${e.clientX - 20}px`
      glow.style.top = `${e.clientY - 20}px`
    }

    const addHover = () => cursor.classList.add('hovering')
    const removeHover = () => cursor.classList.remove('hovering')

    document.addEventListener('mousemove', moveCursor)

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .command-link, input, textarea, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Initial bind
    document.querySelectorAll('a, button, .command-link, input, textarea, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
      cursor.remove()
      glow.remove()
    }
  }, [booted])

  // ─── Command Execution Handler ───
  const handleCommand = useCallback((command) => {
    // Theme commands
    if (command.startsWith('theme:')) {
      const themeName = command.split(':')[1]
      if (THEMES[themeName]) {
        setTheme(themeName)
        return `Theme switched to ${THEMES[themeName].name}`
      }
      return `Available themes: ${Object.keys(THEMES).join(', ')}`
    }

    // Toggle commands
    if (command === 'matrix') {
      setShowMatrix(prev => !prev)
      return showMatrix ? '3D background disabled.' : '3D background enabled.'
    }
    if (command === 'crt') {
      setShowCRT(prev => !prev)
      return showCRT ? 'CRT effects disabled.' : 'CRT effects enabled.'
    }
    if (command === 'neofetch') {
      setShowNeofetch(true)
      return '__NEOFETCH__'
    }

    // Navigation commands
    const viewCommands = ['about', 'projects', 'skills', 'experience', 'videos', 'certs', 'resume', 'contact', 'stats']
    if (viewCommands.includes(command)) {
      setActiveView(command)
      return `Loading ${command}...`
    }

    return null
  }, [showMatrix, showCRT])

  // ─── Render Active View ───
  const renderActiveView = () => {
    const viewProps = { key: activeView }
    
    return (
      <Suspense fallback={
        <div className="flex items-center gap-2 py-4" style={{ color: 'var(--theme-primary)' }}>
          <span className="animate-pulse">Loading module</span>
          <span className="cursor-blink">▊</span>
        </div>
      }>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeView === 'about' && <About />}
            {activeView === 'projects' && <Projects />}
            {activeView === 'skills' && <Skills />}
            {activeView === 'experience' && <Experience />}
            {activeView === 'videos' && <Videos />}
            {activeView === 'certs' && <Certificates />}
            {activeView === 'resume' && <Resume />}
            {activeView === 'contact' && <Contact />}
            {activeView === 'stats' && <Stats />}
          </motion.div>
        </AnimatePresence>
        {showNeofetch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <Neofetch theme={THEMES[theme]?.name || 'Matrix Green'} />
          </motion.div>
        )}
      </Suspense>
    )
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 15, 0.9)',
            color: 'var(--theme-primary)',
            border: '1px solid var(--theme-border)',
            fontFamily: 'var(--font-mono)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />

      {}
      <AnimatePresence>
        {!booted && (
          <BootSequence onBootComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>

      {}
      {booted && (
        <CyberBackground
          visible={showMatrix && !isMobile}
          themeColor={THEMES[theme]?.color || '#00ffc6'}
          mousePosition={mousePosition}
        />
      )}

      {}
      {showCRT && <div className="crt-overlay" />}

      {}
      {booted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 w-full h-[100svh] md:h-[100dvh] flex flex-col items-center p-2 md:p-4"
        >
          {/* Terminal Window — takes all remaining space */}
          <div
            className={`glass-strong w-full flex-1 min-h-0 max-w-[1600px] rounded-xl md:rounded-2xl flex flex-col overflow-hidden border border-solid ${isMobile ? '' : 'border-glow-animated flicker'}`}
            style={{
              transform: isMobile
                ? 'none'
                : `perspective(1200px) rotateX(${mousePosition.y * 1.5}deg) rotateY(${mousePosition.x * 1.5}deg)`,
              transition: isMobile ? 'none' : 'transform 0.3s ease-out',
              boxShadow: `
                0 0 ${isMobile ? '16px' : '30px'} rgba(var(--theme-primary-rgb), 0.1),
                0 ${isMobile ? '12px 24px' : '25px 50px'} rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            {/* ─── Top Bar ─── */}
            <div className="flex items-center px-3 py-2 md:px-4 md:py-2.5 border-b flex-shrink-0"
                 style={{ borderColor: 'var(--theme-border)' }}>
              <div className="flex items-center gap-2 md:gap-3 mr-auto text-sm">
                <img
                  src="/assets/images/logo.png"
                  alt="PS"
                  className="w-5 h-5 rounded-full object-cover border"
                  style={{ borderColor: 'var(--theme-primary)' }}
                />
                <span className="hidden sm:inline">
                  <span className="prompt-user font-semibold">visitor</span>
                  <span className="prompt-separator">@</span>
                  <span className="prompt-user font-semibold">parikshat</span>
                  <span className="prompt-separator">:</span>
                  <span className="prompt-path">~/{activeView}</span>
                </span>
                <span className="sm:hidden text-xs" style={{ color: 'var(--theme-primary)' }}>
                  ~/{activeView}
                </span>
              </div>

              <div className="hidden lg:block">
                <SystemMonitor />
              </div>

              <div className="flex items-center gap-1 md:gap-2 ml-auto">
                <span className="hidden xl:block text-xs opacity-60 mr-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {clock}
                </span>

                <button
                  onClick={() => {
                    const themeKeys = Object.keys(THEMES)
                    const currentIdx = themeKeys.indexOf(theme)
                    const nextIdx = (currentIdx + 1) % themeKeys.length
                    setTheme(themeKeys[nextIdx])
                  }}
                  className="p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-all hover:bg-white/5"
                  title="Cycle Theme"
                >
                  <Palette size={16} style={{ color: 'var(--theme-primary)' }} />
                </button>

                <button
                  onClick={() => setShowCRT(prev => !prev)}
                  className={`p-1.5 rounded-lg transition-all hover:bg-white/5 ${showCRT ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  title="Toggle CRT"
                >
                  <ScanLine size={16} style={{ color: 'var(--theme-primary)' }} />
                </button>

                <button
                  onClick={() => setShowMatrix(prev => !prev)}
                  className={`p-1.5 rounded-lg transition-all hover:bg-white/5 ${showMatrix ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  title="Toggle 3D Background"
                >
                  <Monitor size={16} style={{ color: 'var(--theme-primary)' }} />
                </button>
              </div>
            </div>

            {/* ─── Body Area ─── */}
            <div className="flex-grow flex overflow-hidden">
              {/* Desktop Sidebar */}
              <div className="hidden md:block w-72 lg:w-80 border-r flex-shrink-0 overflow-y-auto"
                   style={{ borderColor: 'var(--theme-border)' }}>
                <Sidebar
                  onNavigate={(cmd) => {
                    setActiveView(cmd)
                    setShowNeofetch(false)
                  }}
                  activeView={activeView}
                />
              </div>

              {/* Terminal Area */}
              <div className="flex-grow flex flex-col overflow-hidden" ref={terminalRef}>
                <Terminal
                  onCommandExecute={handleCommand}
                  activeView={activeView}
                  contentView={renderActiveView()}
                />
              </div>
            </div>
          </div>

          {/* ─── Mobile Bottom Nav (in-flow, not fixed) ─── */}
          <div className="md:hidden w-full max-w-[1600px] flex-shrink-0 mt-2">
            <MobileNav
              onNavigate={(cmd) => {
                setActiveView(cmd)
                setShowNeofetch(false)
              }}
              activeView={activeView}
            />
          </div>
        </motion.div>
      )}

      {}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelect={(id) => {
          setActiveView(id)
          setShowNeofetch(false)
          setCommandPaletteOpen(false)
        }}
      />

      {}
      {booted && <AIAssistant onAction={handleCommand} />}

      {}
      {devMode && booted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed top-20 right-4 z-50 glass p-3 rounded-xl text-xs space-y-1"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--theme-primary)', minWidth: '200px' }}
        >
          <div className="font-bold mb-2 text-sm">🔧 Dev Mode</div>
          <div>React: v19</div>
          <div>Three.js: r160+</div>
          <div>Theme: {THEMES[theme]?.name}</div>
          <div>View: {activeView}</div>
          <div>Matrix BG: {showMatrix ? 'ON' : 'OFF'}</div>
          <div>CRT: {showCRT ? 'ON' : 'OFF'}</div>
          <div>Viewport: {typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : '-'}</div>
          <div>Uptime: {Math.floor((Date.now() - startTime.current) / 1000)}s</div>
          <div className="pt-1 opacity-50">Ctrl+Shift+D to close</div>
        </motion.div>
      )}
    </>
  )
}

export default App
