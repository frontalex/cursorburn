# Elastic Fire Effect | Эффект Упругого Огня

[English](#english) | [Русский](#russian)

## English

### Description
Elastic Fire is a React component that creates an interactive fire effect following the mouse cursor. The effect features a unique elastic, gooey animation that makes the fire particles blend smoothly, creating a liquid-like appearance.

### Features
- Smooth particle animation with elastic behavior
- Real-time mouse tracking
- Customizable colors, sizes, and behaviors
- Responsive design
- TypeScript support
- Zero dependencies

### Installation
```bash
npm install elastic-fire
# or
yarn add elastic-fire
```

### Basic Usage
```jsx
import { ElasticFire } from 'elastic-fire';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <ElasticFire
        colors={["orange", "red", "yellow"]}
        particleSpread={20}
        particleAngleSpread={60}
        particleUpwardForce={0.8}
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `window.innerWidth * 2` | Canvas width |
| `height` | `number` | `window.innerHeight * 2` | Canvas height |
| `numParticles` | `number` | `50` | Number of particles |
| `colors` | `string[]` | `["orange", "red", "yellow"]` | Array of particle colors |
| `minParticleSize` | `number` | `1` | Minimum particle size |
| `maxParticleSize` | `number` | `6` | Maximum particle size |
| `minParticleSpeed` | `number` | `2` | Minimum particle speed |
| `maxParticleSpeed` | `number` | `5` | Maximum particle speed |
| `particleSpread` | `number` | `10` | Radius of particle spread |
| `particleAngleSpread` | `number` | `90` | Angle spread in degrees |
| `particleUpwardForce` | `number` | `0.5` | Upward force (0-1) |
| `radius` | `number` | `12` | Cursor radius |
| `cursorColor` | `string` | `"white"` | Cursor color |
| `speed` | `number` | `0.5` | Animation speed |
| `maxIntensity` | `number` | `3` | Maximum intensity on click |
| `decaySpeed` | `number` | `0.1` | Particle decay speed |
| `filterBlur` | `number` | `7` | Goo effect blur amount |
| `background` | `string` | `undefined` | Background color |
| `className` | `string` | `undefined` | Additional CSS class |
| `style` | `React.CSSProperties` | `undefined` | Additional CSS styles |
| `showSystemCursor` | `boolean` | `false` | Show system cursor |

---

## Russian

### Описание
Elastic Fire - это React-компонент, создающий интерактивный эффект огня, следующий за курсором мыши. Эффект обладает уникальной упругой, желеобразной анимацией, которая заставляет частицы огня плавно сливаться, создавая подобие жидкости.

### Особенности
- Плавная анимация частиц с эластичным поведением
- Отслеживание движения мыши в реальном времени
- Настраиваемые цвета, размеры и поведение
- Адаптивный дизайн
- Поддержка TypeScript
- Нет зависимостей

### Установка
```bash
npm install elastic-fire
# или
yarn add elastic-fire
```

### Базовое использование
```jsx
import { ElasticFire } from 'elastic-fire';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <ElasticFire
        colors={["orange", "red", "yellow"]}
        particleSpread={20}
        particleAngleSpread={60}
        particleUpwardForce={0.8}
      />
    </div>
  );
}
```

### Пропсы

| Пропс | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `width` | `number` | `window.innerWidth * 2` | Ширина холста |
| `height` | `number` | `window.innerHeight * 2` | Высота холста |
| `numParticles` | `number` | `50` | Количество частиц |
| `colors` | `string[]` | `["orange", "red", "yellow"]` | Массив цветов частиц |
| `minParticleSize` | `number` | `1` | Минимальный размер частиц |
| `maxParticleSize` | `number` | `6` | Максимальный размер частиц |
| `minParticleSpeed` | `number` | `2` | Минимальная скорость частиц |
| `maxParticleSpeed` | `number` | `5` | Максимальная скорость частиц |
| `particleSpread` | `number` | `10` | Радиус разброса частиц |
| `particleAngleSpread` | `number` | `90` | Угол разброса в градусах |
| `particleUpwardForce` | `number` | `0.5` | Сила движения вверх (0-1) |
| `radius` | `number` | `12` | Радиус курсора |
| `cursorColor` | `string` | `"white"` | Цвет курсора |
| `speed` | `number` | `0.5` | Скорость анимации |
| `maxIntensity` | `number` | `3` | Максимальная интенсивность при клике |
| `decaySpeed` | `number` | `0.1` | Скорость затухания частиц |
| `filterBlur` | `number` | `7` | Размытие эффекта желе |
| `background` | `string` | `undefined` | Цвет фона |
| `className` | `string` | `undefined` | Дополнительный CSS класс |
| `style` | `React.CSSProperties` | `undefined` | Дополнительные CSS стили |
| `showSystemCursor` | `boolean` | `false` | Показывать системный курсор |

## Примеры

### Концентрированное пламя
```tsx
<ElasticFire
  colors={["#ff4400", "#ff0000", "#ffbb00"]}
  numParticles={100}
  particleSpread={5}  // Меньший разброс частиц
  maxParticleSpeed={3}
  decaySpeed={0.2}    // Быстрое затухание
  maxIntensity={4}
  growthTime={1}
