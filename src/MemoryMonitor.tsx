import React, { useEffect, useState } from 'react';

const styles = {
  monitor: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#00ff00',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: 'monospace',
    fontSize: '14px',
    zIndex: 1000,
    border: '1px solid #00ff00',
    boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)',
    userSelect: 'none' as const
  }
};

export const MemoryMonitor: React.FC = () => {
  const [memory, setMemory] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    const updateMemory = () => {
      if ('performance' in window && 'memory' in (performance as any)) {
        setMemory((performance as any).memory);
      }
    };

    // Обновляем каждую секунду
    const interval = setInterval(updateMemory, 1000);
    updateMemory(); // Первоначальное обновление

    return () => clearInterval(interval);
  }, []);

  if (!memory) return null;

  const formatMemory = (bytes: number) => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div style={styles.monitor}>
      <div>Used: {formatMemory(memory.usedJSHeapSize)}</div>
      <div>Total: {formatMemory(memory.totalJSHeapSize)}</div>
      <div>Limit: {formatMemory(memory.jsHeapSizeLimit)}</div>
    </div>
  );
};
