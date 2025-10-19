# Deployment Guide for Wuxia App

## Overview
This React + TypeScript + Vite application is configured for deployment on Netlify and Vercel.

## Prerequisites
- Node.js 18 or higher
- Google Gemini API Key (get from https://ai.google.dev/)

## Configuration Files

### netlify.toml
✅ **Configured** - Contains:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects for client-side routing
- Node.js version: 18
- Security headers

### vercel.json
✅ **Configured** - Contains:
- SPA rewrite rules

## Deployment Steps

### Netlify Deployment

1. **Connect Repository**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub account and select this repository

2. **Configure Build Settings** (Auto-detected from netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Set Environment Variables** ⚠️ **REQUIRED**
   - Go to Site settings > Environment variables
   - Add: `GEMINI_API_KEY` = [your-api-key]

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

### Vercel Deployment

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New" > "Project"
   - Import this repository

2. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables** ⚠️ **REQUIRED**
   - Go to Project Settings > Environment Variables
   - Add: `GEMINI_API_KEY` = [your-api-key]

4. **Deploy**
   - Click "Deploy"

## Local Development

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Add your GEMINI_API_KEY to `.env.local`
4. Run `npm install`
5. Run `npm run dev`

## Troubleshooting

### Build Fails
- ✅ Verify Node.js version is 18+
- ✅ Check that all dependencies install correctly
- ✅ Ensure `GEMINI_API_KEY` environment variable is set

### App Doesn't Load
- ✅ Check browser console for errors
- ✅ Verify API key is valid
- ✅ Check that SPA redirects are working (netlify.toml or vercel.json)

### API Errors
- ✅ Confirm GEMINI_API_KEY is set in deployment platform
- ✅ Verify API key has proper permissions
- ✅ Check Google AI Studio quotas

## Files Modified for Deployment

1. ✅ `netlify.toml` - Added complete Netlify configuration
2. ✅ `.env.example` - Created environment variable template
3. ✅ `DEPLOYMENT.md` - This deployment guide

## Security Notes

- ⚠️ Never commit `.env.local` or real API keys to Git
- ✅ Security headers are configured in netlify.toml
- ✅ API keys should only be set in deployment platform dashboards

## Support

For issues related to:
- **Gemini API**: https://ai.google.dev/docs
- **Netlify**: https://docs.netlify.com/
- **Vercel**: https://vercel.com/docs
