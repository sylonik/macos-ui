import React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { Dock } from './dock';
import { FileText } from 'lucide-react';
import { vi } from 'vitest';

describe('Dock Properties', () => {
  let uniqueLabelCounter: number;
  // Use alphanumeric strings to avoid whitespace issues with aria-label lookup
  const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const uniqueStringArbitrary = fc
    .array(fc.constantFrom(...alphanumeric.split('')), { minLength: 1, maxLength: 20 })
    .map((arr) => `${arr.join('')}-${uniqueLabelCounter++}`);

  const itemRecordArbitrary = fc.record({
    id: fc.uuid(),
    label: uniqueStringArbitrary,
    isRunning: fc.boolean(),
  });

  beforeEach(() => {
    uniqueLabelCounter = 0;
  });

  it('Property 12: Dock item click triggers callback', () => {
    fc.assert(
      fc.property(fc.uniqueArray(itemRecordArbitrary, { minLength: 1, selector: (v) => v.id }), (items) => {
        cleanup();
        const onClick = vi.fn();
        const dockItems = items.map((item) => ({ ...item, icon: FileText, onClick }));
        const { getAllByRole } = render(<Dock items={dockItems} />);
        getAllByRole('button').forEach((button) => {
          button.click();
        });
        expect(onClick).toHaveBeenCalledTimes(items.length);
      })
    );
  });

  it('Property 13: Running indicator matches state', () => {
    fc.assert(
      fc.property(fc.uniqueArray(itemRecordArbitrary, { selector: (v) => v.id }), (items) => {
        cleanup();
        const dockItems = items.map((item) => ({ ...item, icon: FileText }));
        const { container } = render(<Dock items={dockItems} />);
        const runningIndicators = container.querySelectorAll('.bg-black');
        const runningItems = items.filter((item) => item.isRunning);
        expect(runningIndicators).toHaveLength(runningItems.length);
      })
    );
  });

  it('Property 14: Dock orientation applies correct layout', () => {
    fc.assert(
      fc.property(fc.constantFrom('bottom', 'left', 'right'), (position) => {
        cleanup();
        const { container } = render(<Dock items={[]} position={position} />);
        const dockElement = container.firstChild;
        if (position === 'bottom') {
          expect(dockElement).toHaveClass('flex-row');
        } else {
          expect(dockElement).toHaveClass('flex-col');
        }
      })
    );
  });

  it('Property 20: Dock item aria-label', () => {
    fc.assert(
      fc.property(fc.uniqueArray(itemRecordArbitrary, { minLength: 1, selector: (v) => v.id }), (items) => {
        cleanup();
        const dockItems = items.map((item) => ({ ...item, icon: FileText }));
        const { getByLabelText } = render(<Dock items={dockItems} />);
        items.forEach((item) => {
          expect(getByLabelText(item.label)).toBeInTheDocument();
        });
      })
    );
  });
});
