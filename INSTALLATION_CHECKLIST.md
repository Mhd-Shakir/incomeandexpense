# ExpenseTracker - Installation Checklist

## 📋 Pre-Installation

- [ ] Node.js 18+ is installed
- [ ] You have created a MongoDB Atlas account
- [ ] You have a code editor (VS Code recommended)

## 🔧 Installation Steps

### 1. Navigate to Project
```bash
cd "d:\income & expense\expense-tracker"
```

### 2. Install Dependencies

**Option A: Use Setup Script (Recommended)**
```powershell
.\setup.ps1
```

**Option B: Manual NPM Install**
```bash
npm install
```

**Option C: If Both Fail - Individual Installation**
Run these commands one by one:

```bash
# Core
npm install next@16.1.6 react@19.2.3 react-dom@19.2.3

# Database & Auth
npm install @prisma/client@^6.0.0
npm install next-auth@^5.0.0-beta.25 @auth/prisma-adapter@^2.7.4
npm install bcryptjs@^2.4.3

# Utilities
npm install recharts@^2.15.0 date-fns@^4.1.0 zod@^3.24.1
npm install lucide-react@^0.468.0
npm install class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.6.0
npm install next-themes@^0.4.4

# UI Components
npm install @radix-ui/react-dialog@^1.1.4
npm install @radix-ui/react-dropdown-menu@^2.1.4
npm install @radix-ui/react-label@^2.1.1
npm install @radix-ui/react-select@^2.1.4
npm install @radix-ui/react-slot@^1.1.1
npm install @radix-ui/react-tabs@^1.1.2
npm install @radix-ui/react-switch@^1.1.2
npm install @radix-ui/react-popover@^1.1.4

# Dev Dependencies
npm install -D @types/bcryptjs@^2.4.6
npm install -D prisma@^6.0.0
```

- [ ] Dependencies installed successfully

## 🗄️ MongoDB Atlas Setup

### Create Cluster
1. [ ] Go to https://www.mongodb.com/cloud/atlas
2. [ ] Sign up / Sign in
3. [ ] Click "Build a Database"
4. [ ] Select "Free" (M0) tier
5. [ ] Choose your region (closest to you)
6. [ ] Click "Create Cluster"

### Create Database User
1. [ ] Go to "Database Access" in left sidebar
2. [ ] Click "Add New Database User"
3. [ ] Choose "Password" authentication
4. [ ] Set username: `expensetracker` (or your choice)
5. [ ] Set a strong password (save it!)
6. [ ] Role: "Read and write to any database"
7. [ ] Click "Add User"

### Whitelist IP Address
1. [ ] Go to "Network Access" in left sidebar
2. [ ] Click "Add IP Address"
3. [ ] Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, use specific IPs
4. [ ] Click "Confirm"

### Get Connection String
1. [ ] Go to "Database" in left sidebar
2. [ ] Click "Connect" on your cluster
3. [ ] Choose "Connect your application"
4. [ ] Copy the connection string
5. [ ] It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`

- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string copied

## 🔐 Environment Configuration

1. [ ] Open `.env.local` in your editor
2. [ ] Update `DATABASE_URL`:
   ```env
   DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/expense-tracker?retryWrites=true&w=majority"
   ```
   Replace:
   - `YOUR_USERNAME` with your database username
   - `YOUR_PASSWORD` with your database password
   - `YOUR_CLUSTER` with your cluster name

3. [ ] Generate `NEXTAUTH_SECRET`:
   ```powershell
   # PowerShell command:
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```
   Copy the output and paste into .env.local:
   ```env
   NEXTAUTH_SECRET="your-generated-secret-here"
   ```

4. [ ] Verify `NEXTAUTH_URL`:
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   ```

- [ ] .env.local configured

## 🗃️ Database Initialization

### Generate Prisma Client
```bash
npx prisma generate
```
- [ ] Prisma client generated (you should see "✔ Generated Prisma Client")

### Push Database Schema
```bash
npx prisma db push
```
- [ ] Schema pushed successfully (you should see "Your database is now in sync")

## 🚀 Start the Application

```bash
npm run dev
```

- [ ] Development server started
- [ ] Open http://localhost:3000 in browser
- [ ] No error messages in terminal

## ✅ Verification

### Test Authentication
1. [ ] Navigate to http://localhost:3000
2. [ ] You're redirected to /login
3. [ ] Click "Sign up"
4. [ ] Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: testpass123
5. [ ] Click "Sign Up"
6. [ ] You're logged in and redirected to dashboard

### Test Dashboard
1. [ ] Dashboard page loads without errors
2. [ ] You see 4 summary cards (Income, Expense, Balance, Transactions)
3. [ ] You see tab buttons (Daily, Weekly, Monthly, Yearly)
4. [ ] You see empty chart areas (no data yet)

### Test Add Transaction
1. [ ] Click "Add Transaction" in sidebar
2. [ ] Form loads correctly
3. [ ] Fill in first transaction:
   - Type: Income
   - Amount: 5000
   - Category: Salary
   - Description: January Salary
   - Date: Today's date
4. [ ] Click "Add Transaction"
5. [ ] You're redirected to Transactions page

### Test Transactions List
1. [ ] Your new transaction appears in the list
2. [ ] Transaction shows: amount, category, date, delete button
3. [ ] Filters work (try changing Type filter)
4. [ ] Click delete button, confirm deletion works

### Test Dashboard with Data
1. [ ] Go back to Dashboard
2. [ ] Summary cards show your transaction data
3. [ ] Charts display (bar chart and pie chart)
4. [ ] Switch between time periods (Daily, Weekly, Monthly, Yearly)

### Test Dark Mode
1. [ ] Find theme toggle in sidebar
2. [ ] Click to switch to dark mode
3. [ ] Page changes to dark theme
4. [ ] Click again to switch back

- [ ] All tests passed

## 🎉 Installation Complete!

If all checkboxes are marked, your ExpenseTracker is fully set up and working!

## 🐛 Troubleshooting

### Dependencies won't install
- Try moving project to: `C:\projects\expense-tracker`
- Or install individually (see Option C above)

### Database connection fails
- Check MongoDB cluster is active
- Verify connection string is correct
- Check IP is whitelisted
- Wait 2-3 minutes after creating cluster

### NextAuth errors
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your dev URL
- Confirm database is connected

### Import errors in code
- Run `npx prisma generate` again
- Restart development server
- Check all dependencies installed

### TypeScript errors
- These are expected if dependencies aren't installed
- Will resolve after successful npm install

## 📚 Next Steps

1. Read README.md for detailed documentation
2. Check PROJECT_SUMMARY.md for architecture overview
3. Explore the codebase
4. Add more transactions
5. Customize categories (in src/lib/constants.ts)
6. Deploy to Vercel for production

---

**Need help?** Check the troubleshooting sections in README.md and QUICKSTART.md
