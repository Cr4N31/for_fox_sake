function Footer(handleNavigate) {

    return (
        <footer className="relative bottom-0 left-0 right-0 z-50 mt-12 border-t border-pink-400/20 bg-black/10 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)]">

            <section className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-5">

                {/* BRANDING */}
                <div className="flex flex-col gap-1 text-center md:text-left">

                    <h1 className="bg-gradient-to-r from-pink-300 via-pink-400 to-white bg-clip-text text-transparent text-2xl font-black tracking-wide drop-shadow-[0_0_10px_rgba(244,114,182,0.7)]">
                        For Fox Sake
                    </h1>

                    <p className="text-sm text-white/45 max-w-sm leading-relaxed">
                        A neon fox tavern in the Cronos underworld. Spill. Stake. Win.
                    </p>
                </div>

                {/* COPYRIGHT */}
                <div className="text-center md:text-right">
                    <p className="text-xs tracking-wide text-white/40">
                        $FFS · Built on Cronos
                    </p>

                    <p className="text-xs text-pink-300/70 mt-1">
                        © {new Date().getFullYear()} For Fox Sake
                    </p>
                </div>

            </section>

        </footer>
    )
}

export default Footer