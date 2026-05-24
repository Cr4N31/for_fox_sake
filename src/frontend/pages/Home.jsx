import Hero from "../components/home/Hero";
import Faq from "../components/home/Faq";
import Buy from "../components/home/Buy";

function Home({ onNavigate }){
    return(
        <>
            <section data-aos="fade-up">
                <Hero onNavigate={onNavigate} />
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