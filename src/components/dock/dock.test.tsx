import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dock } from './dock';
import { vi } from 'vitest';
import { FileText } from 'lucide-react';

const mockItems = [
  {
    id: '1',
    icon: FileText,
    label: 'Test 1',
    onClick: vi.fn(),
  },
  {
    id: '2',
    icon: FileText,
    label: 'Test 2',
    isRunning: true,
  },
  {
    id: '3',
    icon: FileText,
    label: 'Test 3',
    badge: '5',
  },
];

describe('Dock', () => {
  it('renders all dock items', () => {
    const { getAllByRole } = render(<Dock items={mockItems} />);
    expect(getAllByRole('button')).toHaveLength(3);
  });

  it('triggers onClick when an item is clicked', () => {
    const { getAllByRole } = render(<Dock items={mockItems} />);
    fireEvent.click(getAllByRole('button')[0]);
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('shows running indicator for running apps', () => {
    const { container } = render(<Dock items={mockItems} />);
    const runningIndicator = container.querySelector('.bg-black');
    expect(runningIndicator).toBeInTheDocument();
  });

  it('displays a badge with content', () => {
    const { getByText } = render(<Dock items={mockItems} />);
    expect(getByText('5')).toBeInTheDocument();
  });
});
