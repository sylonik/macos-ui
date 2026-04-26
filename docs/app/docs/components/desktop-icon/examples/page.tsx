'use client'

import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { DesktopIcon } from '@sylonik/macos-ui/client'
import { Folder, FileText, Image, Music, Video, Settings } from 'lucide-react'

export default function DesktopIconExamples() {
  const [selected1, setSelected1] = useState<string | null>(null)
  const [selected2, setSelected2] = useState<string | null>(null)
  const [selected3, setSelected3] = useState<Set<string>>(new Set())

  const icons = [
    { id: 'docs', icon: Folder, label: 'Documents', color: '#3b82f6' },
    { id: 'pics', icon: Image, label: 'Pictures', color: '#10b981' },
    { id: 'music', icon: Music, label: 'Music', color: '#f59e0b' },
    { id: 'videos', icon: Video, label: 'Videos', color: '#ef4444' },
  ]

  const handleMultiSelect = (id: string, event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey) {
      setSelected3((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    } else {
      setSelected3(new Set([id]))
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Desktop Icon Examples</h1>
        <p className="text-muted-foreground">
          Interactive examples of the DesktopIcon component.
        </p>
      </div>

      <ComponentPreview
        title="Basic Desktop Icon"
        code={`<DesktopIcon
  icon={Folder}
  label="Documents"
  onClick={() => console.log('Selected')}
  onDoubleClick={() => console.log('Opened')}
/>`}
      >
        <div className="flex justify-center p-8">
          <DesktopIcon
            icon={Folder}
            label="Documents"
            onClick={() => console.log('Selected')}
            onDoubleClick={() => console.log('Opened')}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Desktop Icon with Selection"
        code={`const [selected, setSelected] = useState<string | null>(null)

<DesktopIcon
  icon={Folder}
  label="Documents"
  selected={selected === 'docs'}
  onClick={() => setSelected('docs')}
  onDoubleClick={() => console.log('Open documents')}
/>`}
      >
        <div className="flex justify-center gap-8 p-8">
          <DesktopIcon
            icon={Folder}
            label="Documents"
            selected={selected1 === 'docs'}
            onClick={() => setSelected1('docs')}
            onDoubleClick={() => alert('Opening Documents')}
          />
          <DesktopIcon
            icon={FileText}
            label="Notes"
            selected={selected1 === 'notes'}
            onClick={() => setSelected1('notes')}
            onDoubleClick={() => alert('Opening Notes')}
          />
          <DesktopIcon
            icon={Settings}
            label="Settings"
            selected={selected1 === 'settings'}
            onClick={() => setSelected1('settings')}
            onDoubleClick={() => alert('Opening Settings')}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Colored Desktop Icons"
        code={`const icons = [
  { id: 'docs', icon: Folder, label: 'Documents', color: '#3b82f6' },
  { id: 'pics', icon: Image, label: 'Pictures', color: '#10b981' },
  { id: 'music', icon: Music, label: 'Music', color: '#f59e0b' },
  { id: 'videos', icon: Video, label: 'Videos', color: '#ef4444' },
]

<div className="grid grid-cols-4 gap-4">
  {icons.map((item) => (
    <DesktopIcon
      key={item.id}
      icon={item.icon}
      label={item.label}
      color={item.color}
      selected={selected === item.id}
      onClick={() => setSelected(item.id)}
    />
  ))}
</div>`}
      >
        <div className="grid grid-cols-4 gap-4 p-8">
          {icons.map((item) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              color={item.color}
              selected={selected2 === item.id}
              onClick={() => setSelected2(item.id)}
              onDoubleClick={() => alert(`Opening ${item.label}`)}
            />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Multi-Select Desktop Icons"
        code={`const [selected, setSelected] = useState<Set<string>>(new Set())

const handleClick = (id: string, event: React.MouseEvent) => {
  if (event.metaKey || event.ctrlKey) {
    // Multi-select with Cmd/Ctrl
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  } else {
    // Single select
    setSelected(new Set([id]))
  }
}

<div className="grid grid-cols-4 gap-4">
  {icons.map((item) => (
    <DesktopIcon
      key={item.id}
      icon={item.icon}
      label={item.label}
      selected={selected.has(item.id)}
      onClick={(e) => handleClick(item.id, e)}
    />
  ))}
</div>`}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Hold Cmd/Ctrl to select multiple icons
          </p>
          <div className="grid grid-cols-4 gap-4 p-8">
            {icons.map((item) => (
              <DesktopIcon
                key={item.id}
                icon={item.icon}
                label={item.label}
                color={item.color}
                selected={selected3.has(item.id)}
                onClick={(e) => handleMultiSelect(item.id, e)}
                onDoubleClick={() => alert(`Opening ${item.label}`)}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Selected: {Array.from(selected3).join(', ') || 'none'}
          </p>
        </div>
      </ComponentPreview>
    </div>
  )
}
