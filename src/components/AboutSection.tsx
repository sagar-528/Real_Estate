"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let ctx: gsap.Context;
        document.fonts.ready.then(() => {
            ctx = gsap.context(() => {
                // SplitText on the heading — scrub color reveal word by word
                const headingSplit = SplitText.create(".about-heading-primary", { type: "words" });
                gsap.to(headingSplit.words, {
                    color: "var(--text-primary)",
                    ease: "power1.in",
                    stagger: 1,
                    scrollTrigger: {
                        trigger: ".about-heading-primary",
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: true,
                    },
                });

                // Clip-path reveal on the subheading box
                gsap.to(".about-reveal-box", {
                    duration: 0.5,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "circ.inOut",
                    scrollTrigger: {
                        trigger: ".about-reveal-box",
                        start: "top 75%",
                    },
                });

                // SplitText on paragraphs — words slide up with rotation
                const paragraphSplit = SplitText.create(".about-team-text", {
                    type: "words,lines",
                    linesClass: "about-paragraph-line",
                });
                gsap.from(paragraphSplit.words, {
                    duration: 1,
                    stagger: 0.01,
                    yPercent: 300,
                    rotate: 3,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: ".about-team",
                        start: "top 60%",
                    },
                });

                // Parallax on the centre image
                gsap.to(imgRef.current, {
                    y: -40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });

                // SplitText on the slogan — scrub color reveal word by word
                const sloganSplit = SplitText.create(".slogan-text", { type: "words" });
                gsap.to(sloganSplit.words, {
                    color: "var(--text-secondary)",
                    ease: "power1.in",
                    stagger: 1,
                    scrollTrigger: {
                        trigger: ".slogan",
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: true,
                    },
                });
            }, sectionRef);
        });
        return () => {
            ctx?.revert();
        };
    }, []);

    return (
        <section className="about-section" id="about" ref={sectionRef}>
            <div className="holder">

                {/* ── 3-column layout matching TREF ── */}
                <div className="about-team">

                    {/* Col 1 — heading + intro text */}
                    <div className="about-team-col">
                        <div className="key-wrap"><div className="key" /></div>
                        <h2 className="about-heading-primary">
                            About Primevest
                        </h2>
                        <div className="about-reveal-box">
                            <div className="subheading">
                                Multi-Family Real Estate Investments with Proven Returns
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
                    <div className="about-team-col">
                        <p className="about-team-text">
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
                <div className="slogan">
                    <p className="slogan-text">
                        &ldquo;Primevest&apos;s business model is simple: Get into the real
                        estate market near its ow point and get out before an{" "}
                        conomic downturn.&rdquo;
                    </p>
                </div>
            </div>
        </section>
    );
}
