"use client";

import React from "react";
import { ComponentPreview } from "@/components/component-preview";
import { MenuBar } from "@sylonik/macos-ui";
import { Battery, Wifi } from "lucide-react";

export function BasicMenuBarExample() {
  return (
    <ComponentPreview
      title="Basic Menu Bar"
      code={`<MenuBar
  logo={<span>My App</span>}
  menus={[
    {
      label: 'File',
      items: [
        { label: 'New', onClick: () => alert('New') },
        { label: 'Open', onClick: () => alert('Open') },
      ],
    },
  ]}
/>`}
    >
      <MenuBar
        logo={<span className="font-bold">My App</span>}
        menus={[
          {
            label: "File",
            items: [
              { label: "New", onClick: () => alert("New") },
              { label: "Open", onClick: () => alert("Open") },
            ],
          },
        ]}
      />
    </ComponentPreview>
  );
}

export function MenuWithSubmenusExample() {
  return (
    <ComponentPreview
      title="Menu with Shortcuts"
      code={`<MenuBar
  menus={[
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: '⌘+' },
        { label: 'Zoom Out', shortcut: '⌘-' },
        { divider: true },
        { label: 'Full Screen', shortcut: '⌃⌘F' },
      ],
    },
  ]}
/>`}
    >
      <MenuBar
        menus={[
          {
            label: "View",
            items: [
              { label: "Zoom In", shortcut: "⌘+" },
              { label: "Zoom Out", shortcut: "⌘-" },
              { divider: true },
              { label: "Full Screen", shortcut: "⌃⌘F" },
            ],
          },
        ]}
      />
    </ComponentPreview>
  );
}

export function MenuWithStatusAreaExample() {
  return (
    <ComponentPreview
      title="Menu with Status Area"
      code={`<MenuBar
  menus={menus}
  rightContent={
    <div className="flex items-center gap-4">
      <Battery />
      <Wifi />
    </div>
  }
/>`}
    >
      <MenuBar
        menus={[
          {
            label: "File",
            items: [
              { label: "New", onClick: () => alert("New") },
              { label: "Open", onClick: () => alert("Open") },
            ],
          },
        ]}
        rightContent={
          <div className="flex items-center gap-4">
            <Battery size={16} />
            <Wifi size={16} />
          </div>
        }
      />
    </ComponentPreview>
  );
}

export function DisabledMenuItemsExample() {
  return (
    <ComponentPreview
      title="Disabled Menu Items"
      code={`<MenuBar
  menus={[
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', onClick: () => alert('Undo') },
        { label: 'Redo', shortcut: '⇧⌘Z', onClick: () => alert('Redo'), disabled: true },
      ],
    },
  ]}
/>`}
    >
      <MenuBar
        menus={[
          {
            label: "Edit",
            items: [
              { label: "Undo", shortcut: "⌘Z", onClick: () => alert("Undo") },
              { label: "Redo", shortcut: "⇧⌘Z", onClick: () => alert("Redo"), disabled: true },
            ],
          },
        ]}
      />
    </ComponentPreview>
  );
}
