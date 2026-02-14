import { NextRequest, NextResponse } from "next/server"
import { getUserId } from "@/lib/get-user"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const transactionSchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
    amount: z.number().positive().optional(),
    category: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    date: z.string().datetime().optional(),
})

// GET single transaction
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserId()
        const { id } = await params

        const transaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId: userId,
            },
        })

        if (!transaction) {
            return NextResponse.json(
                { error: "Transaction not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({ transaction })
    } catch (error) {
        console.error("Transaction GET error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}

// PATCH update transaction
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserId()
        const { id } = await params

        const body = await req.json()
        const data = transactionSchema.parse(body)

        // Check if transaction exists and belongs to user
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId: userId,
            },
        })

        if (!existingTransaction) {
            return NextResponse.json(
                { error: "Transaction not found" },
                { status: 404 }
            )
        }

        const updateData: any = {}
        if (data.type) updateData.type = data.type
        if (data.amount) updateData.amount = data.amount
        if (data.category) updateData.category = data.category
        if (data.description) updateData.description = data.description
        if (data.date) updateData.date = new Date(data.date)

        const transaction = await prisma.transaction.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({ transaction })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors },
                { status: 400 }
            )
        }

        console.error("Transaction PATCH error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}

// DELETE transaction
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getUserId()
        const { id } = await params

        // Check if transaction exists and belongs to user
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId: userId,
            },
        })

        if (!existingTransaction) {
            return NextResponse.json(
                { error: "Transaction not found" },
                { status: 404 }
            )
        }

        await prisma.transaction.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Transaction DELETE error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
