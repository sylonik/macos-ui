'use client'

import { ComponentPreview } from '@/components/component-preview'
import { Window, WindowManager } from '@sylonik/macos-ui/client'
import { FileText, Settings } from 'lucide-react'

export default function WindowExamples() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Window Examples</h1>
        <p className="text-muted-foreground">
          Interactive examples of the Window component in action.
        </p>
      </div>

      <ComponentPreview
        title="Basic Window"
        code={`<WindowManager>
  <Window
    id="basic"
    title="Basic Window"
    defaultPosition={{ x: 100, y: 100 }}
    defaultSize={{ width: 400, height: 300 }}
  >
    <div className="p-4">
      <p>This is a basic window with default settings.</p>
    </div>
  </Window>
</WindowManager>`}
      >
        <WindowManager>
          <Window
            id="basic"
            title="Basic Window"
            defaultPosition={{ x: 100, y: 100 }}
            defaultSize={{ width: 400, height: 300 }}
          >
            <div className="p-4">
              <p>This is a basic window with default settings.</p>
            </div>
          </Window>
        </WindowManager>
      </ComponentPreview>

      <ComponentPreview
        title="Window with Icon"
        code={`<WindowManager>
  <Window
    id="with-icon"
    title="Document"
    icon={FileText}
    defaultPosition={{ x: 150, y: 150 }}
    defaultSize={{ width: 500, height: 400 }}
  >
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Document Editor</h2>
      <p>A window with an icon in the title bar.</p>
    </div>
  </Window>
</WindowManager>`}
      >
        <WindowManager>
          <Window
            id="with-icon"
            title="Document"
            icon={FileText}
            defaultPosition={{ x: 150, y: 150 }}
            defaultSize={{ width: 500, height: 400 }}
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Document Editor</h2>
              <p>A window with an icon in the title bar.</p>
            </div>
          </Window>
        </WindowManager>
      </ComponentPreview>

      <ComponentPreview
        title="Multiple Windows"
        code={`<WindowManager>
  <Window
    id="window-1"
    title="Window 1"
    icon={FileText}
    defaultPosition={{ x: 50, y: 50 }}
    defaultSize={{ width: 400, height: 300 }}
  >
    <div className="p-4">First window</div>
  </Window>
  <Window
    id="window-2"
    title="Window 2"
    icon={Settings}
    defaultPosition={{ x: 150, y: 150 }}
    defaultSize={{ width: 400, height: 300 }}
  >
    <div className="p-4">Second window</div>
  </Window>
</WindowManager>`}
      >
        <WindowManager>
          <Window
            id="window-1"
            title="Window 1"
            icon={FileText}
            defaultPosition={{ x: 50, y: 50 }}
            defaultSize={{ width: 400, height: 300 }}
          >
            <div className="p-4">First window - click to focus</div>
          </Window>
          <Window
            id="window-2"
            title="Window 2"
            icon={Settings}
            defaultPosition={{ x: 150, y: 150 }}
            defaultSize={{ width: 400, height: 300 }}
          >
            <div className="p-4">Second window - click to focus</div>
          </Window>
        </WindowManager>
      </ComponentPreview>

      <ComponentPreview
        title="Non-Resizable Window"
        code={`<WindowManager>
  <Window
    id="fixed"
    title="Fixed Size"
    isResizable={false}
    defaultPosition={{ x: 100, y: 100 }}
    defaultSize={{ width: 350, height: 250 }}
  >
    <div className="p-4">
      <p>This window cannot be resized.</p>
    </div>
  </Window>
</WindowManager>`}
      >
        <WindowManager>
          <Window
            id="fixed"
            title="Fixed Size"
            isResizable={false}
            defaultPosition={{ x: 100, y: 100 }}
            defaultSize={{ width: 350, height: 250 }}
          >
            <div className="p-4">
              <p>This window cannot be resized.</p>
            </div>
          </Window>
        </WindowManager>
      </ComponentPreview>
    </div>
  )
}
