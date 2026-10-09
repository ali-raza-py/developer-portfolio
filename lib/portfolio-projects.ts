import { projects as caseStudyProjects } from '@/lib/projects'

export type PortfolioProject = {
  name: string
  slug: string
  description: string
  stack: string[]
  status: string
  url?: string
  githubUrl?: string
  accent: 'gold' | 'green' | 'violet' | 'blue' | 'orange'
}

const caseStudyBySlug = new Map(caseStudyProjects.map((project) => [project.slug, project]))

export const portfolioProjects: PortfolioProject[] = [
  {
    name: caseStudyBySlug.get('medicare-ai')?.title ?? 'MediCare AI',
    slug: 'medicare-ai',
    description: caseStudyBySlug.get('medicare-ai')?.shortDescription ?? 'AI workflow for turning messy documents into structured, useful outputs.',
    stack: caseStudyBySlug.get('medicare-ai')?.stack.slice(0, 4) ?? ['Next.js', 'Python', 'AI', 'OCR'],
    status: 'Prototype shipped',
    url: caseStudyBySlug.get('medicare-ai')?.liveUrl,
    githubUrl: caseStudyBySlug.get('medicare-ai')?.githubUrl,
    accent: 'green',
  },
  {
    name: caseStudyBySlug.get('ai-hub')?.title ?? 'AI-HUB',
    slug: 'ai-hub',
    description: caseStudyBySlug.get('ai-hub')?.shortDescription ?? 'Curated tools and practical AI references for product teams.',
    stack: caseStudyBySlug.get('ai-hub')?.stack.slice(0, 4) ?? ['Next.js', 'TypeScript', 'AI', 'UX'],
    status: 'Live',
    url: caseStudyBySlug.get('ai-hub')?.liveUrl,
    githubUrl: caseStudyBySlug.get('ai-hub')?.githubUrl,
    accent: 'violet',
  },
  {
    name: caseStudyBySlug.get('algorify')?.title ?? 'Algorify',
    slug: 'algorify',
    description: caseStudyBySlug.get('algorify')?.shortDescription ?? 'An interactive visual lab for understanding algorithms and state transitions.',
    stack: caseStudyBySlug.get('algorify')?.stack.slice(0, 4) ?? ['React', 'TypeScript', 'Algorithms', 'Visualization'],
    status: 'Live',
    url: caseStudyBySlug.get('algorify')?.liveUrl,
    githubUrl: caseStudyBySlug.get('algorify')?.githubUrl,
    accent: 'orange',
  },
  {
    name: 'DSA Vizer',
    slug: 'dsa-vizer',
    description: 'Interactive data structures and algorithms visualizer for learning patterns and trade-offs.',
    stack: ['Python', 'Flask', 'Algorithms', 'Visualization'],
    status: 'Details pending verification',
    url: 'https://aliraza786.pythonanywhere.com/l',
    accent: 'blue',
  },
  {
    name: 'Code Yaar',
    slug: 'code-yaar',
    description: caseStudyBySlug.get('code-yaar')?.shortDescription ?? 'A learning product for building momentum through small, realistic technical projects.',
    stack: caseStudyBySlug.get('code-yaar')?.stack.slice(0, 4) ?? ['Next.js', 'UX', 'Community', 'Education'],
    status: 'In progress',
    githubUrl: caseStudyBySlug.get('code-yaar')?.githubUrl,
    accent: 'gold',
  },
]
