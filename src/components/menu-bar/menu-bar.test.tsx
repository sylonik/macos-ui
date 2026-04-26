import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MenuBar } from './menu-bar';
import { vi } from 'vitest';

const mockMenus = [
  {
    label: 'File',
    items: [
      { label: 'New', onClick: vi.fn() },
      { label: 'Open', onClick: vi.fn(), disabled: true },
      { divider: true },
      { label: 'Close' },
    ],
  },
];

describe('MenuBar', () => {
  it('renders menus and right content', () => {
    const { getByText } = render(
      <MenuBar menus={mockMenus} rightContent={<div>Time</div>} />
    );
    expect(getByText('File')).toBeInTheDocument();
    expect(getByText('Time')).toBeInTheDocument();
  });

  it('opens and closes dropdown on mouse enter/leave', () => {
    const { getByText, queryByText } = render(<MenuBar menus={mockMenus} />);
    const menuButton = getByText('File');
    fireEvent.mouseEnter(menuButton);
    expect(getByText('New')).toBeInTheDocument();
    fireEvent.mouseLeave(menuButton);
    expect(queryByText('New')).not.toBeInTheDocument();
  });

  it('triggers onClick when a menu item is clicked', () => {
    const { getByText } = render(<MenuBar menus={mockMenus} />);
    fireEvent.mouseEnter(getByText('File'));
    fireEvent.click(getByText('New'));
    expect(mockMenus[0].items[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('disables menu items correctly', () => {
    const { getByText } = render(<MenuBar menus={mockMenus} />);
    fireEvent.mouseEnter(getByText('File'));
    const openButton = getByText('Open').closest('button');
    expect(openButton).toBeDisabled();
  });
});
