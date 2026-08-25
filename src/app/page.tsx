import { Intro } from '@/components/Intro'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Blog } from '@/components/Blog'
import { Connect } from '@/components/Connect'
import { Footer } from '@/components/Footer'
import { ClickSound } from '@/components/ClickSound'

export default function Home() {
  return (
    <>
      <Intro />
      <ClickSound />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 w-full">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Blog />
        <Connect />
      </main>
      <footer className="max-w-2xl mx-auto px-4 w-full">
        <Footer />
      </footer>
    </>
  )
}
