import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { MenuBar } from './menu-bar';
import { vi } from 'vitest';

describe('MenuBar Properties', () => {
  let uniqueLabelCounter = 0;

  // Use alphanumeric strings to avoid whitespace issues
  const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const uniqueLabelArbitrary = fc.array(fc.constantFrom(...alphanumeric.split('')), { minLength: 1, maxLength: 20 }).map(arr => `${arr.join('')}-${uniqueLabelCounter++}`);

  const menuItemRecordArbitrary = fc.record({
    label: uniqueLabelArbitrary,
    onClick: fc.constant(vi.fn()),
  });

  const menuRecordArbitrary = fc.record({
    label: uniqueLabelArbitrary,
    items: fc.uniqueArray(menuItemRecordArbitrary, { minLength: 1, selector: (v) => v.label }),
  });

  beforeEach(() => {
    uniqueLabelCounter = 0;
  });

  it('Property 15: Menu click opens dropdown', () => {
    fc.assert(
      fc.property(fc.uniqueArray(menuRecordArbitrary, { minLength: 1, selector: (v) => v.label }), (menus) => {
        cleanup();
        const { getByText, queryByText } = render(<MenuBar menus={menus} />);
        const firstMenu = menus[0];
        const menuButton = getByText(firstMenu.label);

        fireEvent.click(menuButton);
        firstMenu.items.forEach((item) => {
          if (item.label) {
            expect(getByText(item.label)).toBeInTheDocument();
          }
        });

        fireEvent.click(menuButton);
        firstMenu.items.forEach((item) => {
          if (item.label) {
            expect(queryByText(item.label)).not.toBeInTheDocument();
          }
        });
      })
    );
  });

  it('Property 16: Hover switches active menu', () => {
    fc.assert(
      fc.property(fc.uniqueArray(menuRecordArbitrary, { minLength: 2, selector: (v) => v.label }), (menus) => {
        cleanup();
        const { getByText, queryByText, container } = render(<MenuBar menus={menus} />);

        // Find menu containers (the divs that contain both button and dropdown)
        const menuContainers = container.querySelectorAll('.relative');

        // Hover on first menu container to open it
        fireEvent.mouseEnter(menuContainers[0]);
        expect(getByText(menus[0].items[0].label)).toBeInTheDocument();

        // Leave first menu and enter second menu
        fireEvent.mouseLeave(menuContainers[0]);
        fireEvent.mouseEnter(menuContainers[1]);
        expect(queryByText(menus[0].items[0].label)).not.toBeInTheDocument();
        expect(getByText(menus[1].items[0].label)).toBeInTheDocument();
      })
    );
  });

  it('Property 17: Outside click closes dropdown', () => {
    fc.assert(
      fc.property(fc.uniqueArray(menuRecordArbitrary, { minLength: 1, selector: (v) => v.label }), (menus) => {
        cleanup();
        const { getByText, queryByText, container } = render(
          <MenuBar menus={menus} />
        );
        const firstMenu = menus[0];

        // Find menu container and hover to open
        const menuContainers = container.querySelectorAll('.relative');
        fireEvent.mouseEnter(menuContainers[0]);
        expect(getByText(firstMenu.items[0].label)).toBeInTheDocument();

        // Click outside
        fireEvent.mouseDown(document.body);
        expect(queryByText(firstMenu.items[0].label)).not.toBeInTheDocument();
      })
    );
  });

  it('Property 21: Menu keyboard navigation', () => {
    fc.assert(
      fc.property(fc.uniqueArray(menuItemRecordArbitrary, { minLength: 2, selector: (v) => v.label }), (items) => {
        cleanup();
        const menus = [{ label: 'Keyboard Nav Test Menu', items }];
        const { getByText, getAllByRole, getByRole, queryByText } = render(<MenuBar menus={menus} />);
        const menuButton = getByText('Keyboard Nav Test Menu');

        // Open the menu by clicking
        fireEvent.click(menuButton);
        const menuitems = getAllByRole('menuitem');
        const menuDropdown = getByRole('menu');

        // Arrow down from first item to second
        menuitems[0].focus();
        fireEvent.keyDown(menuDropdown, { key: 'ArrowDown' });
        expect(document.activeElement).toBe(menuitems[1]);

        // Arrow up from second item back to first
        fireEvent.keyDown(menuDropdown, { key: 'ArrowUp' });
        expect(document.activeElement).toBe(menuitems[0]);

        // Escape to close menu
        fireEvent.keyDown(menuDropdown, { key: 'Escape' });
        expect(queryByText(items[0].label)).not.toBeInTheDocument();
      })
    );
  });
});
