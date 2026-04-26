import React from 'react';

export interface MenuItemConfig {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  submenu?: MenuItemConfig[];
}

export interface MenuConfig {
  label: string;
  items: MenuItemConfig[];
}

export interface MenuBarProps {
  logo?: React.ReactNode;
  menus?: MenuConfig[];
  rightContent?: React.ReactNode;
  className?: string;
}
