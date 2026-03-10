"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
    const bgImgRef = useRef<HTMLImageElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Background slow zoom (continuous parallax)
    useGSAP(() => {
        if (bgImgRef.current) {
            gsap.fromTo(
                bgImgRef.current,
                { scale: 1 },
                {
                    scale: 1.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                }
            );
        }
    }, []);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const ctx = gsap.context(() => {
                // Heading entrance with SplitText
                if (headingRef.current) {
                    const headingSplit = SplitText.create(
                        headingRef.current.querySelectorAll(".text-inner"),
                        { type: "chars" }
                    );

                    gsap.fromTo(
                        headingSplit.chars,
                        { y: 60, opacity: 0, rotateY: 20 },
                        {
                            y: 0,
                            opacity: 1,
                            rotateY: 0,
                            duration: 0.9,
                            stagger: 0.02,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 80%",
                            },
                        }
                    );
                }

                // Subheading clip-path reveal
                gsap.fromTo(
                    ".approach-heading .subheading",
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.8,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: ".approach-heading .subheading",
                            start: "top 80%",
                        },
                    }
                );

                // Cards — staggered entrance with rotation from different angles
                cardRefs.current.forEach((card, i) => {
                    if (!card) return;
                    const rotateDir = i % 2 === 0 ? 3 : -3;
                    gsap.fromTo(
                        card,
                        {
                            y: 80,
                            opacity: 0,
                            rotateZ: rotateDir,
                            scale: 0.92,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            rotateZ: 0,
                            scale: 1,
                            duration: 1,
                            delay: i * 0.18,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: ".approach-grid",
                                start: "top 80%",
                            },
                        }
                    );

                    // Animate the big number with scale
                    const num = card.querySelector(".approach-card-num");
                    if (num) {
                        gsap.fromTo(
                            num,
                            { scale: 0.3, opacity: 0 },
                            {
                                scale: 1,
                                opacity: 0.25,
                                duration: 0.7,
                                delay: i * 0.18 + 0.3,
                                ease: "back.out(1.7)",
                                scrollTrigger: {
                                    trigger: ".approach-grid",
                                    start: "top 80%",
                                },
                            }
                        );
                    }
                });

                // Glow line above the cards
                gsap.fromTo(
                    ".approach-glow-line",
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: ".approach-grid",
                            start: "top 85%",
                        },
                    }
                );
            }, sectionRef);

            return () => ctx.revert();
        });
    }, []);

    // 3D tilt on hover
    useEffect(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const handlers: Array<() => void> = [];

        cards.forEach((card) => {
            const onMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                gsap.to(card, {
                    rotateX,
                    rotateY,
                    duration: 0.4,
                    ease: "power2.out",
                    transformPerspective: 800,
                });
            };

            const onLeave = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.6,
                    ease: "power3.out",
                });
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            handlers.push(() => {
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseleave", onLeave);
            });
        });

        return () => handlers.forEach((h) => h());
    }, []);

    return (
        <section className="approach-section" id="approach" ref={sectionRef}>
            <div className="approach-bg">
                <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
                    alt="City skyline"
                    className="approach-bg-img"
                    ref={bgImgRef}
                />
                <div className="approach-bg-overlay" />
            </div>

            <div className="holder" style={{ position: "relative", zIndex: 2 }}>
                <div className="approach-heading" ref={headingRef}>
                    <div className="key-wrap">
                        <div className="key" />
                    </div>
                    <h2 style={{ perspective: "600px" }}>
                        <div className="text-wrap">
                            <div className="text-inner">The Primevest</div>
                        </div>
                        <div className="text-wrap">
                            <div className="text-inner">Investment Approach</div>
                        </div>
                    </h2>
                    <div className="subheading">How We Generate Superior Returns</div>
                </div>

                <div className="glow-line approach-glow-line" style={{ marginBottom: 32 }} />

                <div className="approach-grid">
                    {pillars.map((pillar, i) => (
                        <div
                            className="approach-card"
                            key={pillar.number}
                            ref={(el) => { cardRefs.current[i] = el; }}
                        >
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
