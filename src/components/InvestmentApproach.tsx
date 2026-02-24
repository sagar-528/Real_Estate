"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        number: "01",
        title: "Low Leverage Strategy",
        description:
            "We operate with conservative debt levels — typically below 50% LTV — to reduce risk and preserve capital during market downturns. This low-leverage approach delivers stable, consistent returns without overexposure.",
    },
    {
        number: "02",
        title: "Private Equity Structure",
        description:
            "Each investment is structured as a Special Purpose Entity (SPE), giving investors direct ownership and full transparency. Our private equity model ensures alignment of interests at every stage.",
    },
    {
        number: "03",
        title: "Accredited Investors Only",
        description:
            "We exclusively work with accredited investors, allowing us to pursue institutional-grade opportunities in premium markets — Manhattan, Miami, and select coastal cities — that are inaccessible through conventional channels.",
    },
];

export default function InvestmentApproach() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(
                ".approach-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".approach-grid",
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="approach-section" id="approach" ref={sectionRef}>
            {/* Background image with overlay */}
            <div className="approach-bg">
                <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
                    alt="City skyline"
                    className="approach-bg-img"
                />
                <div className="approach-bg-overlay" />
            </div>

            <div className="holder" style={{ position: "relative", zIndex: 2 }}>
                <div className="approach-heading" ref={headingRef}>
                    <div className="key-wrap">
                        <div className="key" />
                    </div>
                    <h2>
                        <div className="text-wrap">
                            <div className="text-inner">The Primevest</div>
                        </div>
                        <div className="text-wrap">
                            <div className="text-inner">Investment Approach</div>
                        </div>
                    </h2>
                    <div className="subheading">How We Generate Superior Returns</div>
                </div>

                <div className="approach-grid">
                    {pillars.map((pillar) => (
                        <div className="approach-card" key={pillar.number}>
                            <div className="approach-card-num">{pillar.number}</div>
                            <h3 className="approach-card-title">{pillar.title}</h3>
                            <p className="approach-card-text">{pillar.description}</p>
                            <a className="link-flash" href="#contact">
                                Learn More <span className="arrow">→</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
