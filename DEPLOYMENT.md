# Website Deployment Guide

## Quick Steps to Update Your Website

### 1. Test Locally First
```bash
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web
npm run dev
```
- Open your browser to `http://localhost:5173`
- Test the "Liberty League Analytics" button
- Try logging in with: `coach` / `rittigers2025`
- Make sure everything works before deploying

### 2. Build for Production
```bash
npm run build
```
- This creates optimized files for the website
- Wait for it to finish (usually takes 30-60 seconds)

### 3. Deploy to Your Website
```bash
npm run deploy
```
- This automatically uploads your site to GitHub Pages
- Your website will be live at `https://krebstats.com/`
- Takes about 2-3 minutes to go live

## That's It! 🎉

Your website is now updated with Liberty League Analytics integrated.

---

## If Something Goes Wrong

### Problem: Build Fails
**Solution:**
```bash
npm install
npm run build
```

### Problem: Deploy Fails
**Solution:**
```bash
git add .
git commit -m "Update website with Liberty League Analytics"
git push origin main
npm run deploy
```

### Problem: Website Doesn't Update
**Wait 5-10 minutes** - GitHub Pages can take time to update.

### Problem: Login Doesn't Work
**Check:** Make sure you're using the correct credentials:
- Username: `coach`
- Password: `rittigers2025`

---

## Complete Command Sequence

If you want to do everything at once:

```bash
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web
npm run build
npm run deploy
```

**That's literally it.** Your website will be updated in 2-3 minutes.

---

## What Each Command Does

- `npm run dev` - Starts a local test server
- `npm run build` - Prepares files for the internet
- `npm run deploy` - Uploads your site to the internet

## Important Notes

1. **Always test locally first** with `npm run dev`
2. **Don't skip the build step** - it's required before deploy
3. **Wait for each command to finish** before running the next one
4. **Your website URL stays the same**: `https://krebstats.com/`

## Troubleshooting

If anything breaks, you can always:
1. Run `git status` to see what changed
2. Run `git checkout .` to undo all changes
3. Ask for help with the specific error message

---

## Future Updates

Whenever you make changes to your website:
1. Test: `npm run dev`
2. Build: `npm run build` 
3. Deploy: `npm run deploy`

**Remember:** Changes aren't live until you run `npm run deploy`!
