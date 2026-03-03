"use client";
import { useRef, useState } from "react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="join-section" id="contact">
            <div className="holder reveal">
                <h2>
                    <div className="text-wrap">
                        <div className="text-inner">Join The Primevest Club</div>
                    </div>
                </h2>

                <div className="join-form">
                    <div className="key-wrap">
                        <div className="key" />
                    </div>

                    {!submitted ? (
                        <form className="form-contact" ref={formRef} onSubmit={handleSubmit}>
                            <div className="input-box">
                                <span className="input-item">
                                    <input
                                        type="text"
                                        placeholder="full name"
                                        required
                                    />
                                </span>
                                <span className="input-item">
                                    <input
                                        type="email"
                                        placeholder="email"
                                        required
                                    />
                                </span>
                                <span className="input-item">
                                    <input
                                        type="tel"
                                        placeholder="phone"
                                    />
                                </span>
                                <span className="input-item">
                                    <input
                                        type="text"
                                        placeholder="message"
                                    />
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
