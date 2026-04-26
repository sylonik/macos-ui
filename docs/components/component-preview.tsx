'use client'

import { useState } from 'react'
import { Check, Copy, Code } from 'lucide-react'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

export function ComponentPreview({
  children,
  code,
  title,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 border border-border rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-muted border-b border-border">
          <h4 className="text-sm font-semibold">{title}</h4>
        </div>
      )}
      
      <div className="relative p-6 bg-background min-h-[300px] overflow-hidden">
        {children}
      </div>

      <div className="border-t border-border bg-muted/50">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Code className="w-4 h-4" />
            {showCode ? 'Hide' : 'Show'} Code
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {showCode && (
          <div className="border-t border-border">
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono">{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
