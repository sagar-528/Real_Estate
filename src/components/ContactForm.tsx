"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        // Animate the thank-you state in
        gsap.fromTo(
            ".thanks",
            { y: 30, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }
        );
    };

    useGSAP(() => {
        let ctx: gsap.Context;
        document.fonts.ready.then(() => {
            ctx = gsap.context(() => {
                // Heading SplitText reveal
                const headingSplit = SplitText.create(".join-heading-animate", { type: "words" });
                gsap.fromTo(
                    headingSplit.words,
                    { y: 60, opacity: 0, rotateX: -30 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.9,
                        stagger: 0.06,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                        },
                    }
                );

                // Key line scales in
                gsap.fromTo(
                    ".join-section .key",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                        },
                    }
                );

                // Glow line reveal
                gsap.fromTo(
                    ".contact-glow-line",
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        },
                    }
                );

                // Input fields stagger in
                gsap.fromTo(
                    ".input-item",
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".form-contact",
                            start: "top 85%",
                        },
                    }
                );

                // Submit button entrance
                gsap.fromTo(
                    ".form-button .button",
                    { y: 20, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: ".form-button",
                            start: "top 90%",
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
        <section className="join-section" id="contact" ref={sectionRef}>
            <div className="holder">
                <h2 style={{ perspective: "600px" }}>
                    <div className="text-wrap">
                        <span className="join-heading-animate" style={{ display: "inline-block" }}>
                            Join The Primevest Club
                        </span>
                    </div>
                </h2>

                <div className="glow-line contact-glow-line" style={{ maxWidth: 400, margin: "0 auto 40px" }} />

                <div className="join-form">
                    <div className="key-wrap">
                        <div className="key" />
                    </div>

                    {!submitted ? (
                        <form className="form-contact" ref={formRef} onSubmit={handleSubmit}>
                            <div className="input-box">
                                <span className="input-item">
                                    <input type="text" placeholder="full name" required />
                                </span>
                                <span className="input-item">
                                    <input type="email" placeholder="email" required />
                                </span>
                                <span className="input-item">
                                    <input type="tel" placeholder="phone" />
                                </span>
                                <span className="input-item">
                                    <input type="text" placeholder="message" />
                                </span>
                            </div>
                            <div className="form-button">
                                <button className="button" type="submit">
                                    Send Investment Inquiry
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="thanks" style={{ display: "block" }}>
                            <h2>Thanks for Joining!</h2>
                            <div className="subheading">Check your email to verify your application.</div>
                            <br />
                            <button
                                className="button"
                                onClick={() => setSubmitted(false)}
                                style={{ cursor: "pointer" }}
                            >
                                Back to Home Page
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
