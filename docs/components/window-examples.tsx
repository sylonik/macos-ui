"use client";

import React from "react";
import { ComponentPreview } from "@/components/component-preview";
import { Window, WindowManagerProvider } from "@sylonik/macos-ui";
import { FileText, Settings } from "lucide-react";

export function BasicWindowExample() {
  return (
    <ComponentPreview
      title="Basic Window"
      code={`<WindowManagerProvider>
  <Window
    id="basic"
    title="Basic Window"
    defaultPosition={{ x: 20, y: 20 }}
    defaultSize={{ width: 350, height: 200 }}
  >
    <div className="p-4">
      <p>This is a basic window with default settings.</p>
    </div>
  </Window>
</WindowManagerProvider>`}
    >
      <WindowManagerProvider>
        <Window
          id="basic"
          title="Basic Window"
          defaultPosition={{ x: 20, y: 20 }}
          defaultSize={{ width: 350, height: 200 }}
        >
          <div className="p-4">
            <p>This is a basic window with default settings.</p>
          </div>
        </Window>
      </WindowManagerProvider>
    </ComponentPreview>
  );
}

export function WindowWithIconExample() {
  return (
    <ComponentPreview
      title="Window with Icon"
      code={`<WindowManagerProvider>
  <Window
    id="with-icon"
    title="Document"
    icon={FileText}
    defaultPosition={{ x: 20, y: 20 }}
    defaultSize={{ width: 400, height: 220 }}
  >
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Document Editor</h2>
      <p>A window with an icon in the title bar.</p>
    </div>
  </Window>
</WindowManagerProvider>`}
    >
      <WindowManagerProvider>
        <Window
          id="with-icon"
          title="Document"
          icon={FileText}
          defaultPosition={{ x: 20, y: 20 }}
          defaultSize={{ width: 400, height: 220 }}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Document Editor</h2>
            <p>A window with an icon in the title bar.</p>
          </div>
        </Window>
      </WindowManagerProvider>
    </ComponentPreview>
  );
}

export function MultipleWindowsExample() {
  return (
    <ComponentPreview
      title="Multiple Windows"
      code={`<WindowManagerProvider>
  <Window
    id="window-1"
    title="Window 1"
    icon={FileText}
    defaultPosition={{ x: 20, y: 20 }}
    defaultSize={{ width: 280, height: 180 }}
  >
    <div className="p-4">First window</div>
  </Window>
  <Window
    id="window-2"
    title="Window 2"
    icon={Settings}
    defaultPosition={{ x: 120, y: 80 }}
    defaultSize={{ width: 280, height: 180 }}
  >
    <div className="p-4">Second window</div>
  </Window>
</WindowManagerProvider>`}
    >
      <WindowManagerProvider>
        <Window
          id="window-1"
          title="Window 1"
          icon={FileText}
          defaultPosition={{ x: 20, y: 20 }}
          defaultSize={{ width: 280, height: 180 }}
        >
          <div className="p-4">First window - click to focus</div>
        </Window>
        <Window
          id="window-2"
          title="Window 2"
          icon={Settings}
          defaultPosition={{ x: 120, y: 80 }}
          defaultSize={{ width: 280, height: 180 }}
        >
          <div className="p-4">Second window - click to focus</div>
        </Window>
      </WindowManagerProvider>
    </ComponentPreview>
  );
}

export function NonResizableWindowExample() {
  return (
    <ComponentPreview
      title="Non-Resizable Window"
      code={`<WindowManagerProvider>
  <Window
    id="fixed"
    title="Fixed Size"
    isResizable={false}
    defaultPosition={{ x: 20, y: 20 }}
    defaultSize={{ width: 300, height: 200 }}
  >
    <div className="p-4">
      <p>This window cannot be resized.</p>
    </div>
  </Window>
</WindowManagerProvider>`}
    >
      <WindowManagerProvider>
        <Window
          id="fixed"
          title="Fixed Size"
          isResizable={false}
          defaultPosition={{ x: 20, y: 20 }}
          defaultSize={{ width: 300, height: 200 }}
        >
          <div className="p-4">
            <p>This window cannot be resized.</p>
          </div>
        </Window>
      </WindowManagerProvider>
    </ComponentPreview>
  );
}
