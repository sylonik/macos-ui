import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { DesktopIcon } from './desktop-icon';
import { FileText } from 'lucide-react';
import { vi } from 'vitest';

describe('DesktopIcon Properties', () => {
  // **Feature: macos-component-library, Property 22: DesktopIcon click triggers callback**
  it('Property 22: DesktopIcon click triggers callback', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (label) => {
          cleanup();
          const onClick = vi.fn();
          const { getByRole } = render(
            <DesktopIcon icon={FileText} label={label} onClick={onClick} />
          );
          fireEvent.click(getByRole('button'));
          expect(onClick).toHaveBeenCalledTimes(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  // **Feature: macos-component-library, Property 23: DesktopIcon renders icon and label**
  it('Property 23: DesktopIcon renders icon and label', () => {
    // Use alphanumeric strings to avoid whitespace issues with text lookups
    const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const labelArbitrary = fc.array(fc.constantFrom(...alphanumeric.split('')), { minLength: 1, maxLength: 20 }).map(arr => arr.join(''));
    fc.assert(
      fc.property(
        labelArbitrary,
        (label) => {
          cleanup();
          const { getByText, container } = render(
            <DesktopIcon icon={FileText} label={label} />
          );
          // Label is rendered
          expect(getByText(label)).toBeInTheDocument();
          // Icon container is rendered (SVG from lucide-react)
          expect(container.querySelector('svg')).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  // **Feature: macos-component-library, Property 24: DesktopIcon double-click triggers callback**
  it('Property 24: DesktopIcon double-click triggers callback', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (label) => {
          cleanup();
          const onDoubleClick = vi.fn();
          const { getByRole } = render(
            <DesktopIcon icon={FileText} label={label} onDoubleClick={onDoubleClick} />
          );
          fireEvent.doubleClick(getByRole('button'));
          expect(onDoubleClick).toHaveBeenCalledTimes(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  // **Feature: macos-component-library, Property 25: DesktopIcon selection styling**
  it('Property 25: DesktopIcon selection styling applies correct classes', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (selected, label) => {
          cleanup();
          const { getByRole } = render(
            <DesktopIcon icon={FileText} label={label} selected={selected} />
          );
          const button = getByRole('button');

          if (selected) {
            // Selection indicator CSS class should be present
            expect(button).toHaveClass('bg-blue-500/30');
            expect(button).toHaveClass('ring-2');
            expect(button).toHaveAttribute('aria-selected', 'true');
          } else {
            expect(button).not.toHaveClass('bg-blue-500/30');
            expect(button).toHaveAttribute('aria-selected', 'false');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Additional property: aria-label matches label prop
  it('DesktopIcon aria-label matches label prop', () => {
    // Use alphanumeric strings to avoid whitespace issues
    const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const labelArbitrary = fc.array(fc.constantFrom(...alphanumeric.split('')), { minLength: 1, maxLength: 20 }).map(arr => arr.join(''));
    fc.assert(
      fc.property(
        labelArbitrary,
        (label) => {
          cleanup();
          const { getByLabelText } = render(
            <DesktopIcon icon={FileText} label={label} />
          );
          expect(getByLabelText(label)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  // Additional property: keyboard accessibility
  it('DesktopIcon keyboard Enter triggers onDoubleClick', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (label) => {
          cleanup();
          const onDoubleClick = vi.fn();
          const { getByRole } = render(
            <DesktopIcon icon={FileText} label={label} onDoubleClick={onDoubleClick} />
          );
          fireEvent.keyDown(getByRole('button'), { key: 'Enter' });
          expect(onDoubleClick).toHaveBeenCalledTimes(1);
        }
      ),
      { numRuns: 100 }
    );
  });
});
