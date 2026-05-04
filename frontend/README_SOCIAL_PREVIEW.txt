================================================================================
  FIX SOCIAL MEDIA PREVIEW - SIMPLE INSTRUCTIONS
================================================================================

PROBLEM: WhatsApp shows only text, no image

SOLUTION: Follow these 3 steps EXACTLY

================================================================================
STEP 1: DEPLOY (2 minutes)
================================================================================

Run these commands:

    git add .
    git commit -m "Fix social preview"
    git push

Wait for Vercel to finish deploying (check Vercel dashboard)

================================================================================
STEP 2: VERIFY (1 minute)
================================================================================

Open this URL in your browser:
    https://edunexus-silk.vercel.app/new.png

You should see an image. If you see 404, wait 2 more minutes.

================================================================================
STEP 3: CLEAR CACHE (2 minutes) - MOST IMPORTANT!
================================================================================

1. Go to: https://developers.facebook.com/tools/debug/

2. Paste this: https://edunexus-silk.vercel.app/

3. Click "Debug"

4. Click "Scrape Again" button (do this 3 TIMES!)

5. You should now see the image in the preview

================================================================================
STEP 4: TEST ON WHATSAPP (10 minutes)
================================================================================

Wait 10 minutes after Step 3, then:

1. Open WhatsApp
2. Share: https://edunexus-silk.vercel.app/
3. Image should appear!

If not, try: https://edunexus-silk.vercel.app/?v=3

================================================================================
WHAT I FIXED:
================================================================================

✅ Changed image from future.png (small) to new.png (larger)
✅ Fixed all URLs to use edunexus-silk.vercel.app
✅ Added all missing meta tags
✅ Build successful - ready to deploy

================================================================================
IMPORTANT:
================================================================================

- You MUST clear Facebook cache (Step 3) or it won't work!
- WhatsApp takes 10 minutes to update after Facebook cache clear
- If still not working, add ?v=3 to the URL

================================================================================
EXPECTED RESULT:
================================================================================

When you share the link on WhatsApp, you'll see:

    [Large image from new.png]
    EduNexus — Academic materials for Ethiopian students
    Upload, share, and access notes, past exams...
    edunexus-silk.vercel.app

================================================================================

READ DEPLOY_NOW.md FOR DETAILED TROUBLESHOOTING

================================================================================
