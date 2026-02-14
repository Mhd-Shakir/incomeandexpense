"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { type Transaction } from "@/lib/constants"
import { Trash2, Filter, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function TransactionsList() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // Filters
    const [typeFilter, setTypeFilter] = useState<string>("all")
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    useEffect(() => {
        fetchTransactions()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [transactions, typeFilter, startDate, endDate])

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/transactions")
            if (response.ok) {
                const data = await response.json()
                setTransactions(data.transactions)
                setFilteredTransactions(data.transactions)
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error)
        } finally {
            setLoading(false)
        }
    }

    const applyFilters = () => {
        let filtered = [...transactions]

        if (typeFilter !== "all") {
            filtered = filtered.filter((t) => t.type === typeFilter)
        }

        if (startDate) {
            filtered = filtered.filter((t) => new Date(t.date) >= new Date(startDate))
        }

        if (endDate) {
            filtered = filtered.filter((t) => new Date(t.date) <= new Date(endDate))
        }

        setFilteredTransactions(filtered)
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/transactions/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setTransactions(transactions.filter((t) => t.id !== id))
                setDeleteId(null)
            } else {
                alert("Failed to delete transaction")
            }
        } catch (error) {
            console.error("Failed to delete transaction:", error)
            alert("Failed to delete transaction")
        }
    }

    const resetFilters = () => {
        setTypeFilter("all")
        setStartDate("")
        setEndDate("")
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
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary">
                    Transactions
                </h2>
                <p className="text-sm text-muted-foreground">
                    Review your recent cash activity
                </p>
            </div>

            <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden">
                <CardHeader className="pb-4 bg-slate-50 border-b border-slate-200 py-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
                        <Filter className="h-4 w-4" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 px-4 pb-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="h-10 rounded-lg border border-slate-200 bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    <SelectItem value="all">All Entries</SelectItem>
                                    <SelectItem value="INCOME">Income Only</SelectItem>
                                    <SelectItem value="EXPENSE">Expense Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">From Date</label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-10 rounded-lg border border-slate-200 bg-white"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">To Date</label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-10 rounded-lg border border-slate-200 bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-4 border-t border-slate-100">
                        <Button variant="outline" onClick={resetFilters} className="h-9 rounded-lg font-bold px-6 text-xs">
                            Reset Filters
                        </Button>
                        <div className="sm:ml-auto text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center">
                            Showing {filteredTransactions.length} results
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2">
                <div className="hidden md:grid grid-cols-12 bg-slate-100/50 px-6 py-2 rounded-lg border border-slate-200/50">
                    <div className="col-span-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">Icon</div>
                    <div className="col-span-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</div>
                    <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</div>
                    <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</div>
                    <div className="col-span-1 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</div>
                </div>

                <div className="space-y-2">
                    {filteredTransactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                <Filter className="h-5 w-5 text-slate-300" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No matching records</p>
                        </div>
                    ) : (
                        filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="grid grid-cols-1 md:grid-cols-12 items-center px-4 md:px-6 py-4 bg-white hover:bg-blue-50/50 border border-slate-200 rounded-xl shadow-sm transition-all group"
                            >
                                {/* Icon/Type - Mobile Friendly */}
                                <div className="col-span-1 flex items-center gap-3 md:gap-0 mb-3 md:mb-0">
                                    <div
                                        className={`p-2 rounded-lg ${transaction.type === "INCOME"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-slate-100 text-slate-600"
                                            }`}
                                    >
                                        {transaction.type === "INCOME" ? (
                                            <ArrowUpCircle className="h-5 w-5" />
                                        ) : (
                                            <ArrowDownCircle className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="md:hidden flex flex-col min-w-0 flex-1">
                                        <h3 className="font-black text-sm text-slate-900 truncate uppercase">
                                            {transaction.description}
                                        </h3>
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {formatDateTime(transaction.date)}
                                        </span>
                                    </div>
                                    <div className="md:hidden text-right flex flex-col items-end gap-1">
                                        <div
                                            className={`text-sm font-black ${transaction.type === "INCOME" ? "text-blue-600" : "text-slate-900"
                                                }`}
                                        >
                                            {transaction.type === "INCOME" ? "+" : "-"}
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(transaction.id)}
                                            className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Description - Desktop Only */}
                                <div className="hidden md:block col-span-5 min-w-0">
                                    <h3 className="font-black text-sm text-slate-900 truncate uppercase tracking-tight">
                                        {transaction.description}
                                    </h3>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${transaction.type === "INCOME" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-700"
                                        }`}>
                                        {transaction.type === "INCOME" ? "Income" : "Expense"}
                                    </span>
                                </div>

                                {/* Date - Desktop Only */}
                                <div className="hidden md:block col-span-2 text-center">
                                    <span className="text-[11px] font-bold text-slate-400 block">
                                        {formatDateTime(transaction.date)}
                                    </span>
                                </div>

                                {/* Amount - Desktop Only */}
                                <div className="hidden md:block col-span-3 text-right">
                                    <div
                                        className={`text-base font-black ${transaction.type === "INCOME" ? "text-blue-600" : "text-slate-900"
                                            }`}
                                    >
                                        {transaction.type === "INCOME" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </div>
                                </div>

                                {/* Actions - Desktop Only */}
                                <div className="hidden md:flex col-span-1 justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setDeleteId(transaction.id)}
                                        className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent className="rounded-3xl border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-black text-xl">Remove entry?</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            This action cannot be undone. This record will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="h-12 rounded-2xl font-bold border-2">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            className="h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700"
                            onClick={() => deleteId && handleDelete(deleteId)}
                        >
                            Delete Forever
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
