# FramesWithin

<div align="center">
  <h3>🎨 AI-Powered Color Grading & Content Optimization Platform</h3>
  <p>Professional-grade color grading tools with AI-powered insights for content creators</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**FramesWithin** is a modern web application that empowers content creators with professional color grading tools and AI-powered insights. Built with Next.js 15 and TypeScript, it provides real-time color manipulation, palette extraction, and intelligent content optimization suggestions powered by OpenAI's GPT models.

### Why FramesWithin?

- **🎯 User-Owned AI**: Bring your own OpenAI API key - no subscriptions or hidden fees
- **🚀 Real-Time Processing**: Instant color grading preview with advanced controls
- **🎨 Professional Tools**: 10+ color grading parameters including brightness, contrast, saturation, HSL curves, and more
- **🤖 AI-Powered Insights**: Get intelligent suggestions for captions, hashtags, and viral content optimization
- **📊 Color Intelligence**: Automatic palette extraction with RGB, HSL, and temperature analysis
- **💾 Export Flexibility**: Save your work as PNG, JSON config, or LUT files
- **🔒 Secure Authentication**: Built on Supabase with email/password and Google OAuth support

---

## ✨ Features

### 🎨 Advanced Color Grading

**Basic Controls:**
- Brightness adjustment (-100 to +100)
- Contrast control (-100 to +100)
- Saturation intensity (0 to 200%)
- Hue rotation (0-360°)
- Color temperature (2000K to 11000K)

**Advanced Controls:**
- Vibrance enhancement
- Exposure adjustment
- Shadow/Highlight control
- Clarity enhancement
- Tint adjustment

**Creative Tools:**
- Split toning
- Color filters
- Vignette effect
- Film grain simulation

### 🎯 AI-Powered Features

- **Visual Mood Analysis**: AI interpretation of your content's aesthetic and emotional tone
- **Color Grading Suggestions**: Intelligent recommendations based on visual analysis
- **Content Optimization**: Captions, hashtags, and engagement tips
- **Viral Boost Strategies**: Data-driven suggestions to maximize reach

### 🎨 Color Palette Extraction

- Automatic dominant color detection
- RGB and HSL color values
- Color temperature analysis (warm/cool/neutral)
- Visual color wheel representation
- Export palette data as JSON

### 📊 Analytics Dashboard

- Upload statistics and tracking
- Color palette history
- AI insights usage metrics
- Export activity monitoring
- Visual trend charts and graphs

### 💾 Export & Sharing

