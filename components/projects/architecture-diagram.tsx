import type { ArchitectureStep } from '@/lib/projects'

/**
 * Vertical flow diagram used on case-study pages:
 * labeled nodes connected by ↓ arrows, with optional per-node notes.
 */
export function ArchitectureDiagram({
  caption,
  steps,
}: {
  caption: string
  steps: ArchitectureStep[]
}) {
  return (
    <figure className="my-8">
      <figcaption className="tech-label mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        {caption}
      </figcaption>
      <ol className="mx-auto flex max-w-md flex-col items-stretch">
        {steps.map((step, index) => (
          <li key={`${step.label}-${index}`} className="flex flex-col">
            <div className="relative border border-border bg-card px-4 py-3 shadow-[0_1px_0_rgb(0_0_0_/_0.04)]">
              <span className="absolute -left-px top-0 h-full w-[3px] bg-accent/70" aria-hidden="true" />
              <p className="font-mono text-sm font-medium leading-snug text-foreground">
                {step.label}
              </p>
              {step.note ? (
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {step.note}
                </p>
              ) : null}
            </div>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="flex justify-center py-1.5 font-mono text-xs text-accent"
              >
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}