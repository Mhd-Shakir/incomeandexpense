import { NextRequest, NextResponse } from "next/server"
import { getUserId } from "@/lib/get-user"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const transactionSchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.number().positive(),
    category: z.string().min(1),
    description: z.string().min(1),
    date: z.string().datetime().optional(),
})

// GET all transactions
export async function GET(req: NextRequest) {
    try {
        const userId = await getUserId()

        const { searchParams } = new URL(req.url)
        const type = searchParams.get("type")
        const category = searchParams.get("category")
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")

        const where: any = {
            userId: userId,
        }

        if (type && (type === "INCOME" || type === "EXPENSE")) {
            where.type = type
        }

        if (category) {
            where.category = category
        }

        if (startDate || endDate) {
            where.date = {}
            if (startDate) {
                where.date.gte = new Date(startDate)
            }
            if (endDate) {
                where.date.lte = new Date(endDate)
            }
        }

        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: {
                date: "desc",
            },
        })

        return NextResponse.json({ transactions })
    } catch (error) {
        console.error("Transaction GET error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}

// POST create transaction
export async function POST(req: NextRequest) {
    try {
        const userId = await getUserId()

        const body = await req.json()
        const { type, amount, category, description, date } = transactionSchema.parse(body)

        const transaction = await prisma.transaction.create({
            data: {
                userId: userId,
                type,
                amount,
                category,
                description,
                date: date ? new Date(date) : new Date(),
            },
        })

        return NextResponse.json({ transaction }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors },
                { status: 400 }
            )
        }

        console.error("Transaction POST error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
