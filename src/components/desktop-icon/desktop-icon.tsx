import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DesktopIconProps } from './desktop-icon.types';

const desktopIconVariants = cva(
  'flex flex-col items-center justify-center gap-1 p-2 rounded-lg cursor-pointer select-none transition-all duration-150',
  {
    variants: {
      selected: {
        true: 'bg-blue-500/30 ring-2 ring-blue-500/50',
        false: 'hover:bg-white/10',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

const labelVariants = cva(
  'text-xs text-center max-w-[80px] truncate px-1 py-0.5 rounded',
  {
    variants: {
      selected: {
        true: 'bg-blue-500 text-white',
        false: 'text-white drop-shadow-md',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

const DesktopIcon = React.forwardRef<HTMLDivElement, DesktopIconProps>(
  (
    {
      icon: Icon,
      label,
      color = 'currentColor',
      onClick,
      onDoubleClick,
      selected = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-selected={selected}
        className={cn(desktopIconVariants({ selected }), className)}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onDoubleClick) {
            onDoubleClick();
          } else if (e.key === ' ' && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        {...props}
      >
        <div className="flex items-center justify-center w-12 h-12">
          <Icon size={48} color={color} />
        </div>
        <span className={cn(labelVariants({ selected }))} title={label}>
          {label}
        </span>
      </div>
    );
  }
);

DesktopIcon.displayName = 'DesktopIcon';

export { DesktopIcon, desktopIconVariants, labelVariants };
