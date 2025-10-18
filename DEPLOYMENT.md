# Deployment Guide - Compass PWA

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? compass-pwa (or your choice)
# - In which directory is your code located? ./
# - Want to override settings? No

# After first deployment, future deployments are just:
vercel --prod
```

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Compass PWA with offline support"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/compass-pwa.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Framework Preset: Next.js (auto-detected)
   - Click "Deploy"

### Vercel Configuration

The `vercel.json` file includes:
- ✅ Service Worker headers (Cache-Control, Service-Worker-Allowed)
- ✅ PWA manifest headers (application/manifest+json)
- ✅ Security headers (X-Frame-Options, X-XSS-Protection)

### After Deployment

Your app will be available at:
```
https://your-project-name.vercel.app
```

Or configure a custom domain in Vercel dashboard.

## Testing Your Deployed PWA

### On iOS (iPhone/iPad):

1. **Open Safari** and visit your Vercel URL
2. **Tap Share button** (square with arrow)
3. **Scroll down** and tap "Add to Home Screen"
4. **Tap "Add"** in top right
5. **Open app** from home screen (should look like native app!)
6. **Download a module** using the download button
7. **Enable Airplane Mode** (swipe down, tap airplane icon)
8. **Open app** and verify:
   - ✅ App loads offline
   - ✅ Downloaded module shows "Offline Available" badge
   - ✅ Can access all content in downloaded module
   - ✅ Non-downloaded modules show yellow warning

### On Android (Chrome):

1. **Open Chrome** and visit your Vercel URL
2. **Chrome should prompt** "Install Compass?" or look for "Add to Home Screen" in menu (⋮)
3. **Tap Install**
4. **Open app** from home screen
5. **Download a module**
6. **Enable Airplane Mode** (swipe down, tap airplane icon)
7. **Verify same offline functionality** as iOS

### Developer Testing (Desktop):

**Chrome DevTools:**
1. Open DevTools (F12)
2. Go to **Application tab**
3. Check **Service Workers** - should show "activated and running"
4. Check **Cache Storage** - should show caches after downloading modules
5. Check **IndexedDB** → `compass-db` → `moduleDownloads` - verify download status
6. Toggle **Offline mode** (Network tab or Application → Service Workers → Offline)

**Test Checklist:**
- [ ] Service worker registers successfully
- [ ] Persistent storage requested (check console logs)
- [ ] Can download a module
- [ ] "Offline Available" badge appears after download
- [ ] Offline warning shows for non-downloaded modules when offline
- [ ] Downloaded modules work completely offline
- [ ] Network status detection works (toggle airplane mode)

## Vercel Build Configuration

The project uses:
- **Framework:** Next.js 15
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)
- **Node Version:** 18.x or higher (specified in package.json engines if needed)

## Environment Variables

Currently no environment variables needed. If you add any:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables
3. Redeploy

## Troubleshooting

**Service Worker not registering:**
- Ensure deployed to HTTPS (Vercel provides this automatically)
- Check console for errors
- Verify `public/sw.js` exists in deployment

**PWA install prompt not showing:**
- Android Chrome: May require multiple visits before prompt
- iOS Safari: Manual only (Share → Add to Home Screen)

**Offline mode not working:**
- Ensure you downloaded a module first
- Check Network tab - requests should show "(from ServiceWorker)"
- Verify Cache Storage contains module assets

## Monitoring

**Vercel Analytics:**
- Automatic performance monitoring
- Check Vercel Dashboard → Analytics

**Lighthouse Score:**
Run from Chrome DevTools → Lighthouse:
```bash
# Or via CLI
npm install -g lighthouse
lighthouse https://your-app.vercel.app --view
```

Target scores for PWA:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 100 ✅

