import Hero from "../components/home/Hero";
import Faq from "../components/home/Faq";
import Buy from "../components/home/Buy";

function Home({ onNavigate, holders = 0, treasury = 0, totalSips = 0, pour, onPour, isPouring = false, transactionStatus = '', transactionError = '', lastWinner = null, isApproving = false }) {
    return(
        <>
            <section data-aos="fade-up">
                <Hero onNavigate={onNavigate} pour={pour} holders={holders} treasury={treasury} totalSips={totalSips} />
            </section>
            <section data-aos="fade-up">
                <Faq treasury={treasury}/>
            </section>
            <section data-aos="fade-up">
                <Buy onPour={onPour} isPouring={isPouring} transactionStatus={transactionStatus} transactionError={transactionError} lastWinner={lastWinner} isApproving={isApproving} />
            </section>
        </>
    )
}

export default Home
