export type ProjectStatus = 'Completed' | 'In Progress'
export type ProjectCategory =
  | 'Web'
  | 'Python'
  | 'AI'
  | 'DevOps'
  | 'Open Source'
  | 'Hackathon'

export type BlogCategory =
  | 'Next.js'
  | 'Portfolio'
  | 'Content'
  | 'Career'
  | 'Python'
  | 'AI'
  | 'Design'

export type Heading = {
  id: string
  text: string
  level: number
}

type RawFile<T> = {
  slug: string
  frontmatter: T & { slug?: string }
  content: string
  readingTime: string
}

export type ProjectFrontmatter = {
  title: string
  description: string
  date: string
  status: ProjectStatus
  category: ProjectCategory
  tags: string[] | string
  techStack: string[] | string
  thumbnail: string
  heroImage: string
  githubUrl: string
  liveUrl: string
  featured?: boolean
  gallery?: string[] | string
  metrics?: { label: string; value: string }[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
}

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  coverImage: string
  author: string
  tags: string[] | string
  category: BlogCategory
  featured?: boolean
  popular?: boolean
  slug?: string
  seoTitle?: string
  seoDescription?: string
  openGraphImage?: string
}

export type ProjectEntry = Omit<
  ProjectFrontmatter,
  'tags' | 'techStack' | 'gallery'
> & {
  slug: string
  content: string
  readingTime: string
  tags: string[]
  techStack: string[]
  gallery: string[]
}

export type BlogEntry = Omit<BlogFrontmatter, 'tags'> & {
  slug: string
  content: string
  readingTime: string
  headings: Heading[]
  tags: string[]
}

export function toArray(value: string[] | string | undefined): string[] {
  if (!value) return []
  return Array.isArray(value)
    ? value.map((item) => item.trim()).filter(Boolean)
    : value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = []
  const headingRegex = /^(#{2,3})\s+(.+)$/gm

  for (const match of markdown.matchAll(headingRegex)) {
    const level = match[1].length
    const text = match[2].trim()
    headings.push({ id: slugify(text), text, level })
  }

  return headings
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
