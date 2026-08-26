import {
  siTypescript,
  siJavascript,
  siPython,
  siOpenjdk,
  siRust,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siShadcnui,
  siFramer,
  siNodedotjs,
  siExpress,
  siFastapi,
  siSpring,
  siGraphql,
  siDocker,
  siKubernetes,
  siTerraform,
  siPostgresql,
  siRedis,
  siMongodb,
  siLangchain,
  siVercel,
  siGit,
  siLinux,
  siVuedotjs,
  siNuxt,
  siRedux,
  siZod,
  siPrisma,
} from 'simple-icons'

export interface TechIconDef {
  path: string
  hex: string
}

const icon = (si: { path: string; hex: string }): TechIconDef => ({
  path: si.path,
  hex: si.hex,
})

// Clean cloud icon for AWS (wordmark renders as a blob at badge size)
const AWS_PATH =
  'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'

const AZURE_PATH =
  'M.pdf 0 8.374 0 16.02 13.15 7.886 24H.056L8.068 13.15.001 0zm8.374 0h8.015L24 24H8.015L12.508 17.25 5.88 6.75z'

const OPENAI_PATH =
  'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.856 19.99a4.496 4.496 0 0 1-6.257-1.686zm-1.17-10.51A4.485 4.485 0 0 1 4.78 5.556l-.02.153v5.516a.809.809 0 0 0 .391.681l5.833 3.369-2.02 1.167a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.43 7.793zm16.38 3.865l-5.833-3.369 2.019-1.164a.076.076 0 0 1 .072 0l4.83 2.786a4.494 4.494 0 0 1-.695 8.108v-5.67a.79.79 0 0 0-.393-.691zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.29 9.137V6.804a.066.066 0 0 1 .026-.06l4.834-2.789a4.494 4.494 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.494 4.494 0 0 1 7.375-3.453l-.142.08L8.97 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z'

export const TECH_ICONS: Record<string, TechIconDef> = {
  TypeScript:      icon(siTypescript),
  JavaScript:      icon(siJavascript),
  Python:          icon(siPython),
  Java:            { path: siOpenjdk.path, hex: 'ED8B00' },
  Rust:            icon(siRust),
  React:           icon(siReact),
  'Next.js':       icon(siNextdotjs),
  'Tailwind CSS':  icon(siTailwindcss),
  'shadcn/ui':     icon(siShadcnui),
  'Framer Motion': icon(siFramer),
  'Node.js':       icon(siNodedotjs),
  Express:         icon(siExpress),
  FastAPI:         icon(siFastapi),
  'Spring Boot':   icon(siSpring),
  GraphQL:         icon(siGraphql),
  Azure:           { path: AZURE_PATH, hex: '0078D4' },
  AWS:             { path: AWS_PATH, hex: 'FF9900' },
  Docker:          icon(siDocker),
  Kubernetes:      icon(siKubernetes),
  Terraform:       icon(siTerraform),
  PostgreSQL:      icon(siPostgresql),
  Redis:           icon(siRedis),
  MongoDB:         icon(siMongodb),
  'OpenAI API':    { path: OPENAI_PATH, hex: '412991' },
  LangChain:       icon(siLangchain),
  Vercel:          icon(siVercel),
  Git:             icon(siGit),
  Linux:           icon(siLinux),
  'Vue.js':        icon(siVuedotjs),
  'Nuxt.js':       icon(siNuxt),
  Redux:           icon(siRedux),
  Zod:             icon(siZod),
  Prisma:          icon(siPrisma),
}
