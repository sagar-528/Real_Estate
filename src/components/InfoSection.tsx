"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function InfoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const investTopRef = useRef<HTMLDivElement>(null);
    const bgImgRef = useRef<HTMLDivElement>(null);
    const infoImgRef = useRef<HTMLDivElement>(null);
    const investImgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const ctx = gsap.context(() => {
                // Parallax on the info background image
                gsap.to(bgImgRef.current, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });

                // Parallax on side images
                gsap.to(infoImgRef.current, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".info-content",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
                gsap.to(investImgRef.current, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".invest-info",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });

                // SplitText heading reveal
                if (topRef.current) {
                    const textInners = topRef.current.querySelectorAll(".text-inner");
                    const split = SplitText.create(textInners, { type: "chars" });
                    gsap.fromTo(
                        split.chars,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.02,
                            ease: "power3.out",
                            scrollTrigger: { trigger: topRef.current, start: "top 80%" },
                        }
                    );
                }

                // Subheading clip-path
                gsap.fromTo(
                    ".info-top .subheading",
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.8,
                        ease: "power3.inOut",
                        scrollTrigger: { trigger: ".info-top .subheading", start: "top 80%" },
                    }
                );

                // Invest heading reveal
                if (investTopRef.current) {
                    const investTextInners = investTopRef.current.querySelectorAll(".text-inner");
                    const investSplit = SplitText.create(investTextInners, { type: "chars" });
                    gsap.fromTo(
                        investSplit.chars,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.02,
                            ease: "power3.out",
                            scrollTrigger: { trigger: investTopRef.current, start: "top 80%" },
                        }
                    );
                }

                // Invest subheading clip-path
                gsap.fromTo(
                    ".invest-info-top .subheading",
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.8,
                        ease: "power3.inOut",
                        scrollTrigger: { trigger: ".invest-info-top .subheading", start: "top 80%" },
                    }
                );

                // Info text paragraphs word reveal
                const paraEls = sectionRef.current?.querySelectorAll(".info-text, .invest-info-text");
                if (paraEls?.length) {
                    const paraSplit = SplitText.create(paraEls, {
                        type: "words,lines",
                        linesClass: "info-paragraph-line",
                    });
                    gsap.from(paraSplit.words, {
                        yPercent: 200,
                        stagger: 0.01,
                        duration: 0.8,
                        ease: "power1.inOut",
                        scrollTrigger: {
                            trigger: ".info-content",
                            start: "top 65%",
                        },
                    });
                }

                // Horizontal line reveal
                gsap.fromTo(
                    ".line-reveal .line-dash",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: ".line-reveal",
                            start: "top 80%",
                        },
                    }
                );

                // Link flash entrances
                gsap.fromTo(
                    ".info-block .link-flash",
                    { x: -20, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".info-block .link-flash",
                            start: "top 85%",
                        },
                    }
                );

                // Image clip-path reveals
                gsap.fromTo(
                    ".info-img",
                    { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
                    {
                        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                        duration: 1.2,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: ".info-img",
                            start: "top 80%",
                        },
                    }
                );

                gsap.fromTo(
                    ".invest-info-img",
                    { clipPath: "polygon(0 0%, 0 0%, 0 100%, 0 100%)" },
                    {
                        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                        duration: 1.2,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: ".invest-info-img",
                            start: "top 80%",
                        },
                    }
                );
            }, sectionRef);

            return () => ctx.revert();
        });
    }, []);

    return (
        <section className="info-section" id="invest" ref={sectionRef}>
            <div className="holder">
                <div className="info">

                    <div className="info-bg img-float" ref={bgImgRef}>
                        <img
                            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80"
                            alt="City skyline at dusk"
                        />
                    </div>

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

                        <div className="info-img img-float" ref={infoImgRef}>
                            <img
                                src="https://images.unsplash.com/photo-1560448075-bb485b1b4cad?auto=format&fit=crop&w=700&q=80"
                                alt="Multi-family apartment complex"
                            />
                        </div>

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
