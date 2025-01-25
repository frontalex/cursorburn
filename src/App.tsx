import React, { useState } from 'react';
import { ElasticFire } from './ElasticFire';
import { MemoryMonitor } from './MemoryMonitor';
import './App.css';

interface Preset {
  name: string;
  colors: string[];
  particleSpread: number;
  particleAngleSpread: number;
  particleUpwardForce: number;
  decaySpeed: number;
  numParticles?: number;
  maxParticleSpeed?: number;
  filterBlur?: number;
  maxIntensity?: number;
  showSystemCursor?: boolean;
  cursorColor?: string;
}

const presets: Record<string, Preset> = {
  classic: {
    name: "Classic Fire",
    colors: ["orange", "red", "yellow"],
    particleSpread: 15,
    particleAngleSpread: 60,
    particleUpwardForce: 0.8,
    decaySpeed: 0.1,
    showSystemCursor: false,
    cursorColor: "white"
  },
  plasma: {
    name: "Blue Plasma",
    colors: ["#00ffff", "#0088ff", "#0000ff"],
    particleSpread: 25,
    particleAngleSpread: 180,
    particleUpwardForce: 0.3,
    filterBlur: 9,
    decaySpeed: 0.15,
    showSystemCursor: true,
    cursorColor: "#00ffff"
  },
  magic: {
    name: "Magic Sparkles",
    colors: ["#ff00ff", "#ff88ff", "#ffff00"],
    particleSpread: 30,
    particleAngleSpread: 360,
    particleUpwardForce: 0.1,
    numParticles: 100,
    maxParticleSpeed: 8,
    decaySpeed: 0.2,
    cursorColor: "#ff00ff"
  },
  energy: {
    name: "Green Energy",
    colors: ["#00ff00", "#88ff00", "#00ff88"],
    particleSpread: 20,
    particleAngleSpread: 90,
    particleUpwardForce: 0.6,
    maxIntensity: 4,
    filterBlur: 5,
    decaySpeed: 0.08,
    cursorColor: "#00ff00"
  },
  // Новые пресеты
  inferno: {
    name: "Inferno",
    colors: ["#ff0000", "#ff4400", "#ff8800"],
    particleSpread: 10,
    particleAngleSpread: 45,
    particleUpwardForce: 1,
    numParticles: 120,
    maxParticleSpeed: 10,
    decaySpeed: 0.12,
    maxIntensity: 5,
    cursorColor: "white"
  },
  ghost: {
    name: "Ghost Fire",
    colors: ["#8800ff", "#aa00ff", "#cc88ff"],
    particleSpread: 35,
    particleAngleSpread: 270,
    particleUpwardForce: 0.2,
    filterBlur: 12,
    decaySpeed: 0.05,
    maxParticleSpeed: 4,
    cursorColor: "black"
  },
  rainbow: {
    name: "Rainbow Flow",
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    particleSpread: 25,
    particleAngleSpread: 120,
    particleUpwardForce: 0.4,
    numParticles: 80,
    filterBlur: 8,
    decaySpeed: 0.15,
    cursorColor: "#ffffff"
  },
  ice: {
    name: "Ice Storm",
    colors: ["#ffffff", "#88ffff", "#0088ff"],
    particleSpread: 40,
    particleAngleSpread: 180,
    particleUpwardForce: -0.2, // Частицы падают вниз
    numParticles: 150,
    maxParticleSpeed: 3,
    filterBlur: 4,
    decaySpeed: 0.18,
    cursorColor: "#88ffff"
  },
  vortex: {
    name: "Vortex",
    colors: ["#ff3300", "#ff9900", "#ffcc00"],
    particleSpread: 50,
    particleAngleSpread: 360,
    particleUpwardForce: 0,
    numParticles: 200,
    maxParticleSpeed: 15,
    decaySpeed: 0.08,
    filterBlur: 6,
    maxIntensity: 4,
    cursorColor: "#ff3300"
  },
  nebula: {
    name: "Cosmic Nebula",
    colors: ["#ff00ff", "#00ffff", "#0066ff", "#9900ff"],
    particleSpread: 60,
    particleAngleSpread: 360,
    particleUpwardForce: 0.1,
    numParticles: 150,
    maxParticleSpeed: 2,
    decaySpeed: 0.05,
    filterBlur: 15,
    maxIntensity: 3,
    cursorColor: "#ff00ff"
  },
  matrix: {
    name: "Matrix Rain",
    colors: ["#00ff00", "#33ff33", "#66ff66"],
    particleSpread: 30,
    particleAngleSpread: 30,
    particleUpwardForce: -1, // Падает вниз
    numParticles: 180,
    maxParticleSpeed: 8,
    decaySpeed: 0.15,
    filterBlur: 3,
    maxIntensity: 2,
    cursorColor: "#000000"
  },
  fireflies: {
    name: "Fireflies",
    colors: ["#ffffff", "#ffffdd", "#ffffaa"],
    particleSpread: 100,
    particleAngleSpread: 360,
    particleUpwardForce: 0.2,
    numParticles: 40,
    maxParticleSpeed: 2,
    decaySpeed: 0.02,
    filterBlur: 4,
    maxIntensity: 2,
    cursorColor: "#ffffff"
  },
  lava: {
    name: "Lava Flow",
    colors: ["#ff0000", "#ff6600", "#ff3300", "#ffcc00"],
    particleSpread: 40,
    particleAngleSpread: 180,
    particleUpwardForce: 0.3,
    numParticles: 100,
    maxParticleSpeed: 4,
    decaySpeed: 0.06,
    filterBlur: 12,
    maxIntensity: 4,
    cursorColor: "#ff3300"
  },
  pixelStorm: {
    name: "Pixel Storm",
    colors: ["#ff00ff", "#00ffff", "#ffff00", "#ff00aa", "#00ff00"],
    particleSpread: 70,
    particleAngleSpread: 360,
    particleUpwardForce: 0,
    numParticles: 250,
    maxParticleSpeed: 10,
    decaySpeed: 0.2,
    filterBlur: 2, // Минимальное размытие для пиксельного эффекта
    maxIntensity: 3,
    cursorColor: "#ffffff"
  }
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'relative' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  header: {
    position: 'absolute' as const,
    top: '20px',
    left: 0,
    right: 0,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '0 20px',
  },
  title: {
    color: 'white',
    textAlign: 'center' as const,
    fontSize: 'clamp(24px, 5vw, 36px)',
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)',
    margin: '0 0 10px 0',
    fontWeight: 'bold' as const,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center' as const,
    fontSize: 'clamp(14px, 3vw, 18px)',
    maxWidth: '800px',
    lineHeight: 1.5,
    margin: '0 0 10px 0',
  },
  currentPreset: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 'clamp(12px, 2.5vw, 16px)',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    marginTop: '20px',
  },
  buttonsContainer: {
    position: 'absolute' as const,
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'clamp(5px, 1vw, 10px)',
    justifyContent: 'center',
    maxWidth: '90vw',
    width: '100%',
    padding: '20px',
    zIndex: 3,
  }
};

