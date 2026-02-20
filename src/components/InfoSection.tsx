"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InfoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const investTopRef = useRef<HTMLDivElement>(null);
    const bgImgRef = useRef<HTMLDivElement>(null);
    const infoImgRef = useRef<HTMLDivElement>(null);
    const investImgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax on the info background image
            gsap.to(bgImgRef.current, {
                yPercent: 15, ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom", end: "bottom top",
                    scrub: 1.5,
                },
            });

            // Parallax on side images
            gsap.to(infoImgRef.current, {
                y: -30, ease: "none",
                scrollTrigger: {
                    trigger: ".info-content",
                    start: "top bottom", end: "bottom top",
                    scrub: 1,
                },
            });
            gsap.to(investImgRef.current, {
                y: -30, ease: "none",
                scrollTrigger: {
                    trigger: ".invest-info",
                    start: "top bottom", end: "bottom top",
                    scrub: 1,
                },
            });

            // Reveal headings
            gsap.fromTo(
                topRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: topRef.current, start: "top 80%" },
                }
            );
            gsap.fromTo(
                investTopRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: investTopRef.current, start: "top 80%" },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="info-section" id="invest" ref={sectionRef}>
            <div className="holder">
                <div className="info">

                    {/* ── Full background image (parallax) ── */}
                    <div className="info-bg img-float" ref={bgImgRef}>
                        <img
                            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80"
                            alt="City skyline at dusk"
                        />
                    </div>

                    {/* ── Top heading block ── */}
                    <div className="info-top reveal" ref={topRef}>
                        <h2>
                            <div className="text-wrap">
                                <div className="text-inner">Primevest Investments</div>
                            </div>
                        </h2>
                        <div className="subheading">
                            <div className="text-wrap">
                                <div className="text-inner">Multi-Family Real Estate · Disciplined Focus</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Info content grid ── */}
                    <div className="info-content">
                        <div className="line-wrap line-reveal">
                            <div className="line-dash" />
                        </div>

                        <div className="info-block">
                            <p className="info-text">
                                Primevest&apos;s goal is to provide attractive housing for
                                tenants seeking a safe environment they can be proud of. We focus
                                on multi-family properties in the 24–60 unit range — a significant
                                piece of the market where we expect to find the best opportunities.
                                As we grow, larger properties will be considered in our Business Plan.
                            </p>
                            <a href="#contact" className="link-flash">
                                Primevest Investments <span className="arrow">→</span>
                            </a>
                        </div>

                        {/* Right side image */}
                        <div className="info-img img-float" ref={infoImgRef}>
                            <img
                                src="https://images.unsplash.com/photo-1560448075-bb485b1b4cad?auto=format&fit=crop&w=700&q=80"
                                alt="Multi-family apartment complex"
                            />
                        </div>

                        {/* ── Nested: Investment Approach ── */}
                        <div className="invest-info">
                            <div className="invest-info-top reveal" ref={investTopRef}>
                                <h2>
                                    <div className="text-wrap">
                                        <div className="text-inner">Primevest Investment Approach</div>
                                    </div>
                                </h2>
                                <div className="subheading">
                                    <div className="text-wrap">
                                        <div className="text-inner">Real Estate Opportunity Investing and Value-Add</div>
                                    </div>
                                </div>
                            </div>

                            <div className="invest-info-block">
                                <div className="invest-info-img img-float" ref={investImgRef}>
                                    <img
                                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"
                                        alt="Luxury estate property"
                                    />
                                </div>
                                <div className="invest-info-content">
                                    <p className="invest-info-text">
                                        It takes patience and rigorous due diligence to find the
                                        right opportunities. We will not be rushed or compromise our
                                        economic goals. Our principals invest directly in every
                                        property acquisition — ensuring true alignment of interest
                                        between Primevest and its investors.
                                    </p>
                                    <a href="#contact" className="link-flash">
                                        Primevest Investments <span className="arrow">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
