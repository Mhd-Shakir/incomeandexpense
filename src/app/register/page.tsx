"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Loader2, ArrowRight } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Registration failed")
            }

            router.push("/login?registered=true")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 mb-4">
                        <Wallet className="h-7 w-7" />
                    </div>
                    <h1 className="text-3xl font-black text-primary tracking-tight">Expense<span className="text-slate-400">Tracker</span></h1>
                    <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">Create your personal account</p>
                </div>

                <Card className="border-2 rounded-2xl shadow-xl overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b pb-6">
                        <CardTitle className="text-xl font-black text-slate-900">Sign Up</CardTitle>
                        <CardDescription className="font-medium text-slate-500">Join 30+ users tracking their data</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-3 text-xs font-black bg-red-50 text-red-600 rounded-lg border border-red-100 uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" required className="h-12 rounded-xl border-2 focus:border-primary transition-all font-bold px-4" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required className="h-12 rounded-xl border-2 focus:border-primary transition-all font-bold px-4" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="••••••••" required className="h-12 rounded-xl border-2 focus:border-primary transition-all font-bold px-4" />
                            </div>

                            <Button type="submit" disabled={loading} className="w-full h-12 text-sm font-black rounded-xl shadow-lg bg-primary hover:bg-blue-700 transition-all uppercase tracking-widest group">
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                    <>
                                        Start Tracking
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary hover:underline font-black">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