/>
```

### Рассеянный эффект
```tsx
<ElasticFire
  colors={["#ff8800", "#ff4400", "#ffcc00"]}
  numParticles={80}
  particleSpread={20}  // Больший разброс частиц
  maxParticleSpeed={6}
  decaySpeed={0.05}    // Медленное затухание
  maxIntensity={3}
  growthTime={2}
/>
```

### Inferno | Адское пламя
```jsx
<ElasticFire
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

### Ghost Fire | Призрачный огонь
```jsx
<ElasticFire
  colors={["#8800ff", "#aa00ff", "#cc88ff"]}
  particleSpread={35}
  particleAngleSpread={270}
  particleUpwardForce={0.2}
  filterBlur={12}
  decaySpeed={0.05}
  maxParticleSpeed={4}
/>
```

### Rainbow Flow | Радужный поток
```jsx
<ElasticFire
  colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]}
  particleSpread={25}
  particleAngleSpread={120}
  particleUpwardForce={0.4}
  numParticles={80}
  filterBlur={8}
  decaySpeed={0.15}
/>
```

### Ice Storm | Ледяной шторм
```jsx
<ElasticFire
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

### Vortex | Вихрь
```jsx
<ElasticFire
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

### Cosmic Nebula | Космическая туманность
```jsx
<ElasticFire
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

### Matrix Rain | Матричный дождь
```jsx
<ElasticFire
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

### Fireflies | Светлячки
```jsx
<ElasticFire
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

### Lava Flow | Поток лавы
```jsx
<ElasticFire
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

### Pixel Storm | Пиксельный шторм
```jsx
<ElasticFire
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

## Особенности
- Плавная анимация с использованием RequestAnimationFrame
- Оптимизированная производительность
- Настраиваемые параметры частиц и анимации
- Поддержка мобильных устройств (touch events)
- Автоматическая очистка ресурсов
- TypeScript поддержка
- Нулевые зависимости

## Производительность
- Компонент использует оптимизированный рендеринг на canvas
- Автоматическая очистка памяти при размонтировании
- Эффективное управление частицами через пулинг
- Минимальное использование DOM-элементов

## Лицензия
MIT

## Examples | Примеры

### Classic Fire | Классический огонь
```jsx
<ElasticFire
  colors={["orange", "red", "yellow"]}
  particleSpread={15}
  particleAngleSpread={60}
  particleUpwardForce={0.8}
  decaySpeed={0.1}
/>
```

### Blue Plasma | Синяя плазма
```jsx
<ElasticFire
  colors={["#00ffff", "#0088ff", "#0000ff"]}
  particleSpread={25}
  particleAngleSpread={180}
  particleUpwardForce={0.3}
  filterBlur={9}
  decaySpeed={0.15}
/>
```

### Magic Sparkles | Волшебные искры
```jsx
<ElasticFire
  colors={["#ff00ff", "#ff88ff", "#ffff00"]}
  particleSpread={30}
  particleAngleSpread={360}
  particleUpwardForce={0.1}
  numParticles={100}
  maxParticleSpeed={8}
  decaySpeed={0.2}
/>
```

### Green Energy | Зелёная энергия
```jsx
<ElasticFire
  colors={["#00ff00", "#88ff00", "#00ff88"]}
  particleSpread={20}
  particleAngleSpread={90}
  particleUpwardForce={0.6}
  maxIntensity={4}
  filterBlur={5}
  decaySpeed={0.08}
/>
```
