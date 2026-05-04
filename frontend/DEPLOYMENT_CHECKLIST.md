# 🚀 Deployment Checklist

## Quick Fix Steps

### 1. ✅ Add Environment Variables to Vercel

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these **EXACTLY** as shown:

```
Name: VITE_SUPABASE_URL
Value: https://iwymkieoscqjjiwrdyxe.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM
Environments: ✅ Production ✅ Preview ✅ Development
```

### 2. 🔄 Redeploy

**IMPORTANT:** Environment variables only apply to NEW deployments!

**Option A - Vercel Dashboard:**
- Go to Deployments tab
- Click ⋯ (three dots) on latest deployment
- Click "Redeploy"

**Option B - Git Push:**
```bash
git add .
git commit -m "Configure environment variables"
git push
```

**Option C - Vercel CLI:**
```bash
vercel --prod
```

### 3. 🧪 Test

1. Wait for deployment to complete
2. Visit your deployed site
3. Try to login/signup
4. Should work now! ✨

---

## If Still Not Working

### Test Locally First

```bash
cd frontend
npm run dev
```

Visit http://localhost:8080 and test login. If this works, it's definitely a deployment config issue.

### Open Test Page

Open `test-supabase-connection.html` in your browser to verify Supabase is accessible.

### Check Browser Console

1. Open your deployed site
2. Press F12 (DevTools)
3. Go to Console tab
4. Try to login
5. Look for error messages
6. Share the error here for help

### Common Issues

❌ **"Missing Supabase environment variables"**
- Variable names must be EXACTLY: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check for typos

❌ **Still getting 404**
- Did you redeploy AFTER adding variables?
- Clear browser cache (Ctrl+Shift+Delete)

❌ **Variables not showing in build**
- Make sure variables are set for "Production" environment
- Redeploy from scratch

---

## Verification Commands

Test Supabase is accessible:
```bash
curl -I https://iwymkieoscqjjiwrdyxe.supabase.co/auth/v1/health
```

Should return: `HTTP/2 200`

---

## Need Help?

Share these details:
1. ✅ Confirmed environment variables are added to Vercel
2. ✅ Confirmed you redeployed after adding them
3. 📸 Screenshot of error in browser console
4. 🔗 Your deployment URL
