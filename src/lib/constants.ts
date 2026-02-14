// Categories are now simplified to either INCOME or EXPENSE
export const DEFAULT_CATEGORY = "General" as const

export interface Transaction {
    id: string
    userId: string
    type: "INCOME" | "EXPENSE"
    amount: number
    category: string
    description: string
    date: Date
    createdAt: Date
    updatedAt: Date
}

export interface Stats {
    period: string
    summary: {
        income: number
        expense: number
        balance: number
    }
    categoryBreakdown: Record<string, { income: number; expense: number }>
    transactionCount: number
}
