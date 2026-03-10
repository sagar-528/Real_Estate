"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);
    const sloganRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal text columns
            gsap.fromTo(
                col1Ref.current,
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: col1Ref.current, start: "top 80%" },
                }
            );
            gsap.fromTo(
                col3Ref.current,
                { x: 40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: col3Ref.current, start: "top 80%" },
                }
            );

            // Parallax on the centre image
            gsap.to(imgRef.current, {
                y: -40, ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom", end: "bottom top",
                    scrub: 1.5,
                },
            });

            // Slogan reveal
            gsap.fromTo(
                sloganRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: sloganRef.current, start: "top 85%" },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" id="about" ref={sectionRef}>
            <div className="holder">

                {/* ── 3-column layout matching TREF ── */}
                <div className="about-team">

                    {/* Col 1 — heading + intro text */}
                    <div className="about-team-col reveal" ref={col1Ref}>
                        <div className="key-wrap"><div className="key" /></div>
                        <h2>
                            <div className="text-wrap">
                                <div className="text-inner">About<br />Primevest</div>
                            </div>
                        </h2>
                        <div className="subheading">
                            <div className="text-wrap">
                                <div className="text-inner">Multi-Family Real Estate Investments with Proven Returns</div>
                            </div>
                        </div>
                        <p className="about-team-text mob-hidden">
                            Primevest is a low leverage Private Equity Fund created to facilitate
                            the acquisition of investment real estate with a particular emphasis
                            on purchasing value-added multi-family properties.
                        </p>
                    </div>

                    {/* Col 2 — centre image with parallax */}
                    <div className="about-team-col img-float" ref={imgRef}>
                        <img
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80"
                            alt="Manhattan luxury apartment building"
                        />
                    </div>

                    {/* Col 3 — body copy + Learn More */}
                    <div className="about-team-col" ref={col3Ref}>
                        <p className="about-team-text">
                            <span className="mob-hide">
                                Primevest is a low leverage Private Equity Fund created to
                                facilitate the acquisition of investment real estate with a
                                particular emphasis on purchasing value-added multi-family
                                properties.&nbsp;
                            </span>
                            Founded by experienced principals with decades of real estate
                            expertise, Primevest marks our fourth Private Equity Fund. Our
                            seasoned team has a consistent record of delivering Monthly Cash Flow
                            and Capital Growth, providing substantial returns on per-property
                            investments to accredited investors.
                        </p>
                        <a href="#invest" className="link-flash">
                            Learn More <span className="arrow">→</span>
                        </a>
                    </div>
                </div>

                {/* ── Slogan ── */}
                <div className="slogan" ref={sloganRef}>
                    <p className="slogan-text">
                        &ldquo;Primevest&apos;s business model is simple: Get into the real
                        estate market near its <strong>low point</strong> and get out before an{" "}
                        <strong>economic downturn</strong>.&rdquo;
                    </p>
                </div>
            </div>
        </section>
    );
}
