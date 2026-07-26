import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-[#9BE9B3] prose-strong:text-white prose-p:text-white/78 prose-li:text-white/78 prose-table:text-white/78 prose-th:text-white prose-td:text-white/78">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h2: ({ ...props }) => (
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-white" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-white" {...props} />
          ),
          p: ({ ...props }) => <p className="leading-8 text-white/75" {...props} />,
          ul: ({ ...props }) => <ul className="space-y-3 pl-5" {...props} />,
          ol: ({ ...props }) => <ol className="space-y-3 pl-5" {...props} />,
          li: ({ ...props }) => <li className="marker:text-[#22C55E]" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/75"
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <a
              className="font-medium text-[#9BE9B3] underline decoration-white/20 underline-offset-4 transition hover:decoration-[#9BE9B3]"
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => (
            <code
              className={`${className ?? ''} rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-[#E4FFE7]`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ ...props }) => (
            <pre
              className="overflow-x-auto rounded-3xl border border-white/10 bg-[#090909] p-5 text-sm leading-7 text-white/80"
              {...props}
            />
          ),
          img: ({ ...props }) => (
            <img className="rounded-3xl border border-white/10" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto rounded-3xl border border-white/10">
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
