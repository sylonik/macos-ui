'use client'

import { ComponentPreview } from '@/components/component-preview'
import { Dock } from '@sylonik/macos-ui/client'
import { FileText, Settings, Mail, Calendar, Music, Image } from 'lucide-react'

export default function DockExamples() {
  const basicItems = [
    {
      id: 'documents',
      icon: FileText,
      label: 'Documents',
      onClick: () => console.log('Documents'),
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      onClick: () => console.log('Settings'),
    },
    {
      id: 'mail',
      icon: Mail,
      label: 'Mail',
      onClick: () => console.log('Mail'),
    },
  ]

  const runningItems = [
    {
      id: 'documents',
      icon: FileText,
      label: 'Documents',
      isRunning: true,
      onClick: () => console.log('Documents'),
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      isRunning: false,
      onClick: () => console.log('Settings'),
    },
    {
      id: 'mail',
      icon: Mail,
      label: 'Mail',
      isRunning: true,
      badge: 5,
      onClick: () => console.log('Mail'),
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Calendar',
      isRunning: true,
      onClick: () => console.log('Calendar'),
    },
  ]

  const coloredItems = [
    {
      id: 'documents',
      icon: FileText,
      label: 'Documents',
      color: '#3b82f6',
      onClick: () => console.log('Documents'),
    },
    {
      id: 'music',
      icon: Music,
      label: 'Music',
      color: '#f59e0b',
      onClick: () => console.log('Music'),
    },
    {
      id: 'photos',
      icon: Image,
      label: 'Photos',
      color: '#10b981',
      onClick: () => console.log('Photos'),
    },
    {
      id: 'mail',
      icon: Mail,
      label: 'Mail',
      color: '#ef4444',
      badge: 12,
      onClick: () => console.log('Mail'),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Dock Examples</h1>
        <p className="text-muted-foreground">
          Interactive examples of the Dock component with different configurations.
        </p>
      </div>

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
          <Dock items={basicItems} position="bottom" />
        </div>
      </ComponentPreview>

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
          <Dock items={runningItems} position="bottom" magnification />
        </div>
      </ComponentPreview>

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
            items={coloredItems}
            position="bottom"
            magnificationScale={1.8}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Vertical Dock (Left)"
        code={`<Dock items={items} position="left" magnification />`}
      >
        <div className="h-96 flex items-center">
          <Dock items={runningItems} position="left" magnification />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Dock without Magnification"
        code={`<Dock items={items} position="bottom" magnification={false} />`}
      >
        <div className="h-32 flex items-end justify-center">
          <Dock items={basicItems} position="bottom" magnification={false} />
        </div>
      </ComponentPreview>
    </div>
  )
}
