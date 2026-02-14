# Quick Start Guide

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies

Due to the special characters in the parent directory path, run the setup script:

```powershell
cd expense-tracker
.\setup.ps1
```

Or install manually:
```bash
npm install
```

If installation fails, install dependencies individually (see README.md).

### Step 2: Configure MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Free" (M0 Shared tier)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.xxx.mongodb.net/`

### Step 3: Update Environment Variables

Open `.env.local` and update:

```env
DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/expense-tracker?retryWrites=true&w=majority"
NEXTAUTH_SECRET="run-this-command-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

**Replace:**
- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password
- `YOUR_CLUSTER` with your cluster name (from connection string)

**Generate NEXTAUTH_SECRET:**
```bash
# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use any random 32+ character string
```

### Step 4: Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database collections
npx prisma db push
```

You should see:
```
✔ Generated Prisma Client
Your database is now in sync with your Prisma schema.
```

### Step 5: Run the Application

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🎯 First Steps in the App

### 1. Create an Account
- Click "Sign up"
- Enter your name, email, and password
- Click "Sign Up"
- You'll be automatically logged in

### 2. Add Your First Transaction
- Click "Add Transaction" in the sidebar
- Choose transaction type (Income or Expense)
- Enter amount, category, and description
- Select date
- Click "Add Transaction"

### 3. View Dashboard
- Click "Dashboard" to see your financial overview
- Switch between Daily, Weekly, Monthly, Yearly views
- Explore the charts and statistics

### 4. Manage Transactions
- Click "Transactions" to see all your records
- Use filters to find specific transactions
- Delete transactions if needed

### 5. Customize Theme
- Toggle dark mode in the sidebar
- Theme preference is saved automatically

## ❓ Common Issues

### npm install fails
**Solution 1:** Move project to a simpler path
```bash
# Move to: C:\projects\expense-tracker
```

**Solution 2:** Install dependencies individually
```bash
# See README.md for complete list
```

### Database connection error
**Check:**
- MongoDB Atlas IP whitelist includes your IP
- Connection string has correct username/password
- Network allows MongoDB connection

### NextAuth error
**Check:**
- NEXTAUTH_URL matches your dev URL (http://localhost:3000)
- NEXTAUTH_SECRET is set and long enough
- Database is connected

### Build errors
**Solution:**
```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install
```

## 📚 Additional Resources

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://authjs.dev/

## ✅ Verification Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed successfully
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] .env.local configured
- [ ] Prisma client generated
- [ ] Database schema pushed
- [ ] Development server running
- [ ] Can access http://localhost:3000
- [ ] Can create an account
- [ ] Can add transactions
- [ ] Can view dashboard

## 🎉 You're Ready!

Your ExpenseTracker application is now set up and ready to use. Start tracking your income and expenses with beautiful visualizations!

For more details, see the main README.md file.
