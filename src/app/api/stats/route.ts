import { NextRequest, NextResponse } from "next/server"
import { getUserId } from "@/lib/get-user"
import { prisma } from "@/lib/prisma"
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserId()

        const { searchParams } = new URL(req.url)
        const period = searchParams.get("period") || "daily"

        let startDate: Date
        let endDate: Date
        const now = new Date()

        switch (period) {
            case "daily":
                startDate = startOfDay(now)
                endDate = endOfDay(now)
                break
            case "weekly":
                startDate = startOfWeek(now)
                endDate = endOfWeek(now)
                break
            case "monthly":
                startDate = startOfMonth(now)
                endDate = endOfMonth(now)
                break
            case "yearly":
                startDate = startOfYear(now)
                endDate = endOfYear(now)
                break
            default:
                startDate = startOfDay(now)
                endDate = endOfDay(now)
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        })

        const income = transactions
            .filter((t) => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0)

        const expense = transactions
            .filter((t) => t.type === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0)

        const balance = income - expense

        // Category breakdown
        const categoryBreakdown = transactions.reduce((acc, t) => {
            if (!acc[t.category]) {
                acc[t.category] = { income: 0, expense: 0 }
            }
            if (t.type === "INCOME") {
                acc[t.category].income += t.amount
            } else {
                acc[t.category].expense += t.amount
            }
            return acc
        }, {} as Record<string, { income: number; expense: number }>)

        return NextResponse.json({
            period,
            summary: {
                income,
                expense,
                balance,
            },
            categoryBreakdown,
            transactionCount: transactions.length,
        })
    } catch (error) {
        console.error("Stats GET error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
