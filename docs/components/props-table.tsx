interface Prop {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

interface PropsTableProps {
  props: Prop[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border px-4 py-2 text-left font-semibold">
              Prop
            </th>
            <th className="border border-border px-4 py-2 text-left font-semibold">
              Type
            </th>
            <th className="border border-border px-4 py-2 text-left font-semibold">
              Default
            </th>
            <th className="border border-border px-4 py-2 text-left font-semibold">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="border border-border px-4 py-2">
                <code className="text-sm font-mono">{prop.name}</code>
                {prop.required && (
                  <span className="ml-2 text-xs text-red-500">*</span>
                )}
              </td>
              <td className="border border-border px-4 py-2">
                <code className="text-xs font-mono text-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="border border-border px-4 py-2">
                {prop.default ? (
                  <code className="text-xs font-mono">{prop.default}</code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="border border-border px-4 py-2 text-sm">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
