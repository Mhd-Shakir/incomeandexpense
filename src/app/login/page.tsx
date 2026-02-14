"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Loader2, LogIn, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid email or password")
            } else {
                router.push("/dashboard")
                router.refresh()
            }
        } catch (err: any) {
            setError("Something went wrong")
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
                    <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">Sign in to your account</p>
                </div>

                {registered && (
                    <div className="flex items-center gap-2 p-3 text-xs font-black bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 uppercase tracking-widest animate-in fade-in slide-in-from-top-2 duration-500">
                        <CheckCircle2 className="h-4 w-4" />
                        Account created! Please sign in.
                    </div>
                )}

                <Card className="border-2 rounded-2xl shadow-xl overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b pb-6">
                        <CardTitle className="text-xl font-black text-slate-900">Sign In</CardTitle>
                        <CardDescription className="font-medium text-slate-500">Welcome back, track your expenses today</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-3 text-xs font-black bg-red-50 text-red-600 rounded-lg border border-red-100 uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

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
                                        Sign In
                                        <LogIn className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-primary hover:underline font-black">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
