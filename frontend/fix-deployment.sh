#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     EduNexus Deployment Fix Script                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo -e "${YELLOW}Creating .env file...${NC}"
    cat > .env << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://iwymkieoscqjjiwrdyxe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

echo ""
echo -e "${BLUE}Testing Supabase connection...${NC}"

# Test Supabase connection
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM" https://iwymkieoscqjjiwrdyxe.supabase.co/auth/v1/health)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Supabase is accessible (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ Supabase returned HTTP $HTTP_CODE${NC}"
    echo -e "${YELLOW}This might indicate a problem with your Supabase project${NC}"
fi

echo ""
echo -e "${BLUE}Local setup check complete!${NC}"
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}  NEXT STEPS TO FIX DEPLOYMENT:${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}1. Add Environment Variables to Vercel:${NC}"
echo "   Go to: https://vercel.com/dashboard"
echo "   → Select your project"
echo "   → Settings → Environment Variables"
echo ""
echo "   Add these TWO variables:"
echo ""
echo -e "   ${BLUE}Variable 1:${NC}"
echo "   Name:  VITE_SUPABASE_URL"
echo "   Value: https://iwymkieoscqjjiwrdyxe.supabase.co"
echo ""
echo -e "   ${BLUE}Variable 2:${NC}"
echo "   Name:  VITE_SUPABASE_ANON_KEY"
echo "   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM"
echo ""
echo -e "${GREEN}2. Redeploy:${NC}"
echo "   → Go to Deployments tab"
echo "   → Click ⋯ on latest deployment"
echo "   → Click 'Redeploy'"
echo ""
echo -e "${GREEN}3. Test:${NC}"
echo "   → Visit your deployed site"
echo "   → Try login/signup"
echo "   → Should work! ✨"
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Want to test locally first?${NC}"
echo "Run: ${GREEN}npm run dev${NC}"
echo ""
echo -e "${BLUE}Need more help?${NC}"
echo "Read: ${GREEN}DEPLOYMENT_GUIDE.md${NC}"
echo ""
