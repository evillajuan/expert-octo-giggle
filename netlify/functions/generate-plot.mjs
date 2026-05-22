import Anthropic from '@anthropic-ai/sdk'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { characterName, theme } = await req.json()
    if (!characterName || !theme) {
      return Response.json({ error: 'characterName and theme are required' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Create a magical children's book plot for a child named "${characterName}" set in a "${theme}" adventure. Keep it whimsical, joyful, and age-appropriate (3-8 years). Respond ONLY with valid JSON, no markdown, no explanation: {"title":"<exciting book title>","summary":"<2-3 sentence whimsical plot summary>","sidekick":"<puppy|kitten|dragon|bunny|robot|fairy>","magicItem":"<wand|cape|map|crown|rocket|shield>","twist":"<one fun surprising plot twist>"}`,
        },
      ],
    })

    const text = message.content[0].text.trim()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text)

    return Response.json(parsed)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export const config = { path: '/api/generate-plot' }
