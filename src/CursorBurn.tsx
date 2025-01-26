import React, { useEffect, useRef } from 'react';

export interface CursorBurnProps {
  // Размеры
  width?: number;
  height?: number;

  // Настройки частиц
  numParticles?: number;
  colors?: string[];
  minParticleSize?: number;
  maxParticleSize?: number;
  minParticleSpeed?: number;
  maxParticleSpeed?: number;
  minParticleLife?: number;
  maxParticleLife?: number;
  particleDecaySpeed?: number;
  particleSpread?: number; // Радиус разброса частиц от центра
  particleAngleSpread?: number; // Угол разброса частиц в градусах (0-360)
  particleUpwardForce?: number; // Сила направления вверх (0-1)

  // Настройки курсора
  radius?: number;
  cursorColor?: string;
  showSystemCursor?: boolean; // Показывать ли системный курсор

  // Настройки анимации
  speed?: number;
  maxIntensity?: number;
  growthTime?: number;
  decayMultiplier?: number;
  decaySpeed?: number; // Скорость затухания (0-1)

  // Настройки фильтра
  filterBlur?: number;
  filterMatrix?: string;

  // Стили
  background?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Easing functions
const easing = {
  // Медленное нарастание (квадратичное)
  easeOut: (t: number) => {
    return t * (2 - t);
  },
  // Экспоненциальное затухание
  easeInExpo: (t: number) => {
    return t === 0 ? 0 : Math.pow(2, 20 * (t - 1));
  }
};

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  canvas: {
    cursor: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    WebkitFilter: 'url("#goo")',
    filter: 'url("#goo")',
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    WebkitTouchCallout: 'none' as const,
    pointerEvents: 'none' as const,
  },
  svg: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    pointerEvents: 'none' as const,
    opacity: 0
  }
};

function Particle(this: any, pos: { x: number; y: number }, config: {
  colors: string[];
  minSize: number;
  maxSize: number;
  minSpeed: number;
  maxSpeed: number;
  minLife: number;
  maxLife: number;
  intensity: number;
  spread: number;
  angleSpread: number;
  upwardForce: number;
}) {
  // Вычисляем базовый угол (вверх = -90 градусов)
  const baseAngle = -90 * (Math.PI / 180);
  // Добавляем случайное отклонение в пределах angleSpread
  const angleVariation = (Math.random() - 0.5) * config.angleSpread * (Math.PI / 180);
  const angle = baseAngle + angleVariation;

  const spread = Math.random() * config.spread;

  this.x = pos.x + Math.cos(angle) * spread;
  this.y = pos.y + Math.sin(angle) * spread;
  this.radius = (Math.random() * (config.maxSize - config.minSize) + config.minSize) * config.intensity;
  this.color = config.colors[Math.floor(Math.random() * config.colors.length)];

  // Вычисляем скорости с учетом направления вверх
  const speed = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * config.intensity;
  this.vx = Math.cos(angle) * speed;
  this.vy = Math.sin(angle) * speed * (1 + config.upwardForce); // Применяем upwardForce для усиления движения вверх

  this.life = Math.random() * (config.maxLife - config.minLife) + config.minLife;
}

