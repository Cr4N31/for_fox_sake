import TreasuryBottleCard from "./TreasuryBottleCard"
import OddsCard from "./OddsCard"
function TreasureOddGrid({ balance = 0, fillPercent = 0, participants = 0, totalSips = 0, mockTokenHoldings = [], onPour }){
    return (
        <section className="flex mt-4 gap-2">
            <TreasuryBottleCard
                balance={balance}
                fillPercent={fillPercent}
                participants={participants}
                onPour={onPour}
            />
            <OddsCard totalSips={totalSips} />
        </section>
    )
}

export default TreasureOddGrid