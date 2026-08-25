export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  year: string
}

export const projects: Project[] = [
  {
    title: 'DevBoard',
    description:
      'A developer productivity dashboard that aggregates PR reviews, CI status, and deployment metrics in a single unified view.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel'],
    year: '2024',
  },
  {
    title: 'CloudSync',
    description:
      'Lightweight file synchronisation CLI that watches a local directory and mirrors changes to Azure Blob Storage with conflict resolution.',
    tags: ['Python', 'Azure SDK', 'CLI'],
    year: '2024',
  },
  {
    title: 'FlowAPI',
    description:
      'Visual REST API orchestration tool — chain endpoints, transform payloads, and schedule recurring runs without writing glue code.',
    tags: ['React', 'Node.js', 'Redis', 'Docker'],
    year: '2023',
  },
  {
    title: 'DocuMind',
    description:
      'Document intelligence platform that ingests PDFs and Word files, extracts structured data using LLMs, and exports to JSON/Excel.',
    tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
    year: '2023',
  },
]
