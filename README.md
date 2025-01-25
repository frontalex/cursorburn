# Elastic Fire React Component

Интерактивный React-компонент, создающий эффект упругого огня, следующего за курсором мыши. При нажатии левой кнопки мыши огонь усиливается, при отпускании - плавно затухает.

## Установка

```bash
npm install elastic-fire
```

## Использование

```tsx
import React from 'react';
import { ElasticFire } from 'elastic-fire';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <ElasticFire
        // Все параметры опциональны
        colors={["orange", "red", "yellow"]}
        numParticles={50}
        radius={12}
      />
    </div>
  );
};
```

## Параметры

### Размеры
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| width | number | window.innerWidth * 2 | Ширина канваса |
| height | number | window.innerHeight * 2 | Высота канваса |

### Настройки частиц
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| numParticles | number | 50 | Количество частиц |
| colors | string[] | ["orange", "red", "yellow"] | Массив цветов частиц |
| minParticleSize | number | 1 | Минимальный размер частицы |
| maxParticleSize | number | 6 | Максимальный размер частицы |
| minParticleSpeed | number | 2 | Минимальная скорость частицы |
| maxParticleSpeed | number | 5 | Максимальная скорость частицы |
| minParticleLife | number | 20 | Минимальное время жизни частицы |
| maxParticleLife | number | 30 | Максимальное время жизни частицы |
| particleDecaySpeed | number | 0.075 | Скорость уменьшения размера частиц |
| particleSpread | number | 10 | Радиус разброса частиц от центра |

### Настройки курсора
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| radius | number | 12 | Радиус курсора |
| cursorColor | string | "white" | Цвет курсора |

### Настройки анимации
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| speed | number | 0.5 | Скорость следования за курсором |
| maxIntensity | number | 3 | Максимальная интенсивность при нажатии |
| growthTime | number | 1.5 | Время нарастания эффекта (секунды) |
| decayMultiplier | number | 20 | Множитель скорости затухания |
| decaySpeed | number | 0.1 | Скорость затухания (0-1) |

### Настройки фильтра
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| filterBlur | number | 7 | Размытие SVG-фильтра |
| filterMatrix | string | "1 0 0 0 0..." | Матрица цветов для SVG-фильтра |

### Стили
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| background | string | undefined | Цвет фона |
| className | string | undefined | CSS-класс |
| style | CSSProperties | undefined | Дополнительные стили |

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
