import { TransactionsList } from "@/components/transactions-list"
import ProtectedLayout from "@/components/protected-layout"

export default function TransactionsPage() {
    return (
        <ProtectedLayout>
            <TransactionsList />
        </ProtectedLayout>
    )
}
