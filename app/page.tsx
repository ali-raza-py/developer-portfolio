import { getAllBlogPosts } from '@/lib/content.server'
import { MinecraftWorld } from '@/components/portfolio/minecraft-world'

export default async function Page() {
  const posts = await getAllBlogPosts()
  const articles = posts.slice(0, 3).map(({ slug, title, description, date, category, coverImage }) => ({
    slug,
    title,
    description,
    date,
    category,
    coverImage,
  }))

  return <MinecraftWorld articles={articles} />
}
