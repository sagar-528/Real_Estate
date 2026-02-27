"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".team-card",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".team-grid",
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="team-section" id="team" ref={sectionRef}>
            <div className="holder">
                <div className="team-header">
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

                <div className="team-grid">
                    {team.map((member) => (
                        <div className="team-card" key={member.name}>
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
