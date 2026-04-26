"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { MenuBarProps, MenuConfig } from './menu-bar.types';

const menuBarVariants = cva(
  'flex items-center justify-between px-4 h-8 bg-white/20 backdrop-blur-xl shadow-sm border-b border-white/10'
);

const Menu = ({ menu }: { menu: MenuConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="px-3 py-1 text-sm rounded-md hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {menu.label}
      </button>
      {isOpen && (
        <div 
          className="absolute left-0 mt-1 w-56 bg-white/80 backdrop-blur-2xl rounded-md shadow-lg border border-white/20 z-10"
          role="menu"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'ArrowDown') {
              const focusableElements = menuRef.current?.querySelectorAll('button');
              if (!focusableElements) return;
              const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLButtonElement);
              if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
                const nextElement = focusableElements[currentIndex + 1];
                nextElement?.focus();
              }
            }
            if (e.key === 'ArrowUp') {
              const focusableElements = menuRef.current?.querySelectorAll('button');
              if (!focusableElements) return;
              const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLButtonElement);
              if (currentIndex > 0) {
                const prevElement = focusableElements[currentIndex - 1];
                prevElement?.focus();
              }
            }
          }}
        >
          {Array.from(menu.items).map((item: any, index) =>
            item.divider ? (
              <div key={index} className="h-px my-1 bg-white/20" />
            ) : (
              <button
                key={item.label}
                role="menuitem"
                className="w-full text-left px-3 py-1.5 text-sm flex justify-between items-center hover:bg-blue-500/50 disabled:opacity-50"
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                disabled={item.disabled}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs opacity-60">{item.shortcut}</span>
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ logo, menus, rightContent, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(menuBarVariants(), className)} {...props}>
        <div className="flex items-center gap-2">
          {logo}
          {menus?.map((menu) => (
            <Menu key={menu.label} menu={menu} />
          ))}
        </div>
        <div>{rightContent}</div>
      </div>
    );
  }
);

MenuBar.displayName = 'MenuBar';

export { MenuBar };
