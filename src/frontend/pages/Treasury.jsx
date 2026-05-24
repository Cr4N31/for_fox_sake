import { useState } from 'react'
import TreasuryHero from '../components/treasury/TreasuryHero'
import BottleVisual from '../components/treasury/BottleVisual'
import LivePours from '../components/treasury/LivePours'
import StatsGrid from '../components/treasury/StatsGrid'
import LastWinner from '../components/treasury/LastWinner'

const initialPours = [
    { address: '0xA94f...7B9C', amount: 1200 },
    { address: '0xF8d3...9A2D', amount: 1000 },
    { address: '0xC7e1...4F5A', amount: 1000 },
]

function Treasury() {
    const treasuryGoal = 20000
    const [treasury, setTreasury] = useState(0)
    const [holders] = useState(0)
    const [totalSips, setTotalSips] = useState(0)
    const [participants, setParticipants] = useState(0)
    const [pours, setPours] = useState(initialPours)
    const [lastWinner, setLastWinner] = useState({ winner: '0xA94f...7B9C', amount: 1200 })

    const fillPercent = Math.min(100, Math.round((treasury / treasuryGoal) * 100))

    const handlePour = () => {
        const amount = 1000
        const address = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`
        const newPour = { address, amount }

        setTreasury((current) => current + amount)
        setTotalSips((current) => current + 1)
        setParticipants((current) => current + 1)
        setPours((current) => [newPour, ...current].slice(0, 6))
        setLastWinner({ winner: address, amount })
    }

    return (
        <section className='max-w-7xl mx-auto px-6 pb-24' data-aos="fade-up">
            <TreasuryHero />

            <div className='grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]'>
                <div className='space-y-6' data-aos="fade-up">
                    <BottleVisual
                        fillPercent={fillPercent}
                        treasury={treasury}
                        participants={participants}
                        onPour={handlePour}
                    />
                    <StatsGrid holders={holders} totalSips={totalSips} />
                </div>

                <div className='space-y-6' data-aos="fade-up">
                    <LivePours pours={pours} />
                    <LastWinner winner={lastWinner.winner} amount={lastWinner.amount} />
                </div>
            </div>
        </section>
    )
}

export default Treasury
