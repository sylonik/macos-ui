"use client";

import React from "react";
import { ComponentPreview } from "@/components/component-preview";
import { Dock } from "@sylonik/macos-ui";
import { FileText, Settings, Mail, Calendar, Music, Image } from "lucide-react";

export function BasicDockExample() {
  return (
    <ComponentPreview
      title="Basic Dock"
      code={`const items = [
  { id: 'documents', icon: FileText, label: 'Documents' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'mail', icon: Mail, label: 'Mail' },
]

<Dock items={items} position="bottom" />`}
    >
      <div className="h-32 flex items-end justify-center">
        <Dock
          items={[
            { id: "documents", icon: FileText, label: "Documents" },
            { id: "settings", icon: Settings, label: "Settings" },
            { id: "mail", icon: Mail, label: "Mail" },
          ]}
          position="bottom"
        />
      </div>
    </ComponentPreview>
  );
}

export function DockWithIndicatorsExample() {
  return (
    <ComponentPreview
      title="Dock with Running Indicators and Badges"
      code={`const items = [
  { id: 'documents', icon: FileText, label: 'Documents', isRunning: true },
  { id: 'settings', icon: Settings, label: 'Settings', isRunning: false },
  { id: 'mail', icon: Mail, label: 'Mail', isRunning: true, badge: 5 },
  { id: 'calendar', icon: Calendar, label: 'Calendar', isRunning: true },
]

<Dock items={items} position="bottom" magnification />`}
    >
      <div className="h-32 flex items-end justify-center">
        <Dock
          items={[
            { id: "documents", icon: FileText, label: "Documents", isRunning: true },
            { id: "settings", icon: Settings, label: "Settings", isRunning: false },
            { id: "mail", icon: Mail, label: "Mail", isRunning: true, badge: 5 },
            { id: "calendar", icon: Calendar, label: "Calendar", isRunning: true },
          ]}
          position="bottom"
          magnification
        />
      </div>
    </ComponentPreview>
  );
}

export function DockWithColorsExample() {
  return (
    <ComponentPreview
      title="Dock with Custom Colors"
      code={`const items = [
  { id: 'documents', icon: FileText, label: 'Documents', color: '#3b82f6' },
  { id: 'music', icon: Music, label: 'Music', color: '#f59e0b' },
  { id: 'photos', icon: Image, label: 'Photos', color: '#10b981' },
  { id: 'mail', icon: Mail, label: 'Mail', color: '#ef4444', badge: 12 },
]

<Dock items={items} position="bottom" magnificationScale={1.8} />`}
    >
      <div className="h-32 flex items-end justify-center">
        <Dock
          items={[
            { id: "documents", icon: FileText, label: "Documents", color: "#3b82f6" },
            { id: "music", icon: Music, label: "Music", color: "#f59e0b" },
            { id: "photos", icon: Image, label: "Photos", color: "#10b981" },
            { id: "mail", icon: Mail, label: "Mail", color: "#ef4444", badge: 12 },
          ]}
          position="bottom"
          magnificationScale={1.8}
        />
      </div>
    </ComponentPreview>
  );
}

export function VerticalDockExample() {
  return (
    <ComponentPreview
      title="Vertical Dock (Left)"
      code={`<Dock items={items} position="left" magnification />`}
    >
      <div className="h-96 flex items-center">
        <Dock
          items={[
            { id: "documents", icon: FileText, label: "Documents", isRunning: true },
            { id: "settings", icon: Settings, label: "Settings", isRunning: false },
            { id: "mail", icon: Mail, label: "Mail", isRunning: true, badge: 5 },
            { id: "calendar", icon: Calendar, label: "Calendar", isRunning: true },
          ]}
          position="left"
          magnification
        />
      </div>
    </ComponentPreview>
  );
}

export function DockNoMagnificationExample() {
  return (
    <ComponentPreview
      title="Dock without Magnification"
      code={`<Dock items={items} position="bottom" magnification={false} />`}
    >
      <div className="h-32 flex items-end justify-center">
        <Dock
          items={[
            { id: "documents", icon: FileText, label: "Documents" },
            { id: "settings", icon: Settings, label: "Settings" },
            { id: "mail", icon: Mail, label: "Mail" },
          ]}
          position="bottom"
          magnification={false}
        />
      </div>
    </ComponentPreview>
  );
}
