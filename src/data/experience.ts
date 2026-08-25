export interface Job {
  company: string
  role: string
  period: string
  location: string
  description: string
  tags: string[]
}

export const jobs: Job[] = [
  {
    company: 'Deloitte',
    role: 'Consultant · Software Engineer',
    period: '2023 — Present',
    location: 'India',
    description:
      'Building and shipping enterprise-grade web applications for clients across financial services and public sector. Lead front-end architecture decisions, mentor junior engineers, and drive code quality through reviews and documentation.',
    tags: ['React', 'TypeScript', 'Node.js', 'Azure', 'SQL Server'],
  },
  {
    company: 'Freelance',
    role: 'Full Stack Developer',
    period: '2022 — 2023',
    location: 'Remote',
    description:
      'Delivered end-to-end web products for early-stage startups: REST APIs, admin dashboards, and marketing sites. Worked across the full stack from database design to deployment pipelines.',
    tags: ['Next.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'OpenSource',
    role: 'Contributor',
    period: '2021 — Ongoing',
    location: 'GitHub',
    description:
      'Active contributor to open source tooling in the JavaScript ecosystem. Focus on developer tooling, CLI utilities, and documentation improvements.',
    tags: ['JavaScript', 'Rust', 'CLI', 'Open Source'],
  },
]
