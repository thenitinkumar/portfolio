import { Navbar } from '@/components/Navbar'
import { Certifications } from '@/components/Certifications'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'Stats' }

export default function StatsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 w-full pt-14">
        <Certifications />
      </main>
      <footer className="max-w-2xl mx-auto px-4 w-full">
        <Footer />
      </footer>
    </>
  )
}
