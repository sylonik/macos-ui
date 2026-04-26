'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface InstallCommandProps {
  command: string
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
        <code className="text-sm font-mono">{command}</code>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
