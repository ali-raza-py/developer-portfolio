import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-strong:text-foreground prose-p:text-foreground/78 prose-li:text-foreground/78 prose-table:text-foreground/78 prose-th:text-foreground prose-td:text-foreground/78">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h2: ({ ...props }) => (
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground" {...props} />
          ),
          p: ({ ...props }) => <p className="leading-8 text-foreground/75" {...props} />,
          ul: ({ ...props }) => <ul className="space-y-3 pl-5" {...props} />,
          ol: ({ ...props }) => <ol className="space-y-3 pl-5" {...props} />,
          li: ({ ...props }) => <li className="marker:text-primary" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="rounded-2xl border border-border bg-muted/20 px-5 py-4 text-foreground/75"
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <a
              className="font-medium text-primary underline-offset-4 transition hover:underline decoration-primary"
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => (
            <code
              className={`${className ?? ''} rounded-md border border-border bg-muted/30 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ ...props }) => (
            <pre
              className="overflow-x-auto rounded-3xl border border-border bg-muted/30 p-5 text-sm leading-7 text-foreground/80"
              {...props}
            />
          ),
          img: ({ ...props }) => (
            <img className="rounded-3xl border border-border" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto rounded-3xl border border-border">
              <table className="w-full" {...props} />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
