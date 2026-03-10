"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const team = [
    {
        name: "Alexander Mercer",
        title: "Founder & Managing Partner",
        bio: "25+ years in real estate private equity. Former VP at Blackstone Real Estate. Harvard MBA. Led $4B+ in commercial acquisitions across major US markets.",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Sophia Chen",
        title: "Chief Investment Officer",
        bio: "Former Goldman Sachs Real Estate analyst. Specializes in luxury residential and mixed-use development. Columbia Business School alum with 18 years of experience.",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "James Whitfield",
        title: "Head of Acquisitions",
        bio: "Expert in off-market deal sourcing across New York, Miami and Los Angeles. Closed over 80 transactions totaling $1.2B in asset value over his 15-year career.",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Isabella Torres",
        title: "Director of Investor Relations",
        bio: "Dedicated to building long-term relationships with our accredited investor network. Previously led IR at KKR Real Estate. NYU Stern School of Business.",
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    },
];

export default function TeamSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        let ctx: gsap.Context;
        document.fonts.ready.then(() => {
            ctx = gsap.context(() => {
                // SplitText on heading
                if (headingRef.current) {
                    const split = SplitText.create(
                        headingRef.current.querySelectorAll(".text-inner"),
                        { type: "chars" }
                    );
                    gsap.fromTo(
                        split.chars,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.02,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 80%",
                            },
                        }
                    );
                }

                // Subheading clip-path
                gsap.fromTo(
                    ".team-header .subheading",
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 0.8,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: ".team-header .subheading",
                            start: "top 80%",
                        },
                    }
                );

                // Cards with clipPath image reveal + alternating direction
                cardRefs.current.forEach((card, i) => {
                    if (!card) return;

                    const imgWrap = card.querySelector(".team-card-img-wrap");
                    const info = card.querySelector(".team-card-info");
                    const isEven = i % 2 === 0;

                    // Card entrance — alternating from left/right
                    gsap.fromTo(
                        card,
                        {
                            x: isEven ? -60 : 60,
                            y: 40,
                            opacity: 0,
                            rotateZ: isEven ? -2 : 2,
                        },
                        {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            rotateZ: 0,
                            duration: 1,
                            delay: i * 0.12,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: ".team-grid",
                                start: "top 80%",
                            },
                        }
                    );

                    // Image reveal — curtain wipe from bottom
                    if (imgWrap) {
                        gsap.fromTo(
                            imgWrap,
                            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
                            {
                                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                                duration: 1.1,
                                delay: i * 0.12 + 0.2,
                                ease: "power3.inOut",
                                scrollTrigger: {
                                    trigger: ".team-grid",
                                    start: "top 80%",
                                },
                            }
                        );
                    }

                    // Info text slides up
                    if (info) {
                        gsap.fromTo(
                            info,
                            { y: 20, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.7,
                                delay: i * 0.12 + 0.5,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: ".team-grid",
                                    start: "top 80%",
                                },
                            }
                        );
                    }
                });

                // CTA button entrance
                gsap.fromTo(
                    ".team-cta .button",
                    { y: 30, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: ".team-cta",
                            start: "top 90%",
                        },
                    }
                );

                // Glow line above grid
                gsap.fromTo(
                    ".team-glow-line",
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: ".team-grid",
                            start: "top 85%",
                        },
                    }
                );
            }, sectionRef);
        });
        return () => {
            ctx?.revert();
        };
    }, []);

    return (
        <section className="team-section" id="team" ref={sectionRef}>
            <div className="holder">
                <div className="team-header" ref={headingRef}>
                    <div className="key-wrap">
                        <div className="key" />
                    </div>
                    <h2>
                        <div className="text-wrap">
                            <div className="text-inner">The Primevest</div>
                        </div>
                        <div className="text-wrap">
                            <div className="text-inner">Team</div>
                        </div>
                    </h2>
                    <div className="subheading">Institutional Expertise · Personal Commitment</div>
                </div>

                <div className="glow-line team-glow-line" style={{ marginBottom: 32 }} />

                <div className="team-grid">
                    {team.map((member, i) => (
                        <div
                            className="team-card"
                            key={member.name}
                            ref={(el) => { cardRefs.current[i] = el; }}
                        >
                            <div className="team-card-img-wrap">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="team-card-img"
                                />
                                <div className="team-card-img-overlay" />
                            </div>
                            <div className="team-card-info">
                                <div className="team-card-name">{member.name}</div>
                                <div className="subheading" style={{ marginBottom: 12 }}>
                                    {member.title}
                                </div>
                                <p className="team-card-bio">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="team-cta">
                    <a className="button" href="#contact">
                        Work With Our Team
                    </a>
                </div>
            </div>
        </section>
    );
}
