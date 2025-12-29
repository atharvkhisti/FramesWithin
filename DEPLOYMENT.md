# Vercel Deployment Guide for FramesWithin

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub/GitLab account (for connecting your repository)

## Environment Variables
Before deploying, make sure to set up the following environment variables in your Vercel project settings:

### Required Environment Variables:
```
# Supabase Configuration (if using authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: OpenAI API Key (for server-side API calls)
# Note: Users provide their own API keys via the app UI
OPENAI_API_KEY=your_openai_api_key_optional
```

## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)
1. Push your code to a GitHub repository
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: **Next.js**
   - Root Directory: `frameswithin` (if deploying from the subfolder)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your project folder
cd frameswithin

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Build Configuration

The project is already configured with:
- **Next.js 15.3.5** with App Router
- **TypeScript** with strict type checking
- **ESLint** for code quality
- **Turbopack** for faster development

### Build Output
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (17/17)
✓ Finalizing page optimization
```

## Post-Deployment Checklist

1. **Verify Environment Variables**
   - Go to Project Settings → Environment Variables
   - Confirm all required variables are set
   - Redeploy if you add new variables

2. **Test Core Features**
   - User sign-up/login (if authentication enabled)
   - OpenAI API key input dialog
   - Image upload and color grading
   - AI insights generation
   - Color palette extraction

3. **Configure Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

4. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor API usage (OpenAI)
   - Review error logs in Vercel dashboard

## Project Structure
```
frameswithin/
├── src/
│   ├── app/           # Next.js app routes
│   ├── components/    # React components
│   ├── features/      # Feature modules (AI, colors, grading)
│   └── lib/          # Utilities and stores
├── public/           # Static assets
└── package.json      # Dependencies
```

## Known Issues & Warnings

### Minor Warning (Non-blocking):
- `jsx-a11y/alt-text` warning in dashboard/page.tsx
- This is a Lucide icon component, not an HTML image
- Does not affect deployment or functionality

## Troubleshooting

### Build Fails
- Check Node.js version (use Node 18+)
- Verify all dependencies are installed
- Review environment variables

### Runtime Errors
- Check browser console for client-side errors
- Review Vercel Function logs for server-side errors
- Ensure API keys are correctly set

### API Key Issues
- Users must provide their own OpenAI API key
- Keys are stored in browser localStorage
- No server-side storage required for user API keys

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **OpenAI API Docs**: https://platform.openai.com/docs

## Security Notes

- User API keys are stored locally (localStorage)
- Never commit `.env.local` to version control
- Keep Supabase keys secure
- Use Supabase Row Level Security (RLS) policies
- Implement rate limiting for API routes

---

**Deployment Status**: ✅ Production Ready
**Last Build**: Successful
**Build Time**: ~4-5 seconds
**Bundle Size**: ~102 kB (First Load JS)