- **PNG Export**: High-quality image output
- **JSON Config**: Save and share grading settings
- **LUT Files**: Professional color grading lookup tables

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15.3.5](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom dark theme
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend & Services
- **Authentication**: [Supabase](https://supabase.com/) (Email/Password + Google OAuth)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **AI Integration**: [OpenAI API](https://platform.openai.com/) (GPT-4 Vision)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications

### State Management & Utilities
- **Global State**: [Zustand](https://zustand-demo.pmnd.rs/) with persist middleware
- **Image Processing**: HTML5 Canvas API
- **Color Analysis**: [color-thief-react](https://github.com/Leon-Hoeck/color-thief-react)
- **Form Handling**: React Hook Form (planned)
- **Validation**: Zod (planned)

### Development Tools
- **Build Tool**: Turbopack (Next.js 15)
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier (recommended)
- **Version Control**: Git

### Deployment
- **Hosting**: [Vercel](https://vercel.com/) (optimized for Next.js)
- **CI/CD**: GitHub Actions (optional)
- **Monitoring**: Vercel Analytics

---

## 🎨 Design System

### Theme
- **Mode**: Dark mode with matte finish
- **Background**: `#121212` (Deep charcoal)
- **Surface**: `#1e1e1e` (Elevated cards)
- **Text**: `#e5e5e5` (High contrast white)
- **Accents**: Purple (#a855f7) to Cyan (#06b6d4) gradients

### Typography
- **Font Family**: Inter (Variable font)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Component Library
- Full integration with **shadcn/ui** components
- Custom color grading controls
- Responsive layout system
- Accessible by default (WCAG 2.1 AA)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/frameswithin.git
   cd frameswithin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Then configure the following variables:
   ```env
   # Supabase Configuration (Required)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # App Configuration (Required)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # OpenAI Configuration (Optional - Users provide their own keys)
   # Only needed for server-side operations if implemented
   OPENAI_API_KEY=your_openai_api_key_optional
   ```

4. **Set up Supabase**
   
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings → API to get your URL and anon key
   - Run the database setup script:
     ```bash
     # In Supabase Dashboard → SQL Editor, run:
     # Contents of supabase-setup.sql
     ```
   - Enable Authentication providers (Email/Password and optionally Google OAuth)
   - Set up Storage buckets for file uploads

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start Guide

1. **Sign Up**: Create an account using email/password or Google OAuth
2. **API Key Setup**: On first login, you'll be prompted to enter your OpenAI API key
3. **Upload Content**: Go to Dashboard → Upload and select an image or video
4. **Apply Grading**: Use the real-time color grading controls to enhance your content
5. **Get AI Insights**: Navigate to Insights to receive AI-powered optimization suggestions
6. **Export**: Save your graded content as PNG, JSON config, or LUT file

---

## 📁 Project Structure

```
frameswithin/
├── public/                      # Static assets
│   ├── file.svg
│   ├── globe.svg
│   └── vercel.svg
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   ├── ai-insights/    # AI insights endpoint
│   │   │   └── gpt-breakdown/  # GPT color analysis
│   │   ├── auth/                # Authentication callbacks
│   │   ├── dashboard/           # Protected dashboard routes
│   │   │   ├── analytics/      # Usage analytics page
│   │   │   ├── insights/       # AI insights page
│   │   │   ├── palette/        # Color palette page
│   │   │   ├── settings/       # User settings page
│   │   │   ├── upload/         # Upload & grading page
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   └── page.tsx        # Dashboard home
│   │   ├── forgot-password/    # Password reset
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/              # React components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── header.tsx      # Dashboard header
│   │   │   └── sidebar.tsx     # Navigation sidebar
│   │   ├── grading-tools/      # Color grading components
│   │   │   ├── AdvancedGradingControls.tsx
│   │   │   ├── BreakdownPanel.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   └── SliderControl.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── slider.tsx
│   │   │   └── ... (30+ components)
│   │   ├── api-key-dialog.tsx  # API key management
│   │   ├── auth-provider.tsx   # Auth context
│   │   ├── charts/             # Analytics charts
│   │   └── theme-provider.tsx  # Theme context
│   ├── features/               # Feature modules
│   │   ├── ai/                 # AI integration
│   │   │   ├── index.ts
│   │   │   └── insights.ts
│   │   ├── colors/             # Color utilities
│   │   ├── fonts/              # Font detection
│   │   └── grading/            # Grading algorithms
│   ├── lib/                    # Utility libraries
│   │   ├── color-utils.ts      # Color processing
│   │   ├── settings-store.ts   # User preferences
│   │   ├── stats-store.ts      # Analytics state
│   │   ├── store.ts            # Global app state
│   │   ├── supabase.ts         # Supabase client
│   │   ├── supabase-browser.ts # Browser client
│   │   ├── supabase-middleware.ts # Auth middleware
│   │   ├── supabase-server.ts  # Server client
│   │   └── utils.ts            # Helper functions
│   └── middleware.ts           # Next.js middleware
├── .env.local                  # Environment variables (git-ignored)
├── .gitignore                  # Git ignore rules
├── components.json             # shadcn/ui config
├── DEPLOYMENT.md               # Deployment guide
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # This file
├── supabase-setup.sql          # Database schema
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment config
```

---

## 🔧 Environment Setup

### Required Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change to your production URL
```

### Optional Environment Variables

```env
# OpenAI API Key (for server-side operations)
# Note: Users provide their own keys via the UI
OPENAI_API_KEY=sk-...

# Analytics (if implementing)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
NEXT_PUBLIC_UMAMI_URL=https://analytics.umami.is
```

### Supabase Setup Steps

1. **Create Authentication Tables**
   ```sql
   -- Users are handled by Supabase Auth automatically
   -- Create additional tables as needed
   ```

2. **Enable Authentication Providers**
   - Email/Password (enabled by default)
   - Google OAuth (requires Google Cloud credentials)

3. **Configure Storage**
   - Create a `uploads` bucket for user content
   - Set appropriate policies for file access

4. **Set URL Configuration**
   - Site URL: Your production domain
   - Redirect URLs: Include auth callback routes

### Google OAuth Setup (Optional)

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
5. Add credentials to Supabase Dashboard → Authentication → Providers → Google

---

## 💻 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/your-feature-name
   # Make your changes
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

2. **Testing**
   - Test all features locally before committing
   - Verify authentication flows work correctly
   - Check color grading accuracy on different images
   - Test AI insights with valid API keys

3. **Code Quality**
   - Follow TypeScript best practices
   - Use ESLint to catch issues
   - Maintain consistent code style
   - Write meaningful commit messages

### Local Development Tips

- **Hot Module Replacement**: Changes reflect instantly without full page reload
- **TypeScript Errors**: Check your IDE for real-time type checking
- **API Keys**: Store in `.env.local` (never commit)
- **Browser DevTools**: Use React DevTools for component debugging
- **Network Tab**: Monitor API calls and performance

---

## 🚀 Deployment

### Deploying to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications and offers seamless integration.

#### Method 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com/)
   - Click "Import Project"
   - Select your repository
   - Configure environment variables
   - Click "Deploy"

3. **Configure Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL)

#### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Post-Deployment Configuration

1. **Update Supabase Settings**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Update Site URL to your Vercel domain
   - Add `https://your-app.vercel.app/auth/callback` to Redirect URLs

2. **Test Production Build**
   - Verify authentication works
   - Test file uploads
   - Confirm API key storage
   - Check color grading functionality

3. **Monitor Performance**
   - Use Vercel Analytics
   - Check error logs in Vercel Dashboard
   - Monitor API response times

### Alternative Deployment Options

<details>
<summary><b>Deploy to Netlify</b></summary>

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```
</details>

<details>
<summary><b>Deploy with Docker</b></summary>

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```
</details>

---

## 🏗 Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js 15 App Router                     │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │ │
│  │  │   Landing    │  │  Dashboard   │  │    Auth    │  │ │
│  │  │     Page     │  │    Pages     │  │   Pages    │  │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─── Supabase Client (Auth, Storage)
                              ├─── Zustand (State Management)
                              └─── Canvas API (Image Processing)
                              
┌─────────────────────────────────────────────────────────────┐
│                      API Routes (Next.js)                    │
│  ┌────────────────┐         ┌──────────────────────────┐   │
│  │  /api/gpt-     │────────▶│   OpenAI GPT-4 Vision    │   │
│  │   breakdown    │         │   (Color Analysis)       │   │
│  └────────────────┘         └──────────────────────────┘   │
│  ┌────────────────┐         ┌──────────────────────────┐   │
│  │ /api/ai-       │────────▶│   OpenAI GPT-4           │   │
│  │  insights      │         │   (Content Insights)     │   │
│  └────────────────┘         └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Supabase Backend                      │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Auth      │  │  PostgreSQL  │  │   Storage        │   │
│  │  (Users)   │  │  (Metadata)  │  │   (Files)        │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication**
   - User signs up/logs in via Supabase Auth
   - Session stored in cookies (httpOnly, secure)
   - Protected routes check authentication status

2. **Content Upload**
   - File uploaded to client-side canvas
   - Color palette extracted using color-thief
   - Image data stored in app state (Zustand)
   - Optional: Upload to Supabase Storage

3. **Color Grading**
   - Real-time canvas manipulation
   - Adjustments applied via pixel data transformation
   - Preview updates instantly
   - Settings stored in local state

4. **AI Analysis**
   - Image data sent to Next.js API route
   - API route calls OpenAI with user's API key
   - Response parsed and formatted
   - Insights displayed in dashboard

5. **Export**
   - Canvas.toBlob() generates image file
   - JSON config serialized from state
   - LUT file generated from color curves
   - Download triggered via browser API

### State Management Strategy

```typescript
// Global App State (Zustand)
- uploadedFile: File | null
- uploadedUrl: string | null
- gradingSettings: GradingSettings
- palette: Palette | null
- user: User | null

// User Preferences (Zustand Persist)
- apiKey: string (encrypted in localStorage)
- theme: 'dark' | 'light'
- showAdvanced: boolean

// Analytics State (Zustand Persist)
- totalUploads: number
- totalPalettes: number
- totalExports: number
- recentActivity: Activity[]
```

---
---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or improvements
- 📖 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

### Development Setup

1. Fork the repository
2. Clone your fork
   ```bash
   git clone https://github.com/your-username/frameswithin.git
   ```
3. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. Make your changes
5. Commit with descriptive messages
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. Push to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing code patterns and structure
- Write meaningful variable and function names
- Add comments for complex logic
- Ensure ESLint passes before committing
- Test your changes thoroughly

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if needed
- Add tests for new features (when applicable)
- Ensure all tests pass
- Request review from maintainers

---

## 🐛 Known Issues & Roadmap

### Known Issues

- [ ] Large file uploads (>50MB) may timeout
- [ ] Safari canvas rendering quirks
- [ ] Mobile touch gestures for sliders need improvement

### Roadmap

**Version 1.1** (Q1 2026)
- [ ] Batch image processing
- [ ] Custom LUT import
- [ ] Preset management system
- [ ] Keyboard shortcuts

**Version 1.2** (Q2 2026)
- [ ] Video color grading support
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Advanced tone curves

**Version 2.0** (Q3 2026)
- [ ] AI model fine-tuning
- [ ] Plugin ecosystem
- [ ] Desktop application (Electron)
- [ ] API for third-party integrations

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 FramesWithin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🆘 Support & Community

### Getting Help

- 📖 **Documentation**: Check this README and [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/frameswithin/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/frameswithin/discussions)
- 📧 **Email**: support@frameswithin.com

### Frequently Asked Questions

<details>
<summary><b>Do I need to pay for the OpenAI API?</b></summary>

Yes, you'll need your own OpenAI API key. FramesWithin uses a "bring your own key" model, so you only pay for what you use directly to OpenAI. Get your key at [platform.openai.com](https://platform.openai.com/).
</details>

<details>
<summary><b>Can I use this without an OpenAI API key?</b></summary>

Yes! The color grading tools work completely independently. You only need an API key for the AI insights feature.
</details>

<details>
<summary><b>Is my API key stored securely?</b></summary>

Yes, your API key is encrypted and stored in your browser's localStorage. It's never sent to our servers (only directly to OpenAI APIs).
</details>

<details>
<summary><b>What image formats are supported?</b></summary>

We support JPEG, PNG, WebP, and GIF images. Video support (MP4, WebM) is in development.
</details>

<details>
<summary><b>Can I use this commercially?</b></summary>

Yes! The MIT license allows commercial use. However, ensure you comply with OpenAI's terms of service for commercial API usage.
</details>

<details>
<summary><b>How do I report security vulnerabilities?</b></summary>

Please email security@frameswithin.com directly. Do not open public issues for security concerns.
</details>

---

## 🙏 Acknowledgments

### Built With

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [OpenAI](https://openai.com/) - AI-Powered Insights
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable Components
- [Zustand](https://zustand-demo.pmnd.rs/) - State Management
- [Lucide Icons](https://lucide.dev/) - Beautiful Icons
- [Recharts](https://recharts.org/) - Charting Library

### Inspiration

- Adobe Lightroom's color grading interface
- Instagram's filter system
- DaVinci Resolve's color wheels
- Modern dark-mode design trends

### Contributors

Thanks to all the contributors who have helped make this project better!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This section is auto-generated via all-contributors bot -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/frameswithin?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/frameswithin?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/frameswithin)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/frameswithin)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/frameswithin)
![GitHub license](https://img.shields.io/github/license/yourusername/frameswithin)

---

<div align="center">
  <p><strong>FramesWithin</strong> - Craft viral content with AI-powered color grading ✨</p>
  <p>Made with ❤️ by the FramesWithin Team</p>
  <p>
    <a href="https://frameswithin.com">Website</a> •
    <a href="https://github.com/yourusername/frameswithin">GitHub</a> •
    <a href="https://twitter.com/frameswithin">Twitter</a> •
    <a href="https://discord.gg/frameswithin">Discord</a>
  </p>
  
  ### Star History
  
  [![Star History Chart](https://api.star-history.com/svg?repos=yourusername/frameswithin&type=Date)](https://star-history.com/#yourusername/frameswithin&Date)
</div>

---

**Note**: This is an open-source project. Feel free to use, modify, and distribute according to the MIT license. If you find it useful, please consider giving it a ⭐️ on GitHub!
