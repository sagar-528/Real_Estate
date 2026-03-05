"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import InfoSection from "@/components/InfoSection";
import InvestmentApproach from "@/components/InvestmentApproach";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
    }, [loading]);

    return (
        <>
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <div id="wrapper" style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s" }}>
                <Header />
                <main className="main-wrap">
                    <HeroBanner />
                    <AboutSection />
                    <StatsSection />
                    <InfoSection />
                    <InvestmentApproach />
                    <TeamSection />
                    <ContactForm />
                </main>
                <Footer />
            </div>
        </>
    );
}
