import WalletBar from "../components/dashboard/WalletBar"
import HoldingChart from "../components/dashboard/HoldingChart"
import TreasureOddGrid from "../components/dashboard/TreasuryOddGrid"

function Dashboard({ balance = 0, fillPercent = 0, participants = 0, totalSips = 0, roundNumber = 0, mockTokenHoldings = [], onPour, isPouring = false, transactionStatus = '', transactionError = '', isApproving = false }) {
	return (
		<section className="p-8" data-aos="fade-up">
			<WalletBar />
			<HoldingChart balance={balance} mockTokenHoldings={mockTokenHoldings} />
			<TreasureOddGrid
				balance={balance}
				fillPercent={fillPercent}
				participants={participants}
				totalSips={totalSips}
				roundNumber={roundNumber}
				userPours={participants}
				mockTokenHoldings={mockTokenHoldings}
				onPour={onPour}
				isPouring={isPouring}
				transactionStatus={transactionStatus}
				transactionError={transactionError}
				isApproving={isApproving}
			/>
		</section>
	)
}

export default Dashboard