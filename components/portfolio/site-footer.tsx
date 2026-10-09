export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-border px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-3xl leading-none text-foreground">
            Ali Raza<span className="text-accent">.</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Software developer exploring AI and building useful software systems.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Thoughtful systems over noise.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
            © {new Date().getFullYear()} Ali Raza — Karachi, Pakistan
          </p>
        </div>
      </div>
    </footer>
  )
}
