# 🚀 Complete Installation & Setup Guide

## Current Status ✅
- ✅ MongoDB Database URL configured in `.env.local`
- ✅ NEXTAUTH_SECRET generated and configured
- ⏳ Dependencies installation in progress

## Installation Options

### Option 1: Wait for Current Installation (Recommended if working)
The npm install is currently running. If it completes successfully, proceed with **Step 3**.

### Option 2: Use Install Script (If Option 1 fails)
If the current installation fails or takes too long:

```cmd
cd "d:\income & expense\expense-tracker"
install.bat
```

This will install dependencies one group at a time with better error handling.

### Option 3: Move Project (Most Reliable)
The special character (&) in your path can cause issues. Move the project:

**1. Copy the project folder:**
```cmd
xcopy /E /I "d:\income & expense\expense-tracker" "C:\projects\expense-tracker"
```

**2. Navigate to new location:**
```cmd
cd C:\projects\expense-tracker
```

**3. Install dependencies:**
```cmd
npm install
```

This method typically works without issues!

---

## After Dependencies Are Installed

### Step 1: Verify Installation
Check that `node_modules` folder exists and has content:
```cmd
dir node_modules
```

### Step 2: Generate Prisma Client
```cmd
npx prisma generate
```

**Expected output:**
```
✔ Generated Prisma Client (x.x.x | library) to .\node_modules\@prisma\client
```

### Step 3: Push Database Schema to MongoDB
```cmd
npx prisma db push
```

**Expected output:**
```
Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client (x.x.x | library) to .\node_modules\@prisma\client
```

### Step 4: Start Development Server
```cmd
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in Xs
```

### Step 5: Open in Browser
Navigate to: **http://localhost:3000**

You should be redirected to the login page!

---

## First-Time App Usage

### 1. Create Your Account
1. You'll see the login page
2. Click **"Sign up"** at the bottom
3. Fill in:
   - **Name**: Your name
   - **Email**: Your email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Same as password
4. Click **"Sign Up"**
5. You'll be automatically logged in!

### 2. Add Your First Transaction
1. Click **"Add Transaction"** in the sidebar
2. Choose transaction type:
   - Click **"Income"** (green) or **"Expense"** (red)
3. Fill in the form:
   - **Amount**: e.g., 5000
   - **Category**: Select from dropdown (changes based on type)
   - **Description**: e.g., "January Salary"
   - **Date**: Today or any date
4. Click **"Add Transaction"**
5. You'll see your transaction in the list!

### 3. View Dashboard
1. Click **"Dashboard"** in the sidebar
2. You'll see:
   - **4 Summary Cards**: Income, Expense, Balance, Transactions
   - **Time Period Tabs**: Daily, Weekly, Monthly, Yearly
   - **Bar Chart**: Income vs Expense by category
   - **Pie Chart**: Expense distribution
3. Try switching between time periods!

### 4. Manage Transactions
1. Click **"Transactions"** in the sidebar
2. Use filters to find transactions:
   - **Type**: All, Income, or Expense
   - **Category**: Specific category
   - **Date Range**: Start and end dates
3. Click **Reset Filters** to clear
4. Click trash icon 🗑️ to delete a transaction

### 5. Toggle Dark Mode
1. Find the theme toggle in the sidebar (sun/moon icon)
2. Click to switch between light and dark modes
3. Your preference is saved automatically!

---

## Troubleshooting

### Problem: npm install fails with path errors
**Solution**: Move project to `C:\projects\expense-tracker` (see Option 3 above)

### Problem: "Cannot find module 'react'"
**Solution**: Dependencies not installed. Run `npm install` again or use `install.bat`

### Problem: Prisma generate fails
**Solution**: 
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npx prisma generate`

### Problem: Database connection error
**Check**:
- MongoDB Atlas cluster is active (green status)
- IP address is whitelisted in Network Access
- Connection string in `.env.local` is correct
- Username and password don't have special characters that need encoding

### Problem: NextAuth session error
**Solution**: 
1. Verify NEXTAUTH_SECRET is set in `.env.local` ✅ (Already done!)
2. Make sure NEXTAUTH_URL is `http://localhost:3000`
3. Restart dev server

### Problem: Port 3000 already in use
**Solution**:
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# View Prisma Studio (database GUI)
npx prisma studio
```

---

## File Locations

- **Environment config**: `.env.local`
- **Database schema**: `prisma/schema.prisma`
- **API routes**: `src/app/api/`
- **Pages**: `src/app/`
- **Components**: `src/components/`
- **Utilities**: `src/lib/`

---

## Environment Variables Reference

Your `.env.local` should look like this:

```env
# Database - YOUR MONGODB CONNECTION STRING
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority"

# NextAuth - Already configured! ✅
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="8f7e6d5c4b3a2190fedcba9876543210abcdef1234567890deadbeef12345678"

# App
NEXT_PUBLIC_APP_NAME="Expense Tracker"
```

---

## Income Categories
- Salary
- Freelance
- Business
- Investment
- Gift
- Other Income

## Expense Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Personal Care
- Groceries
- Rent
- Other Expense

---

## Next Steps After Setup

1. **Add some sample transactions** to see the dashboard populate
2. **Explore filtering** in the transactions page
3. **Try different time periods** in the dashboard
4. **Test dark mode** toggle
5. **Mobile responsiveness**: Resize browser or check on phone
6. **Customize categories**: Edit `src/lib/constants.ts`

---

## Ready for Production?

When ready to deploy:

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables (same as .env.local)
   - Deploy!

3. **Update NEXTAUTH_URL** in Vercel environment variables to your production URL

---

## Support & Resources

- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth Docs**: https://authjs.dev/
- **Shadcn/UI**: https://ui.shadcn.com/

---

## Checklist ✅

Current setup progress:

- [x] MongoDB database URL added
- [x] NEXTAUTH_SECRET generated
- [ ] Dependencies installed
- [ ] Prisma client generated
- [ ] Database schema pushed
- [ ] Development server running
- [ ] Can access http://localhost:3000
- [ ] Created user account
- [ ] Added first transaction
- [ ] Viewed dashboard with data

---

**You're almost there! 🎉**

Just waiting for the dependencies to install, then you'll be up and running!