const CursorBurn: React.FC<CursorBurnProps> = ({
  // Размеры
  width,
  height,

  // Настройки частиц
  numParticles = 50,
  colors = ["orange", "red", "yellow"],
  minParticleSize = 1,
  maxParticleSize = 6,
  minParticleSpeed = 2,
  maxParticleSpeed = 5,
  minParticleLife = 20,
  maxParticleLife = 30,
  particleDecaySpeed = 0.075,
  particleSpread = 10,
  particleAngleSpread = 90, // По умолчанию разброс ±45 градусов
  particleUpwardForce = 0.5, // По умолчанию средняя сила вверх

  // Настройки курсора
  radius = 12,
  cursorColor = "white",
  showSystemCursor = false,

  // Настройки анимации
  speed = 0.5,
  maxIntensity = 3,
  growthTime = 1.5,
  decayMultiplier = 20,
  decaySpeed = 0.1,

  // Настройки фильтра
  filterBlur = 7,
  filterMatrix = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -9",

  // Стили
  background,
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const accelRef = useRef({ x: 0, y: 0 });
  const pressStartRef = useRef<number | null>(null);
  const intensityRef = useRef(1);
  const targetIntensityRef = useRef(1);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Prevent context menu
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    // Add context menu prevention
    canvas.addEventListener('contextmenu', handleContextMenu);

    // Set initial canvas size
    const w = canvas.width = width || window.innerWidth * 2;
    const h = canvas.height = height || window.innerHeight * 2;
    canvas.style.width = `${w/2}px`;
    canvas.style.height = `${h/2}px`;

    // Initialize position and acceleration
    posRef.current = { x: w/2, y: h/2 };
    accelRef.current = JSON.parse(JSON.stringify(posRef.current));

    const particleConfig = {
      colors,
      minSize: minParticleSize,
      maxSize: maxParticleSize,
      minSpeed: minParticleSpeed,
      maxSpeed: maxParticleSpeed,
      minLife: minParticleLife,
      maxLife: maxParticleLife,
      intensity: 1,
      spread: particleSpread,
      angleSpread: particleAngleSpread,
      upwardForce: particleUpwardForce
    };

    // Initialize particles
    for(let i = 0; i < numParticles; i++) {
      particlesRef.current.push(new (Particle as any)(posRef.current, particleConfig));
    }

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) {
        e.preventDefault(); // Предотвращаем прокрутку
      }

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        const touch = e.touches[0];
        if (!touch) return;
        clientX = touch.clientX;
        clientY = touch.clientY;
      }

      posRef.current = {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) {
        e.preventDefault(); // Предотвращаем прокрутку
      }
      if (e instanceof MouseEvent && e.button !== 0) return;
      pressStartRef.current = Date.now();
      targetIntensityRef.current = maxIntensity;
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) {
        e.preventDefault(); // Предотвращаем прокрутку
      }
      if (e instanceof MouseEvent && e.button !== 0) return;
      pressStartRef.current = null;
      targetIntensityRef.current = 1;
    };

    // Animation function
    const render = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Update intensity with easing
      if (pressStartRef.current) {
        const pressDuration = (currentTime - pressStartRef.current) / 1000;
        const t = Math.min(pressDuration, growthTime);
        intensityRef.current = 1 + (maxIntensity - 1) * easing.easeOut(t/growthTime);
      } else {
        const currentIntensity = intensityRef.current;
        const targetIntensity = targetIntensityRef.current;
        const diff = targetIntensity - currentIntensity;

        if (Math.abs(diff) > 0.01) {
          // Изменяем скорость затухания
          const decayFactor = Math.pow(decaySpeed, deltaTime * 10);
          intensityRef.current = currentIntensity + (targetIntensity - currentIntensity) * decayFactor;
        } else {
          intensityRef.current = targetIntensity;
        }
      }

      ctx.clearRect(0, 0, w, h);

      accelRef.current.x += (posRef.current.x - accelRef.current.x) * speed;
      accelRef.current.y += (posRef.current.y - accelRef.current.y) * speed;

      ctx.beginPath();
      ctx.fillStyle = cursorColor;
      ctx.arc(accelRef.current.x, accelRef.current.y, radius * intensityRef.current, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.globalCompositeOperation = "xor";

      particleConfig.intensity = intensityRef.current;

      for(let j = 0; j < particlesRef.current.length; j++) {
        const p = particlesRef.current[j];

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.radius -= particleDecaySpeed * intensityRef.current;
        p.life--;

        if(p.life < 0 || p.radius < 0) {
          particlesRef.current[j] = new (Particle as any)(posRef.current, particleConfig);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animationRef.current = requestAnimationFrame(render);
    };

    // Add event listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchmove', handleMouseMove);

    // Prevent default touch behavior
    canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchend', (e) => e.preventDefault(), { passive: false });

    // Start animation
    render();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleStart);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchmove', handleMouseMove);
      particlesRef.current = [];
    };
  }, [
    colors, height, width, numParticles, radius, speed,
    minParticleSize, maxParticleSize, minParticleSpeed,
    maxParticleSpeed, minParticleLife, maxParticleLife,
    particleDecaySpeed, cursorColor, maxIntensity,
    growthTime, decayMultiplier, particleSpread, decaySpeed,
    particleAngleSpread, particleUpwardForce
  ]);

  const wrapperStyle = {
    ...styles.wrapper,
    background,
    ...style,
    cursor: showSystemCursor ? 'default' : 'none'
  };

  const canvasStyle = {
    ...styles.canvas,
    pointerEvents: 'none' as const // Canvas всегда пропускает события мыши
  };

  return (
    <div style={wrapperStyle} className={className}>
      <canvas
        ref={canvasRef}
        style={canvasStyle}
      />
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={styles.svg}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={filterBlur} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values={filterMatrix}
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default CursorBurn;
