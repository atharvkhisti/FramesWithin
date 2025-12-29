import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  try {
    const { palette, imageDescription, apiKey } = await req.json()

    // Check if API key is provided
    if (!apiKey || apiKey === 'your_openai_api_key') {
      // Return mock data if no API key
      return NextResponse.json({
        insights: {
          visualMood: "Cinematic tones creating an engaging, professional atmosphere. The composition suggests quality and attention to detail.",
          suggestions: [
            "Increase saturation by 15% to make colors more vibrant",
            "Add a subtle vignette to draw focus to the center",
            "Consider warming the temperature for a more inviting feel",
            "Boost contrast slightly to enhance visual depth",
            "Apply subtle film grain for a cinematic look"
          ],
          captions: [
            "Creating magic one frame at a time ✨",
            "When colors tell the story 🎨",
            "Perfection in every pixel",
            "This is what dreams look like 🌟",
            "Crafted with passion and precision"
          ],
          hashtags: [
            "#contentcreator", "#visualart", "#cinematography",
            "#colorgrading", "#creativeprocess", "#digitalart",
            "#photography", "#viral", "#trending", "#aesthetic"
          ],
          viralTips: [
            "Post during peak engagement hours (6-9 PM) for maximum reach",
            "Use trending audio that matches your content mood",
            "Create a series to build anticipation with your audience",
            "Engage with comments within the first hour of posting",
            "Cross-post to multiple platforms with tailored captions"
          ]
        },
        mock: true
      })
    }

    // Initialize OpenAI with user's API key
    const openai = new OpenAI({
      apiKey: apiKey,
    })

    const prompt = `Analyze this content for social media optimization.

Color palette: ${JSON.stringify(palette?.dominant || [])}
Color temperature: ${palette?.temperature || 'neutral'}
${imageDescription ? `Image description: ${imageDescription}` : ''}

Provide insights to help this content go viral. Include:
1. Visual mood description (2-3 sentences about the emotional impact)
2. 5 specific visual improvement suggestions
3. 5 engaging caption options with emojis
4. 12 relevant hashtags (without # symbol)
5. 5 viral tips for posting this content

Respond ONLY with a valid JSON object:
{
  "visualMood": "string",
  "suggestions": ["string", "string", "string", "string", "string"],
  "captions": ["string", "string", "string", "string", "string"],
  "hashtags": ["string", "string", ...12 total],
  "viralTips": ["string", "string", "string", "string", "string"]
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a social media expert and content strategist who helps creators optimize their content for maximum engagement. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const responseText = completion.choices[0]?.message?.content || ''
    
    let insights
    try {
      const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim()
      insights = JSON.parse(cleanedResponse)
    } catch {
      console.error('Failed to parse GPT response:', responseText)
      return NextResponse.json({
        insights: null,
        error: 'Failed to parse AI response'
      }, { status: 500 })
    }

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('AI Insights API Error:', error)
    
    return NextResponse.json({
      insights: null,
      error: 'Failed to generate insights'
    }, { status: 500 })
  }
}