const App: React.FC = () => {
  const [currentPreset, setCurrentPreset] = useState('classic');
  const [showSystemCursor, setShowSystemCursor] = useState(false);

  const currentPresetConfig = {
    ...presets[currentPreset as keyof typeof presets],
    showSystemCursor: showSystemCursor
  };

  const containerStyle = {
    ...styles.container,
    cursor: showSystemCursor ? 'default' : 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Elastic Fire
        </h1>
        <p style={styles.subtitle}>
          An interactive particle effect that follows your cursor with smooth, elastic animations.
          Experiment with different presets and watch as particles create mesmerizing patterns!
        </p>
        <div style={styles.currentPreset}>
          {presets[currentPreset as keyof typeof presets].name}
          {showSystemCursor ? ' (System Cursor)' : ' (Custom Cursor)'}
        </div>
      </div>

      <button
        onClick={() => setShowSystemCursor(prev => !prev)}
        className="toggleButton"
      >
        <div className={`checkbox ${showSystemCursor ? 'checked' : ''}`} />
        System Cursor
      </button>

      <a
        href="https://github.com/yourusername/elastic-fire"
        target="_blank"
        rel="noopener noreferrer"
        className="githubLink"
      >
        <svg height="20" width="20" viewBox="0 0 16 16" fill="white">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        View on GitHub
      </a>

      <ElasticFire
        {...currentPresetConfig}
      />

      <div style={styles.buttonsContainer}>
        {Object.keys(presets).map((key) => {
          const preset = presets[key as keyof typeof presets];
          return (
            <button
              key={key}
              onClick={() => setCurrentPreset(key)}
              className={`button ${currentPreset === key ? 'active' : ''}`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
      <MemoryMonitor />
    </div>
  );
};

export default App;
