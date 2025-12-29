# FramesWithin - AI-Powered Color Grading & Content Optimization

A full-stack SaaS platform for creators to extract color palettes, perform real-time color grading, and receive AI-powered content optimization suggestions.

## 🚀 Features

### Core Features
- **Color Palette Extraction**: Automatically extract dominant colors, RGB values, and color temperature
- **Real-Time Color Grading**: Professional-grade color grading with brightness, contrast, saturation, and temperature controls
- **AI Content Optimization**: GPT-4 powered suggestions for captions, hashtags, and viral tips
- **Font Detection**: OCR-based font detection from uploaded content
- **Export & Share**: Export as PNG, JSON configs, or LUT files
- **Authentication**: Secure email/password and Google OAuth via Supabase

### Subscription Tiers
- **Creator Basic** (₹149/month): 50 uploads, 15 AI insights, basic grading
- **Creator Pro** (₹499/month): Unlimited AI insights, HSL editing, tone curves, LUT support

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS with dark mode
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Auth, DB, Storage)
- **Image Processing**: Canvas API, color-thief
- **AI**: OpenAI GPT-4
- **Payments**: Stripe (Global), Razorpay (India)
- **Email**: Resend
- **Hosting**: Vercel

## 🎨 Design System

- **Theme**: Dark mode only with matte finish
- **Colors**: Background `#121212`, Cards `#1e1e1e`, Foreground `#e5e5e5`
- **Typography**: Inter font family
- **Gradients**: Purple to cyan for CTAs
- **Components**: Full shadcn/ui integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frameswithin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `OPENAI_API_KEY` - Your OpenAI API key (optional for MVP)
   - `NEXT_PUBLIC_SITE_URL` - Your site URL (http://localhost:3000 for dev)

4. **Set up Supabase Database**
   - Go to your Supabase dashboard → SQL Editor
   - Copy and run the contents of `supabase-setup.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables in Vercel Dashboard**
   - Go to your project settings → Environment Variables
   - Add all variables from `.env.example`

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables during setup
4. Deploy!

### Post-Deployment Setup

1. **Update Supabase Auth Settings**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL to "Site URL"
   - Add `https://your-app.vercel.app/auth/callback` to "Redirect URLs"

2. **Enable Google OAuth (Optional)**
   - Go to Supabase Dashboard → Authentication → Providers → Google
   - Add your Google OAuth credentials

## 🔐 Authentication Flow

- Email/Password signup with email confirmation
- Google OAuth
- Password reset via email
- Protected dashboard routes
- Session management with Supabase SSR

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

   # Razorpay Configuration (for India)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

   # Resend Email Service
   RESEND_API_KEY=your_resend_api_key_here

   # Umami Analytics
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your_umami_website_id_here
   NEXT_PUBLIC_UMAMI_URL=https://analytics.umami.is

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up Supabase Database**
   Create the following tables in your Supabase database:

   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     subscription_tier TEXT CHECK (subscription_tier IN ('basic', 'pro')),
     subscription_status TEXT CHECK (subscription_status IN ('active', 'inactive')),
     usage_count INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Uploads table
   CREATE TABLE uploads (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     file_name TEXT NOT NULL,
     file_url TEXT NOT NULL,
     file_type TEXT CHECK (file_type IN ('image', 'video')),
     thumbnail_url TEXT,
     color_palette TEXT[],
     font_data JSONB,
     grading_data JSONB,
     ai_suggestions JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Presets table
   CREATE TABLE presets (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     name TEXT NOT NULL,
     grading_data JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
frameswithin/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── upload/        # Upload & grading
│   │   │   ├── palette/       # Color palette analysis
│   │   │   ├── insights/      # AI insights
│   │   │   ├── analytics/     # Usage analytics
│   │   │   └── settings/      # User settings
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard components
│   │   └── theme-provider.tsx # Theme provider
│   └── lib/
│       ├── color-utils.ts     # Color processing utilities
│       ├── supabase.ts        # Supabase client
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
└── package.json
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Authentication with email/password
3. Create the database tables (see above)
4. Set up Storage buckets for file uploads
5. Configure Row Level Security (RLS) policies

### OpenAI Setup
1. Get an API key from [OpenAI Platform](https://platform.openai.com)
2. Add the key to your environment variables
3. Ensure you have GPT-4 Vision access

### Payment Setup
1. **Stripe**: Create a Stripe account and get API keys
2. **Razorpay**: Create a Razorpay account for Indian payments
3. Configure webhook endpoints for payment processing

### Email Setup
1. Create a Resend account
2. Add your API key to environment variables
3. Configure email templates for notifications

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
Make sure to set all environment variables in your production environment:
- Supabase credentials
- OpenAI API key
- Payment gateway keys
- Email service credentials
- Analytics tracking

## 📱 Features in Detail

### Color Grading
- Real-time preview with canvas manipulation
- Basic controls: brightness, contrast, saturation, hue, temperature
- Pro features: HSL editing, tone curves, LUT support
- Before/after comparison

### AI Insights
- Visual mood analysis
- Color grading suggestions
- Caption generation
- Hashtag recommendations
- Viral boost tips

### Color Palette
- Automatic color extraction
- RGB and HSL values
- Color temperature analysis
- Export in multiple formats

### Analytics
- Usage tracking
- Performance metrics
- Plan usage monitoring
- Monthly trends

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@frameswithin.com or create an issue in the repository.

---

**FramesWithin** - Craft viral videos with AI-powered color grading ✨
