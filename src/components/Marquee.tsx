"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const phrases = [
    "Premium Investments",
    "Multi-Family Properties",
    "Value-Add Strategy",
    "Accredited Investors",
    "New York",
    "Miami",
    "Los Angeles",
    "Private Equity",
    "Capital Growth",
    "Monthly Cash Flow",
];

export default function Marquee() {
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const firstSet = track.querySelector(".marquee-set") as HTMLElement;
        if (!firstSet) return;

        const w = firstSet.offsetWidth;

        gsap.to(track, {
            x: -w,
            duration: 35,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % w),
            },
        });
    }, []);

    const renderSet = (key: string) => (
        <div className="marquee-item marquee-set" key={key}>
            {phrases.map((text, i) => (
                <span key={`${key}-${i}`} style={{ display: "contents" }}>
                    <span className="marquee-text">{text}</span>
                    <span className="marquee-dot" />
                </span>
            ))}
        </div>
    );

    return (
        <div className="marquee-section">
            <div className="marquee-track" ref={trackRef}>
                {renderSet("a")}
                {renderSet("b")}
                {renderSet("c")}
            </div>
        </div>
    );
}
