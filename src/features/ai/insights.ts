export interface AIInsight {
  visualMood: string
  suggestions: string[]
  captions: string[]
  hashtags: string[]
  viralTips: string[]
}

export const mockInsights: AIInsight = {
  visualMood: "Cinematic sunset with warm, golden tones creating a dreamy, nostalgic atmosphere. The composition suggests a story of adventure and discovery.",
  suggestions: [
    "Increase saturation by 15% to make the sunset colors more vibrant",
    "Add a subtle vignette to draw focus to the center",
    "Consider warming the temperature by 10% for a more golden hour feel",
    "Boost contrast slightly to enhance the dramatic sky",
    "Apply a subtle film grain for a more cinematic look"
  ],
  captions: [
    "Golden hour magic ✨ When the world turns to gold and everything feels possible",
    "Sunset vibes only 🌅 This is what dreams are made of",
    "Chasing light, finding magic ✨ The golden hour never disappoints",
    "When nature puts on its best show 🌅 Golden hour perfection",
    "This sunset hits different ✨ Pure magic in every frame"
  ],
  hashtags: [
    "#goldenhour", "#sunset", "#cinematic", "#goldenhourphotography", 
    "#sunsetphotography", "#nature", "#photography", "#viral", 
    "#trending", "#beautiful", "#magic", "#goldenhourmagic"
  ],
  viralTips: [
    "Post during peak engagement hours (6-9 PM) for maximum reach",
    "Use trending audio that matches the mood of your content",
    "Create a series of similar sunset shots to build anticipation",
    "Engage with comments within the first hour of posting",
    "Cross-post to multiple platforms with platform-specific captions"
  ]
} 