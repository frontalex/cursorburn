# Cursor Burn

Cursor Burn is a React component that creates an interactive fire effect following the mouse cursor. The effect features a unique elastic, gooey animation that makes the fire particles blend smoothly, creating a liquid-like appearance.

## Features

- Smooth particle animation with elastic behavior
- Real-time mouse tracking
- Customizable colors, sizes, and behaviors
- Responsive design
- TypeScript support
- Zero dependencies

## Installation

```bash
npm install cursorburn
# or
yarn add cursorburn
```

## Basic Usage

```jsx
import CursorBurn from 'cursorburn';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <CursorBurn
        colors={["orange", "red", "yellow"]}
        particleSpread={20}
        particleAngleSpread={60}
        particleUpwardForce={0.8}
      />
    </div>
  );
}
```

## Props

| Prop                | Type                | Default                       | Description                |
| ------------------- | ------------------- | ----------------------------- | -------------------------- |
| width               | number              | window.innerWidth * 2        | Canvas width               |
| height              | number              | window.innerHeight * 2       | Canvas height              |
| numParticles        | number              | 50                            | Number of particles        |
| colors              | string[]            | ["orange", "red", "yellow"] | Array of particle colors   |
| minParticleSize     | number              | 1                             | Minimum particle size      |
| maxParticleSize     | number              | 6                             | Maximum particle size      |
| minParticleSpeed    | number              | 2                             | Minimum particle speed     |
| maxParticleSpeed    | number              | 5                             | Maximum particle speed     |
| particleSpread      | number              | 10                            | Radius of particle spread  |
| particleAngleSpread | number              | 90                            | Angle spread in degrees    |
| particleUpwardForce | number              | 0.5                           | Upward force (0-1)         |
| radius              | number              | 12                            | Cursor radius              |
| cursorColor         | string              | "white"                       | Cursor color               |
| speed               | number              | 0.5                           | Animation speed            |
| maxIntensity        | number              | 3                             | Maximum intensity on click |
| decaySpeed          | number              | 0.1                           | Particle decay speed       |
| filterBlur          | number              | 7                             | Blur effect for gooey look |
| background          | string              | undefined                     | Background color           |
| className           | string              | undefined                     | Additional CSS class       |
| style               | React.CSSProperties | undefined                     | Additional CSS styles      |
| showSystemCursor    | boolean             | false                         | Show system cursor         |

## Examples

### Concentrated Flame

```jsx
<CursorBurn
  colors={["#ff4400", "#ff0000", "#ffbb00"]}
  numParticles={100}
  particleSpread={5}  // Smaller spread
  maxParticleSpeed={3}
  decaySpeed={0.2}    // Fast decay
  maxIntensity={4}
  growthTime={1}
/>
```

### Dispersed Effect

```jsx
<CursorBurn
  colors={["#ff8800", "#ff4400", "#ffcc00"]}
  numParticles={80}
  particleSpread={20}  // Larger spread
  maxParticleSpeed={6}
  decaySpeed={0.05}    // Slow decay
  maxIntensity={3}
  growthTime={2}
/>
```

### Inferno

```jsx
<CursorBurn
  colors={["#ff0000", "#ff4400", "#ff8800"]}
  particleSpread={10}
  particleAngleSpread={45}
  particleUpwardForce={1}
  numParticles={120}
  maxParticleSpeed={10}
  decaySpeed={0.12}
  maxIntensity={5}
/>
```

### Ghost Fire

```jsx
<CursorBurn
  colors={["#8800ff", "#aa00ff", "#cc88ff"]}
  particleSpread={35}
  particleAngleSpread={270}
  particleUpwardForce={0.2}
  filterBlur={12}
  decaySpeed={0.05}
  maxParticleSpeed={4}
/>
```

### Rainbow Flow

```jsx
<CursorBurn
  colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]}
  particleSpread={25}
  particleAngleSpread={120}
  particleUpwardForce={0.4}
  numParticles={80}
  filterBlur={8}
  decaySpeed={0.15}
/>
```

### Ice Storm

```jsx
<CursorBurn
  colors={["#ffffff", "#88ffff", "#0088ff"]}
  particleSpread={40}
  particleAngleSpread={180}
  particleUpwardForce={-0.2}
  numParticles={150}
  maxParticleSpeed={3}
  filterBlur={4}
  decaySpeed={0.18}
/>
```

### Vortex

```jsx
<CursorBurn
  colors={["#ff3300", "#ff9900", "#ffcc00"]}
  particleSpread={50}
  particleAngleSpread={360}
  particleUpwardForce={0}
  numParticles={200}
  maxParticleSpeed={15}
  decaySpeed={0.08}
  filterBlur={6}
  maxIntensity={4}
/>
```

### Cosmic Nebula

```jsx
<CursorBurn
  colors={["#ff00ff", "#00ffff", "#0066ff", "#9900ff"]}
  particleSpread={60}
  particleAngleSpread={360}
  particleUpwardForce={0.1}
  numParticles={150}
  maxParticleSpeed={2}
  decaySpeed={0.05}
  filterBlur={15}
  maxIntensity={3}
/>
```

### Matrix Rain

```jsx
<CursorBurn
  colors={["#00ff00", "#33ff33", "#66ff66"]}
  particleSpread={30}
  particleAngleSpread={30}
  particleUpwardForce={-1}
  numParticles={180}
  maxParticleSpeed={8}
  decaySpeed={0.15}
  filterBlur={3}
  maxIntensity={2}
/>
```

### Fireflies

```jsx
<CursorBurn
  colors={["#ffff00", "#aaff00", "#ffaa00"]}
  particleSpread={100}
  particleAngleSpread={360}
  particleUpwardForce={0.2}
  numParticles={50}
  maxParticleSpeed={3}
  decaySpeed={0.02}
  filterBlur={4}
  maxIntensity={2}
/>
```

### Lava Flow

```jsx
<CursorBurn
  colors={["#ff0000", "#ff6600", "#ff3300", "#ffcc00"]}
  particleSpread={40}
  particleAngleSpread={180}
  particleUpwardForce={0.3}
  numParticles={100}
  maxParticleSpeed={4}
  decaySpeed={0.06}
  filterBlur={12}
  maxIntensity={4}
/>
```

### Pixel Storm

```jsx
<CursorBurn
  colors={["#ff00ff", "#00ffff", "#ffff00", "#ff00aa", "#00ff00"]}
  particleSpread={70}
  particleAngleSpread={360}
  particleUpwardForce={0}
  numParticles={250}
  maxParticleSpeed={10}
  decaySpeed={0.2}
  filterBlur={2}
  maxIntensity={3}
/>
```

## License

MIT
