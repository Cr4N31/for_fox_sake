import Hero from "../components/home/Hero";
import Faq from "../components/home/Faq";
import Buy from "../components/home/Buy";

function Home({ onNavigate, holders = 0, treasury = 0, totalSips = 0 }){
    return(
        <>
            <section data-aos="fade-up">
                <Hero onNavigate={onNavigate} holders={holders} treasury={treasury} totalSips={totalSips} />
            </section>
            <section data-aos="fade-up">
                <Faq/>
            </section>
            <section data-aos="fade-up">
                <Buy/>
            </section>
        </>
    )
}

export default Home