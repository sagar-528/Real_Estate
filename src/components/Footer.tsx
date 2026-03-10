"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const footerNav = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Invest", href: "#invest" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const ctx = gsap.context(() => {
                // Logo SplitText chars flying up on scroll scrub
                const footTextSplit = SplitText.create(".footer-logo-animate", { type: "chars" });
                gsap.from(footTextSplit.chars, {
                    yPercent: 200,
                    stagger: 0.05,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: ".footer",
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1.5,
                    },
                });

                // Nav links stagger in from right
                gsap.fromTo(
                    ".footer-nav a",
                    { x: 30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".footer-nav",
                            start: "top 85%",
                        },
                    }
                );

                // Footer text slides up
                gsap.fromTo(
                    ".footer-text p",
                    { y: 25, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".footer-text",
                            start: "top 88%",
                        },
                    }
                );

                // Horizontal divider line grows
                gsap.fromTo(
                    ".footer-divider-line",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.4,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: ".footer-bottom",
                            start: "top 92%",
                        },
                    }
                );

                // Bottom row fades in
                gsap.fromTo(
                    ".footer-bottom > *",
                    { y: 15, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".footer-bottom",
                            start: "top 92%",
                        },
                    }
                );
            }, footerRef);

            return () => ctx.revert();
        });
    }, []);

    return (
        <footer className="footer" ref={footerRef}>
            <div className="holder">
                <div className="footer-top">
                    <div>
                        <div style={{ overflow: "hidden", marginBottom: 16 }}>
                            <a
                                href="#home"
                                className="footer-logo-name footer-logo-animate"
                                style={{ display: "inline-block", margin: 0 }}
                            >
                                Prime<span style={{ color: "var(--accent)" }}>vest</span>
                            </a>
                        </div>
                        <ul className="footer-nav">
                            {footerNav.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-text">
                        <p>
                            This information does not constitute an offer to purchase
                            securities and merely constitutes an invitation for potential
                            accredited investors to register to receive further information.
                            Any offer will only be made through formal offering documents.
                        </p>
                        <p>
                            245 Park Avenue, Suite 3900<br />
                            New York, NY 10167
                        </p>
                    </div>
                </div>

                <div
                    className="footer-divider-line"
                    style={{
                        height: 1,
                        background: "var(--border)",
                        transformOrigin: "left",
                    }}
                />

                <div className="footer-bottom" style={{ borderTop: "none" }}>
                    <div className="footer-copy">
                        <div className="copyright">
                            &copy; {year} Primevest LLC. All Rights Reserved.
                        </div>
                        <div className="privacy" style={{ marginTop: 8 }}>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                    <div className="footer-studio">
                        <a href="#">Built with Next.js &amp; GSAP</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
