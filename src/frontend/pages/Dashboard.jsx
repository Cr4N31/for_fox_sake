import WalletBar from "../components/dashboard/WalletBar"
import HoldingChart from "../components/dashboard/HoldingChart"
import TreasureOddGrid from "../components/dashboard/TreasuryOddGrid"

function Dashboard({ onNavigate, balance = 0, fillPercent = 0, participants = 0, totalSips = 0, mockTokenHoldings = [], onPour }){
	return (
		<section className="p-8" data-aos="fade-up">
			<WalletBar />
			<HoldingChart mockTokenHoldings={mockTokenHoldings} />
			<TreasureOddGrid
				balance={balance}
				fillPercent={fillPercent}
				participants={participants}
				totalSips={totalSips}
				mockTokenHoldings={mockTokenHoldings}
				onPour={onPour}
			/>
		</section>
	)
}

export default Dashboard
