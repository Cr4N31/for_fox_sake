import TreasuryHero from '../components/treasury/TreasuryHero'
import BottleVisual from '../components/treasury/BottleVisual'
import LivePours from '../components/treasury/LivePours'
import StatsGrid from '../components/treasury/StatsGrid'
import LastWinner from '../components/treasury/LastWinner'

function Treasury({ treasury = 0, holders = 0, totalSips = 0, participants = 0, pours = [], lastWinner = { winner: '', amount: 0 }, winnerHistory = [], fillPercent = 0, onPour, sipNonce = 0, isPouring = false, transactionStatus = '', transactionError = '', isApproving = false }) {
    return (
        <section className='max-w-7xl mx-auto px-6 pb-24' data-aos="fade-up" id="treasury">
            <TreasuryHero />

            <div className='grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]'>
                <div className='space-y-6' data-aos="fade-up">
                    <BottleVisual
                        fillPercent={fillPercent}
                        treasury={treasury}
                        participants={participants}
                        onPour={onPour}
                        sipNonce={sipNonce}
                        isPouring={isPouring}
                        transactionStatus={transactionStatus}
                        transactionError={transactionError}
                        isApproving={isApproving}
                    />
                    <StatsGrid holders={holders} totalSips={totalSips} />
                </div>

                <div className='space-y-6' data-aos="fade-up">
                    <LivePours pours={pours} />
                    <LastWinner winner={lastWinner.winner} amount={lastWinner.amount} winners={winnerHistory} />
                </div>
            </div>
        </section>
    )
}

export default Treasury
