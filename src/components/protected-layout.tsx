"use client"

import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Receipt, PlusCircle, Wallet, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        {
            label: "Home",
            icon: LayoutDashboard,
            href: "/dashboard",
        },
        {
            label: "History",
            icon: Receipt,
            href: "/transactions",
        },
        {
            label: "Add",
            icon: PlusCircle,
            href: "/add-transaction",
            primary: true,
        },
    ]

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <Sidebar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-6 h-16 bg-white border-b border-slate-200 sticky top-0 z-10 w-full">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-black text-primary tracking-tight">ExpenseTracker</span>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:pl-64 flex flex-col min-h-0 overflow-hidden">
                <main className="flex-1 relative overflow-y-auto focus:outline-none pb-24 md:pb-6">
                    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/95 border-t border-slate-200 px-6 flex items-center justify-around z-50">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-all duration-200",
                            pathname === item.href
                                ? "text-primary scale-105"
                                : "text-slate-400"
                        )}
                    >
                        {item.primary ? (
                            <div className="bg-primary p-3 rounded-xl -mt-10 shadow-md shadow-primary/20 active:scale-95 transition-transform">
                                <item.icon className="h-7 w-7 text-white" />
                            </div>
                        ) : (
                            <item.icon className="h-6 w-6" />
                        )}
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            item.primary && "mt-1"
                        )}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
