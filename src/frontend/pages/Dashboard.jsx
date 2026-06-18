import WalletBar from "../components/dashboard/WalletBar"
import HoldingChart from "../components/dashboard/HoldingChart"
import TreasureOddGrid from "../components/dashboard/TreasuryOddGrid"
import { useAppKitAccount } from "@reown/appkit/react"

function Dashboard({ balance = 0, fillPercent = 0, participants = 0, totalSips = 0, roundNumber = 0, mockTokenHoldings = [], pours = [], onPour, isPouring = false, transactionStatus = '', transactionError = '', isApproving = false }) {
	const { address } = useAppKitAccount()

	const userTotalPoured = pours
    .filter(p => {
        if (p.type !== 'pour') return false
        const short = `${address?.slice(0, 6)}...${address?.slice(-4)}`
        return p.address?.toLowerCase() === short.toLowerCase()
    })
    .reduce((sum, p) => sum + p.amount, 0)

	return (
		<section className="p-8" data-aos="fade-up" id="dashboard">
			<WalletBar />
			<HoldingChart balance={userTotalPoured} mockTokenHoldings={mockTokenHoldings} />
		</section>
	)
}

export default Dashboard