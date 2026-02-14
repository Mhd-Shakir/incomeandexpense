"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Receipt, PlusCircle, Wallet, LogOut } from "lucide-react"

interface SidebarProps { }

export function Sidebar({ }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
        },
        {
            label: "Transactions",
            icon: Receipt,
            href: "/transactions",
        },
        {
            label: "Add Entry",
            icon: PlusCircle,
            href: "/add-transaction",
        },
    ]

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-white text-slate-900 border-r border-slate-200">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-10">
                    <div className="relative flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Wallet className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-primary tracking-tight">
                                Expense<span className="text-slate-400">Tracker</span>
                            </h1>
                        </div>
                    </div>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-semibold cursor-pointer rounded-lg transition-all duration-200",
                                pathname === route.href
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-500 hover:text-primary hover:bg-primary/5"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn(
                                    "h-5 w-5 mr-3 transition-colors",
                                    pathname === route.href ? "text-white" : "text-slate-400 group-hover:text-primary"
                                )} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="px-3 pb-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm group flex p-3 w-full justify-start font-black cursor-pointer rounded-lg transition-all duration-200 text-slate-400 hover:text-red-500 hover:bg-red-50 uppercase tracking-widest"
                >
                    <div className="flex items-center flex-1">
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                    </div>
                </button>
            </div>
        </div>
    )
}
