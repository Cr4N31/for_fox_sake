import Hero from "../components/home/Hero";
import Faq from "../components/home/Faq";
import Buy from "../components/home/Buy";

function Home(){
    return(
        <>
            <section data-aos="fade-up">
                <Hero/>
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