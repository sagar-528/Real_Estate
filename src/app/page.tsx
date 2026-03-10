"use client";
import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import AboutSection from "@/components/AboutSection";
import Marquee from "@/components/Marquee";
import StatsSection from "@/components/StatsSection";
import InfoSection from "@/components/InfoSection";
import InvestmentApproach from "@/components/InvestmentApproach";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
    }, [loading]);

    useGSAP(() => {
        if (!loading && !ScrollSmoother.get()) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.5,
                effects: true,
            });
            ScrollTrigger.refresh();
        }
    }, [loading]);

    return (
        <>
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <CustomCursor />
            <Header />
            <div id="smooth-wrapper" style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s" }}>
                <div id="smooth-content">
                    <main className="main-wrap">
                        <HeroBanner />
                        <AboutSection />
                        <Marquee />
                        <StatsSection />
                        <InfoSection />
                        <InvestmentApproach />
                        <TeamSection />
                        <ContactForm />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
