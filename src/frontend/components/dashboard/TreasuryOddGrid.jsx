import TreasuryBottleCard from "./TreasuryBottleCard"
import OddsCard from "./OddsCard"

function TreasureOddGrid({ balance = 0, fillPercent = 0, participants = 0, totalSips = 0, roundNumber = 0, userPours = 0, onPour, isPouring = false, transactionStatus = '', transactionError = '' }) {
    return (
        <section className="flex mt-4 gap-2">
            <TreasuryBottleCard
                balance={balance}
                fillPercent={fillPercent}
                participants={participants}
                onPour={onPour}
                isPouring={isPouring}
                transactionStatus={transactionStatus}
                transactionError={transactionError}
                roundNumber={roundNumber}
            />
            <OddsCard
                userPours={userPours}
                totalSips={totalSips}
                roundNumber={roundNumber}
            />
        </section>
    )
}

export default TreasureOddGrid