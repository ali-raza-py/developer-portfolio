import 'server-only'

import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import readingTime from 'reading-time'

import {
  type BlogEntry,
  type BlogFrontmatter,
  extractHeadings,
  toArray,
} from './content'

type RawFile<T> = {
  slug: string
  frontmatter: T & { slug?: string }
  content: string
  readingTime: string
}

const contentRoot = path.join(process.cwd(), 'content')

async function readMarkdownCollection<T>(folder: string): Promise<Array<RawFile<T>>> {
  const directory = path.join(contentRoot, folder)

  try {
    const entries = await fs.readdir(directory)
    const markdownFiles = entries.filter((file) => file.endsWith('.md'))

    return Promise.all(
      markdownFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const filePath = path.join(directory, fileName)
        const file = await fs.readFile(filePath, 'utf8')
        const parsed = matter(file)

        return {
          slug,
          frontmatter: parsed.data as T & { slug?: string },
          content: parsed.content.trim(),
          readingTime: readingTime(parsed.content).text,
        }
      }),
    )
  } catch {
    return []
  }
}

export async function getAllBlogPosts(): Promise<BlogEntry[]> {
  const files = await readMarkdownCollection<BlogFrontmatter>('blog')

  return files
    .map(({ slug, frontmatter, content, readingTime: time }) => ({
      slug,
      ...frontmatter,
      tags: toArray(frontmatter.tags),
      readingTime: time,
      content,
      headings: extractHeadings(content),
    }))
    .sort((left, right) => +new Date(right.date) - +new Date(left.date))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogEntry | undefined> {
  const posts = await getAllBlogPosts()
  return posts.find((post) => post.slug === slug)
}
