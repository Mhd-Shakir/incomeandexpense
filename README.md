# ExpenseTracker - Full-Stack Income & Expense Tracking Application

A comprehensive, professional income and expense tracking web application built with Next.js, MongoDB Atlas, Prisma, and modern UI components.

## 🌟 Features

- **Secure Authentication**: NextAuth.js with credentials provider (email/password)
- **Transaction Management**: Add, view, edit, and delete income/expense transactions
- **Dynamic Dashboard**: Real-time financial visualizations with Recharts
- **Multiple Time Periods**: Daily, Weekly, Monthly, and Yearly summaries
- **Advanced Filtering**: Filter transactions by type, category, and date range
- **Dark Mode**: System-aware theme toggle with smooth transitions
- **Responsive Design**: Mobile-first design with professional sidebar navigation
- **Category System**: Pre-defined income and expense categories
- **Data Visualization**: Bar charts and pie charts for financial insights

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI Components
- **Database**: MongoDB Atlas with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form Handling**: Zod validation

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Install Dependencies

**⚠️ IMPORTANT:** Due to special characters in the parent directory path, you may encounter npm installation issues on Windows. Here are solutions:

**Option A: Move the project** (Recommended)
```bash
# Move the entire expense-tracker folder to a path without special characters
# For example: C:\projects\expense-tracker
```

**Option B: Install dependencies manually**
```bash
cd expense-tracker

# Install dependencies one by one if bulk install fails
npm install next@16.1.6 react@19.2.3 react-dom@19.2.3
npm install @prisma/client@^6.0.0
npm install next-auth@^5.0.0-beta.25 @auth/prisma-adapter@^2.7.4
npm install bcryptjs@^2.4.3
npm install recharts@^2.15.0 date-fns@^4.1.0 zod@^3.24.1
npm install lucide-react@^0.468.0
npm install class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.6.0
npm install next-themes@^0.4.4
npm install @radix-ui/react-dialog@^1.1.4 @radix-ui/react-dropdown-menu@^2.1.4
npm install @radix-ui/react-label@^2.1.1 @radix-ui/react-select@^2.1.4
npm install @radix-ui/react-slot@^1.1.1 @radix-ui/react-tabs@^1.1.2
npm install @radix-ui/react-switch@^1.1.2 @radix-ui/react-popover@^1.1.4

# Dev dependencies
npm install -D @types/bcryptjs@^2.4.6 prisma@^6.0.0
```

### 2. Set Up MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string

### 3. Configure Environment Variables

Update `.env.local` with your actual values:

```env
# MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/expense-tracker?retryWrites=true&w=majority"

# NextAuth configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# App
NEXT_PUBLIC_APP_NAME="Expense Tracker"
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to MongoDB (creates collections)
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Application Structure

```
expense-tracker/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── register/      # User registration
│   │   │   ├── stats/         # Financial statistics
│   │   │   └── transactions/  # Transaction CRUD
│   │   ├── dashboard/         # Dashboard page
│   │   ├── transactions/      # Transactions list page
│   │   ├── add-transaction/   # Add transaction page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (redirects to login)
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── dashboard-view.tsx
│   │   ├── transactions-list.tsx
│   │   ├── transaction-form.tsx
│   │   ├── sidebar.tsx
│   │   ├── theme-toggle.tsx
│   │   └── protected-layout.tsx
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       ├── utils.ts           # Utility functions
│       └── constants.ts       # App constants
└── auth.ts                    # NextAuth configuration
```

## 🎨 Features in Detail

### Dashboard
- **Summary Cards**: Total income, total expense, net balance, transaction count
- **Period Selection**: View data for daily, weekly, monthly, or yearly periods
- **Bar Chart**: Compare income vs expense by category
- **Pie Chart**: Visualize expense distribution

### Transactions
- **Advanced Filters**: Filter by type (income/expense), category, date range
- **Rich Display**: Color-coded cards with category badges
- **Quick Actions**: Delete transactions with confirmation dialog
- **Real-time Updates**: Automatic data refresh after changes

### Add Transaction
- **Type Toggle**: Switch between income and expense with visual feedback
- **Category Selection**: Dynamic category list based on transaction type
- **Date Picker**: Choose any date for the transaction
- **Validation**: Client and server-side validation

## 🔐 Authentication

- Email/password authentication via NextAuth.js
- Secure password hashing with bcryptjs
- JWT-based sessions
- Protected routes with automatic redirection

## 📊 Database Schema

### User
- ID, name, email, password (hashed)
- Relations to transactions

### Transaction
- ID, user ID, type (income/expense)
- Amount, category, description, date
- Timestamps (createdAt, updatedAt)

## 🎯 API Endpoints

- `POST /api/register` - Create new user account
- `GET /api/transactions` - Get all user transactions (with filters)
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/[id]` - Get single transaction
- `PATCH /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction
- `GET /api/stats` - Get financial statistics by period

## 🌙 Dark Mode

- System-aware default theme
- Manual toggle available in sidebar
- Smooth transitions between themes
- Persistent user preference

## 🎨 Color Palette

- **Primary**: Emerald/Teal gradient
- **Income**: Green (#10b981)
- **Expense**: Red (#ef4444)
- **Accent**: Blue, Purple tones
- **Dark Mode**: Slate-based with proper contrast

## 📝 Income Categories

- Salary
- Freelance
- Business
- Investment
- Gift
- Other Income

## 💰 Expense Categories

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

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL="your-mongodb-atlas-connection-string"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
NEXT_PUBLIC_APP_NAME="Expense Tracker"
```

## 🐛 Troubleshooting

### npm install fails
- Move project to a path without special characters (& symbols)
- Or install dependencies individually as shown above

### Database connection fails
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has correct permissions

### NextAuth errors
- Verify NEXTAUTH_URL matches your development URL
- Generate a new NEXTAUTH_SECRET if needed
- Check that database schema is pushed

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js and modern web technologies
