import React from 'react';

export interface DockItemConfig {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  color?: string;
  onClick?: () => void;
  isRunning?: boolean;
  badge?: number | string;
}

export interface DockProps {
  items: DockItemConfig[];
  position?: 'bottom' | 'left' | 'right';
  magnification?: boolean;
  magnificationScale?: number;
  autoHide?: boolean;
  className?: string;
}
