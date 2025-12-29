import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { palette } = await req.json()

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
      // Return mock data if no API key
      return NextResponse.json({
        breakdown: {
          temperature: 6500,
          tint: 10,
          hue: 0,
          saturation: 0,
          exposure: 0,
          radiance: 0,
          density: 0,
          colorBalance: 'neutral',
          balanceCurve: 'linear',
          chromaCurve: 'standard',
        },
        mock: true
      })
    }

    // Compose the prompt for GPT-4
    const prompt = `Analyze this color palette and estimate professional color grading parameters.

Palette colors: ${JSON.stringify(palette?.dominant || [])}
RGB values: ${JSON.stringify(palette?.rgb || [])}
Temperature: ${palette?.temperature || 'unknown'}

Based on these colors, estimate the following parameters that would create this look:
1. Temperature (in Kelvin, typical range 2500-10000)
2. Tint (-100 to +100, negative=green, positive=magenta)
3. Hue shift (-180 to +180 degrees)
4. Saturation adjustment (-100 to +100)
5. Exposure adjustment (-5 to +5 stops)
6. Radiance/Glow (0-100)
7. Density (0-100)
8. Color Balance (warm/neutral/cool)
9. Balance Curve (linear/s-curve/film)
10. Chroma Curve (standard/vivid/muted)

Respond ONLY with a valid JSON object in this exact format:
{
  "temperature": number,
  "tint": number,
  "hue": number,
  "saturation": number,
  "exposure": number,
  "radiance": number,
  "density": number,
  "colorBalance": "warm" | "neutral" | "cool",
  "balanceCurve": "linear" | "s-curve" | "film",
  "chromaCurve": "standard" | "vivid" | "muted"
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional colorist who analyzes color palettes and provides precise color grading parameters. Always respond with valid JSON only, no markdown or explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
    })

    const responseText = completion.choices[0]?.message?.content || ''
    
    // Parse the JSON response
    let breakdown
    try {
      // Clean up the response in case it has markdown code blocks
      const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim()
      breakdown = JSON.parse(cleanedResponse)
    } catch {
      console.error('Failed to parse GPT response:', responseText)
      // Return fallback values
      breakdown = {
        temperature: 6500,
        tint: 0,
        hue: 0,
        saturation: 0,
        exposure: 0,
        radiance: 0,
        density: 0,
        colorBalance: 'neutral',
        balanceCurve: 'linear',
        chromaCurve: 'standard',
      }
    }

    return NextResponse.json({ breakdown })
  } catch (error) {
    console.error('GPT Breakdown API Error:', error)
    
    // Return mock data on error
    return NextResponse.json({
      breakdown: {
        temperature: 6500,
        tint: 0,
        hue: 0,
        saturation: 0,
        exposure: 0,
        radiance: 0,
        density: 0,
        colorBalance: 'neutral',
        balanceCurve: 'linear',
        chromaCurve: 'standard',
      },
      error: 'Failed to analyze image'
    })
  }
} 