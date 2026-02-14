"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react"

export function TransactionForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE")
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const dateTime = new Date(`${formData.date}T${formData.time}`)
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type,
                    amount: parseFloat(formData.amount),
                    category: "General",
                    description: formData.description,
                    date: dateTime.toISOString(),
                }),
            })

            if (response.ok) {
                router.push("/transactions")
                router.refresh()
            } else {
                const error = await response.json()
                alert(error.error || "Failed to create transaction")
            }
        } catch (error) {
            console.error("Failed to create transaction:", error)
            alert("Failed to create transaction")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <CardHeader className="space-y-1 bg-slate-50 border-b border-slate-200 py-4">
                    <CardTitle className="text-xl font-black text-center uppercase tracking-tight text-primary">Add Entry</CardTitle>
                    <CardDescription className="text-center text-[10px] font-bold uppercase tracking-widest">
                        Record your {type.toLowerCase()} details
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Type</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant={type === "INCOME" ? "default" : "outline"}
                                    className={`h-16 rounded-xl transition-all duration-200 ${type === "INCOME"
                                        ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 border-none"
                                        : "hover:bg-blue-50 border border-slate-200"
                                        }`}
                                    onClick={() => setType("INCOME")}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <ArrowUpCircle className={`h-5 w-5 ${type === "INCOME" ? "text-white" : "text-blue-500"}`} />
                                        <span className={`text-xs font-black uppercase ${type === "INCOME" ? "text-white" : "text-slate-600"}`}>Income</span>
                                    </div>
                                </Button>
                                <Button
                                    type="button"
                                    variant={type === "EXPENSE" ? "default" : "outline"}
                                    className={`h-16 rounded-xl transition-all duration-200 ${type === "EXPENSE"
                                        ? "bg-slate-900 hover:bg-black shadow-md shadow-slate-200 border-none"
                                        : "hover:bg-slate-50 border border-slate-200"
                                        }`}
                                    onClick={() => setType("EXPENSE")}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <ArrowDownCircle className={`h-5 w-5 ${type === "EXPENSE" ? "text-white" : "text-slate-600"}`} />
                                        <span className={`text-xs font-black uppercase ${type === "EXPENSE" ? "text-white" : "text-slate-600"}`}>Expense</span>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <Label htmlFor="amount" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black text-xl">₹</span>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        required
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="text-2xl pl-10 h-14 font-black rounded-xl border border-slate-200 focus:border-primary transition-all bg-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="date" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="h-12 rounded-xl border border-slate-200 font-bold px-4 bg-white"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="time" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="h-12 rounded-xl border border-slate-200 font-bold px-4 bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Work salary, food, rent..."
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="h-12 rounded-xl border border-slate-200 font-bold px-4 bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 h-12 text-sm font-black rounded-xl shadow-md bg-primary hover:bg-blue-700 transition-all uppercase tracking-widest"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Save ${type}`
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                className="h-12 px-8 text-slate-400 font-bold hover:text-primary transition-colors text-xs uppercase tracking-widest"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
