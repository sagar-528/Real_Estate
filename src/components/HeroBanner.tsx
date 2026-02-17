"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// Unsplash real estate hero images
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
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    const goTo = useCallback((i: number) => setCurrent(i), []);

    // Auto-advance slider
    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, 5000);
        return () => clearInterval(id);
    }, []);

    // GSAP entrance for text elements
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo(
            subRef.current,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(
                h1Ref.current,
                { y: 48, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(
                btnRef.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                "-=0.5"
            );
    }, []);

    return (
        <section className="banner" id="home">
            {/* Background slides */}
            <div className="banner-slider-wrap">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`banner-slide ${i === current ? "active" : ""}`}
                        style={{
                            backgroundImage: `url(${slide.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                ))}
                {/* Decorative grid overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            <div className="banner-overlay" />

            <div className="banner-main">
                <div className="holder">
                    <div className="banner-block">
                        <div className="subheading reveal-fade" ref={subRef} style={{ opacity: 0 }}>
                            {slides[current].label} · Premium Portfolio
                        </div>
                        <h1 className="banner-h1" ref={h1Ref} style={{ opacity: 0 }}>
                            Where <em>Capital</em> Meets<br />Timeless Property
                        </h1>
                        <div className="banner-actions">
                            <a className="button" href="#invest" ref={btnRef} style={{ opacity: 0 }}>
                                Explore Opportunities
                            </a>
                            <a className="link-flash" href="#about">
                                Our Story <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide dots */}
            <div className="slider-dots">
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
