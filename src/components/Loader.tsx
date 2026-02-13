"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const keyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(loaderRef.current, {
                    yPercent: -100,
                    duration: 0.9,
                    ease: "power3.inOut",
                    onComplete,
                });
            },
        });

        tl.fromTo(
            line1Ref.current,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(
                line2Ref.current,
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(
                keyRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                "-=0.2"
            )
            .to({}, { duration: 0.7 });
    }, [onComplete]);

    return (
        <div className="loader" ref={loaderRef}>
            <div className="loader-bg" />
            <div className="loader-box">
                <div className="loader-lines-text">
                    <div className="loader-line-text-wrap">
                        <div className="loader-line-text" ref={line1Ref} style={{ opacity: 0 }}>
                            Unlock the True Potential of your
                        </div>
                    </div>
                    <div className="loader-line-text-wrap">
                        <div className="loader-line-text" ref={line2Ref} style={{ opacity: 0 }}>
                            Multi-Family Real Estate Investment
                        </div>
                    </div>
                </div>
                <div className="loader-key-wrap" ref={keyRef} style={{ opacity: 0 }}>
                    <div className="loader-key-icon" />
                    <span className="loader-logo-text">Primevest</span>
                </div>
            </div>
        </div>
    );
}
