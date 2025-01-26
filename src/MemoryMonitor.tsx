import React, { useEffect, useState } from 'react';

const styles = {
  monitor: {
    position: 'fixed' as const,
    bottom: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#00ff00',
    padding: '4px 8px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
    zIndex: 1,
    userSelect: 'none' as const,
    opacity: 0.7
  }
};

export const MemoryMonitor: React.FC = () => {
  const [memory, setMemory] = useState<{
    usedJSHeapSize: number;
  } | null>(null);

  useEffect(() => {
    const updateMemory = () => {
      if ('performance' in window && 'memory' in (performance as any)) {
        const { usedJSHeapSize } = (performance as any).memory;
        setMemory({ usedJSHeapSize });
      }
    };

    const interval = setInterval(updateMemory, 1000);
    updateMemory();

    return () => clearInterval(interval);
  }, []);

  if (!memory) return null;

  const formatMemory = (bytes: number) => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div style={styles.monitor}>
      {formatMemory(memory.usedJSHeapSize)}
    </div>
  );
};
