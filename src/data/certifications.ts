export interface Certification {
  name: string
  issuer: string
  issuerKey: 'anthropic' | 'salesforce'
  year: number
  description: string
  credentialUrl?: string
}

export const certifications: Certification[] = [
  {
    name: 'Claude Certified Associate – Foundations',
    issuer: 'Anthropic',
    issuerKey: 'anthropic',
    year: 2025,
    description: 'Entry-level certification covering Claude\'s core capabilities, safety principles, and foundational usage patterns for real-world applications.',
    credentialUrl: '#',
  },
  {
    name: 'Claude Certified Developer – Foundations',
    issuer: 'Anthropic',
    issuerKey: 'anthropic',
    year: 2025,
    description: 'Developer-focused certification on building with the Claude API — prompt engineering, tool use, and production integration best practices.',
    credentialUrl: '#',
  },
  {
    name: 'Anthropic Claude Code in Action',
    issuer: 'Anthropic',
    issuerKey: 'anthropic',
    year: 2025,
    description: 'Practical certification demonstrating proficiency in using Claude Code for agentic software development and engineering workflows.',
    credentialUrl: '#',
  },
  {
    name: 'Anthropic Claude 101',
    issuer: 'Anthropic',
    issuerKey: 'anthropic',
    year: 2025,
    description: 'Introductory certification covering the fundamentals of Claude AI, responsible usage, and core concepts for working with large language models.',
    credentialUrl: '#',
  },
  {
    name: 'Salesforce Certified Agentforce Specialist',
    issuer: 'Salesforce',
    issuerKey: 'salesforce',
    year: 2025,
    description: 'Validates expertise in building and deploying autonomous AI agents on the Salesforce Agentforce platform for enterprise automation.',
    credentialUrl: '#',
  },
  {
    name: 'Salesforce Certified AI Associate',
    issuer: 'Salesforce',
    issuerKey: 'salesforce',
    year: 2025,
    description: 'Demonstrates understanding of AI capabilities within the Salesforce ecosystem, ethical AI principles, and data-driven decision-making.',
    credentialUrl: '#',
  },
]
