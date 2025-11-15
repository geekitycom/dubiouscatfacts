import fs from 'fs'
import path from 'path'
import CatFactDisplay from './components/CatFactDisplay';

// Force dynamic rendering on each request instead of static generation
export const dynamic = 'force-dynamic'

// Load cat facts and select a random one for initial render
const jsonDirectory = path.join(process.cwd(), 'data')
const fileContents = fs.readFileSync(jsonDirectory + '/catFacts.json', 'utf8')
const facts = JSON.parse(fileContents)

function getRandomFact(): string {
  const randomIndex = Math.floor(Math.random() * facts.facts.length)
  return facts.facts[randomIndex]
}

export default function Home() {
  const initialFact = getRandomFact()

  return (
    <main className="flex min-h-screen flex-col items-center md:justify-center p-4">
      <h1 className="text-7xl text-center font-bold mb-8">Dubious Cat Facts</h1>
      <CatFactDisplay initialFact={initialFact} />
      <footer className="fixed bottom-2 right-2">
        <a 
          href="https://github.com/andrewshell/dubiouscatfacts"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-700 transition-opacity opacity-75 hover:opacity-100"
        >View Source</a>
      </footer>
    </main>
  )
}
