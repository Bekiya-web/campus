#!/bin/bash

# Setup Vercel Environment Variables
# Run this script to configure your Vercel deployment

echo "Setting up Vercel environment variables..."

vercel env add VITE_SUPABASE_URL production
# When prompted, paste: https://iwymkieoscqjjiwrdyxe.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM

echo "Environment variables set! Now redeploy your project:"
echo "vercel --prod"
