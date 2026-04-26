"use client";

import React, { useState, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { DockProps } from './dock.types';

const dockVariants = cva(
  'flex items-center justify-center p-2 rounded-2xl bg-white/20 backdrop-blur-xl shadow-lg border border-white/10',
  {
    variants: {
      position: {
        bottom: 'flex-row gap-2',
        left: 'flex-col gap-2',
        right: 'flex-col gap-2',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      items,
      position = 'bottom',
      magnification = true,
      magnificationScale = 1.5,
      className,
      ...props
    },
    _ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState(0);
    const dockRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!dockRef.current) return;
      const { left, top } = dockRef.current.getBoundingClientRect();
      const newPosition = position === 'bottom' ? e.clientX - left : e.clientY - top;
      setMousePosition(newPosition);
    };

    const getWidth = (index: number) => {
      if (!dockRef.current || !magnification || !hovered) return 48;
      const ITEM_WIDTH = 48;
      const distance = Math.abs(mousePosition - (index * ITEM_WIDTH + ITEM_WIDTH / 2));
      const scale = Math.max(1, magnificationScale - distance / (ITEM_WIDTH * 2));
      return ITEM_WIDTH * scale;
    };

    return (
      <div
        ref={dockRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setMousePosition(0);
        }}
        onMouseMove={handleMouseMove}
        className={cn(dockVariants({ position }), className)}
        {...props}
      >
        {items.map((item, index) => (
                                  <div
                                    key={item.id}
                                    className="relative flex flex-col items-center justify-center"
                                    style={{
                                      width: getWidth(index),
                                      height: getWidth(index),
                                      transition: 'width 0.1s, height 0.1s',
                                    }}
                                    aria-label={item.label}
                                    role="button"
                                    onClick={item.onClick}
                                  >
                                    <div
                                      className="group relative flex items-center justify-center w-full h-full cursor-pointer"
                                      style={{ color: item.color || 'currentColor' }}
                                    >
                                      <item.icon
                                        size={getWidth(index) * 0.6}
                                      />
                                      {item.isRunning && (
                                        <div className="absolute bottom-0 w-1 h-1 bg-black rounded-full" />
                                      )}
                                      {item.badge && (
                                        <div className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
                                          {item.badge}
                                        </div>
                                      )}
                                      <div className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.label}
                                      </div>
                                    </div>
          </div>
        ))}
      </div>
    );
  }
);

Dock.displayName = 'Dock';

export { Dock };
