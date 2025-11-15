import fs from 'fs'
import path from 'path'

// Load cat facts once at module initialization
const jsonDirectory = path.join(process.cwd(), 'data')
const fileContents = fs.readFileSync(jsonDirectory + '/catFacts.json', 'utf8')
const facts = JSON.parse(fileContents)

export async function GET() {
  try {
    // Get a random fact
    const randomIndex = Math.floor(Math.random() * facts.facts.length)
    const fact = facts.facts[randomIndex]

    return new Response(JSON.stringify({ fact }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching cat fact:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch cat fact' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

