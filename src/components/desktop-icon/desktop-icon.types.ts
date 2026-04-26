import React from 'react';

export interface DesktopIconProps {
  /** Icon component to render */
  icon: React.ComponentType<{ size?: number; color?: string }>;
  /** Label text displayed below the icon */
  label: string;
  /** Icon color (defaults to currentColor) */
  color?: string;
  /** Handler for single click */
  onClick?: () => void;
  /** Handler for double click (typically opens the application) */
  onDoubleClick?: () => void;
  /** Whether the icon is currently selected */
  selected?: boolean;
  /** Additional CSS classes */
  className?: string;
}
