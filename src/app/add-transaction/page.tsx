import { TransactionForm } from "@/components/transaction-form"
import ProtectedLayout from "@/components/protected-layout"

export default function AddTransactionPage() {
    return (
        <ProtectedLayout>
            <TransactionForm />
        </ProtectedLayout>
    )
}
