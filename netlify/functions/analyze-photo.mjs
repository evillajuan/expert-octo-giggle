import Anthropic from '@anthropic-ai/sdk'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { imageBase64, mediaType } = await req.json()
    if (!imageBase64) {
      return Response.json({ error: 'imageBase64 is required' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Analyze this photo and identify features to create a cartoon character for a children\'s book. Respond ONLY with valid JSON, no markdown, no explanation: {"skinTone":"<fair|light|medium|tan|brown|dark>","hairColor":"<blonde|brown|black|red|auburn|pink>","hairStyle":"<tufts|wavy|curly|long|bun|spiky>"}',
            },
          ],
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

export const config = { path: '/api/analyze-photo' }
