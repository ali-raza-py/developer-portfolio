const fs = require('node:fs')
const path = require('node:path')
const matter = require('gray-matter')

const siteUrl = 'https://ali-raza-py.me'
const contentRoot = path.join(process.cwd(), 'content')
const publicRoot = path.join(process.cwd(), 'public')

function readMarkdownFiles(folder) {
  const directory = path.join(contentRoot, folder)

  if (!fs.existsSync(directory)) return []

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(directory, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const parsed = matter(raw)
      const slug = file.replace(/\.md$/, '')

      return {
        slug,
        ...parsed.data,
        content: parsed.content.trim(),
      }
    })
}

function writeFile(fileName, content) {
  fs.writeFileSync(path.join(publicRoot, fileName), content)
}

function generateRobots() {
  writeFile(
    'robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  )
}

function readProjectSlugs() {
  const source = path.join(process.cwd(), 'lib', 'projects.ts')
  if (!fs.existsSync(source)) return []
  return [...fs.readFileSync(source, 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map(
    (match) => match[1],
  )
}

function generateSitemap() {
  // Case-study slugs come from lib/projects.ts (single source of truth);
  // markdown blog posts are read from content/blog.
  const projectSlugs = readProjectSlugs()
  const posts = readMarkdownFiles('blog')
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/projects`,
    `${siteUrl}/blog`,
    ...projectSlugs.map((slug) => `${siteUrl}/projects/${slug}`),
    ...posts.map((post) => `${siteUrl}/blog/${post.slug}`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>\n`

  writeFile('sitemap.xml', xml)
}

function generateRss() {
  const posts = readMarkdownFiles('blog').sort(
    (left, right) => new Date(right.date) - new Date(left.date),
  )

  const items = posts
    .map(
      (post) => `  <item>\n    <title>${escapeXml(post.title)}</title>\n    <link>${siteUrl}/blog/${post.slug}</link>\n    <guid>${siteUrl}/blog/${post.slug}</guid>\n    <description>${escapeXml(post.description)}</description>\n    <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n  </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Ali Raza Blog</title>\n  <link>${siteUrl}/blog</link>\n  <description>Markdown-first developer blog updates.</description>\n${items}\n</channel>\n</rss>\n`

  writeFile('rss.xml', xml)
}

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

generateRobots()
generateSitemap()
generateRss()
