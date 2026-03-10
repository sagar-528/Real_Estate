"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const slides = [
    {
        img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
        label: "Urban Investment",
    },
    {
        img: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=1600&q=80",
        label: "Coastal Properties",
    },
    {
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        label: "Private Estates",
    },
];

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dotsRef = useRef<HTMLDivElement>(null);

    const goTo = useCallback((i: number) => setCurrent(i), []);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, 5500);
        return () => clearInterval(id);
    }, []);

    // Ken Burns zoom on active slide
    useEffect(() => {
        slideRefs.current.forEach((slide, i) => {
            if (!slide) return;
            if (i === current) {
                gsap.fromTo(
                    slide,
                    { scale: 1.0 },
                    { scale: 1.15, duration: 6, ease: "none" }
                );
            } else {
                gsap.killTweensOf(slide);
                gsap.set(slide, { scale: 1 });
            }
        });
    }, [current]);

    // Grand entrance timeline
    useGSAP(() => {
        document.fonts.ready.then(() => {
            const tl = gsap.timeline({ delay: 0.2 });

            // Decorative lines
            tl.to(".banner-line-v", {
                scaleY: 1,
                duration: 1.5,
                ease: "power2.inOut",
            }, 0);
            tl.to(".banner-line-h", {
                scaleX: 1,
                duration: 1.8,
                ease: "power2.inOut",
            }, 0.3);

            // Subheading clip-path reveal
            tl.fromTo(
                subRef.current,
                { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 1 },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.9,
                    ease: "power3.inOut",
                },
                0.4
            );

            // SplitText character animation on h1
            if (h1Ref.current) {
                const split = SplitText.create(h1Ref.current, { type: "chars,words" });
                tl.fromTo(
                    split.chars,
                    { y: 80, opacity: 0, rotateX: -40 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1,
                        stagger: 0.025,
                        ease: "power3.out",
                    },
                    0.5
                );
            }

            // Button scales in with elastic bounce
            tl.fromTo(
                btnRef.current,
                { y: 30, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
                1.2
            );

            // Link flash slides in
            tl.fromTo(
                linkRef.current,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                1.4
            );

            // Dots animate in
            if (dotsRef.current) {
                tl.fromTo(
                    dotsRef.current.children,
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    1.5
                );
            }
        });
    }, []);

    return (
        <section className="banner" id="home" ref={sectionRef}>
            <div className="banner-slider-wrap">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        ref={(el) => { slideRefs.current[i] = el; }}
                        className={`banner-slide ${i === current ? "active" : ""}`}
                        style={{
                            backgroundImage: `url(${slide.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                ))}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(200,167,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,167,80,0.03) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
                {/* Decorative animated lines */}
                <div className="banner-decorative-line banner-line-v" />
                <div className="banner-decorative-line banner-line-h" />
            </div>

            <div className="banner-overlay" />

            <div className="banner-main">
                <div className="holder">
                    <div className="banner-block">
                        <div
                            className="subheading"
                            ref={subRef}
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            {slides[current].label} · Premium Portfolio
                        </div>
                        <h1
                            className="banner-h1"
                            ref={h1Ref}
                            style={{ perspective: "600px" }}
                        >
                            Where <em>Capital</em> Meets<br />Timeless Property
                        </h1>
                        <div className="banner-actions">
                            <a
                                className="button"
                                href="#invest"
                                ref={btnRef}
                                style={{ opacity: 0 }}
                            >
                                Explore Opportunities
                            </a>
                            <a
                                className="link-flash"
                                href="#about"
                                ref={linkRef}
                                style={{ opacity: 0 }}
                            >
                                Our Story <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="slider-dots" ref={dotsRef}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`slider-dot ${i === current ? "active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
