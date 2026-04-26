import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DesktopIcon } from './desktop-icon';
import { vi } from 'vitest';
import { FileText } from 'lucide-react';

describe('DesktopIcon', () => {
  it('renders icon and label', () => {
    const { getByText, getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" />
    );
    expect(getByText('Documents')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" onClick={onClick} />
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('triggers onDoubleClick when double-clicked', () => {
    const onDoubleClick = vi.fn();
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" onDoubleClick={onDoubleClick} />
    );
    fireEvent.doubleClick(getByRole('button'));
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected styling when selected is true', () => {
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" selected={true} />
    );
    const button = getByRole('button');
    expect(button).toHaveClass('bg-blue-500/30');
    expect(button).toHaveAttribute('aria-selected', 'true');
  });

  it('applies unselected styling when selected is false', () => {
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" selected={false} />
    );
    const button = getByRole('button');
    expect(button).not.toHaveClass('bg-blue-500/30');
    expect(button).toHaveAttribute('aria-selected', 'false');
  });

  it('has aria-label matching the label prop', () => {
    const { getByLabelText } = render(
      <DesktopIcon icon={FileText} label="My Documents" />
    );
    expect(getByLabelText('My Documents')).toBeInTheDocument();
  });

  it('handles keyboard navigation - Enter triggers onDoubleClick', () => {
    const onDoubleClick = vi.fn();
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" onDoubleClick={onDoubleClick} />
    );
    const button = getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation - Space triggers onClick', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" onClick={onClick} />
    );
    const button = getByRole('button');
    fireEvent.keyDown(button, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" className="custom-class" />
    );
    expect(getByRole('button')).toHaveClass('custom-class');
  });

  it('has tabIndex for keyboard accessibility', () => {
    const { getByRole } = render(
      <DesktopIcon icon={FileText} label="Documents" />
    );
    expect(getByRole('button')).toHaveAttribute('tabIndex', '0');
  });
});
