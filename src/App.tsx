import React from 'react';
import { ElasticFire } from './ElasticFire';
import { MemoryMonitor } from './MemoryMonitor';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'black',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'relative' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  title: {
    color: 'white',
    textAlign: 'center' as const,
    fontFamily: 'Arial',
    position: 'absolute' as const,
    top: '20px',
    left: 0,
    right: 0,
    zIndex: 2,
    pointerEvents: 'none' as const,
    fontSize: '24px',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  }
};

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Move your mouse around!
      </h1>
      <ElasticFire
        numParticles={50}
        colors={["orange", "red", "yellow"]}
        radius={12}
        speed={0.5}
        particleSpread={20}
        particleAngleSpread={60}
        particleUpwardForce={0.8}
        decaySpeed={0.1}
        maxParticleSpeed={6}

      />
      <MemoryMonitor />
    </div>
  );
};

export default App;
