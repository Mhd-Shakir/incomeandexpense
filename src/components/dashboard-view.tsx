"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import type { Stats } from "@/lib/constants"

export function DashboardView() {
    const { data: session } = useSession()
    const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly")
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [period])

    const fetchStats = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/stats?period=${period}`)
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary">
                        Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest opacity-60">
                        Your cash movement for this {period}
                    </p>
                </div>
            </div>

            <Tabs value={period} onValueChange={(v) => setPeriod(v as any)} className="space-y-6">
                <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                    <TabsList className="flex w-max sm:grid sm:w-full max-w-md grid-cols-4 bg-slate-100 p-1 rounded-xl">
                        <TabsTrigger value="daily" className="rounded-lg px-6">Daily</TabsTrigger>
                        <TabsTrigger value="weekly" className="rounded-lg px-6">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly" className="rounded-lg px-6">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly" className="rounded-lg px-6">Yearly</TabsTrigger>
                    </TabsList>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-80">Total Income</CardTitle>
                            <ArrowUpCircle className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">
                                {formatCurrency(stats?.summary.income || 0)}
                            </div>
                            <div className="mt-4 flex items-center text-[10px] opacity-70 font-medium uppercase tracking-tighter">
                                <span>{stats?.transactionCount || 0} Entries Today</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-lg shadow-blue-900/10 rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-80">Total Expense</CardTitle>
                            <ArrowDownCircle className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">
                                {formatCurrency(stats?.summary.expense || 0)}
                            </div>
                            <div className="mt-4 flex items-center text-[10px] opacity-70 font-medium uppercase tracking-tighter">
                                <span>Spending for {period}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-2 border-primary/10 bg-white shadow-sm rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-primary">Net Balance</CardTitle>
                            <Wallet className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-primary">
                                {formatCurrency(stats?.summary.balance || 0)}
                            </div>
                            <div className="mt-4 flex items-center text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                <span>Available funds</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-none bg-slate-900 text-white shadow-lg shadow-slate-200 rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-80">Savings Rate</CardTitle>
                            <TrendingUp className="h-5 w-5 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">
                                {stats?.summary.income && stats.summary.income > 0 ? Math.round(((stats.summary.income - stats.summary.expense) / stats.summary.income) * 100) : 0}%
                            </div>
                            <div className="mt-4 flex items-center text-[10px] opacity-70 font-medium uppercase tracking-tighter">
                                <span>Efficiency Rate</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Tabs>
        </div>
    )
}
