"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: 2.4, suffix: "B+", label: "Assets Under Management", prefix: "$" },
    { number: 18, suffix: "%", label: "Target Annual IRR", prefix: "" },
    { number: 150, suffix: "+", label: "Properties Acquired", prefix: "" },
    { number: 14, suffix: " Yrs", label: "Industry Experience", prefix: "" },
];

function StatItem({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
    const numRef = useRef<HTMLSpanElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Card entrance with scale
            gsap.fromTo(
                wrapRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    delay: index * 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: wrapRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Count-up with elastic finish
            const obj = { val: 0 };
            gsap.to(obj, {
                val: stat.number,
                duration: 2.5,
                ease: "power2.out",
                delay: index * 0.15 + 0.3,
                scrollTrigger: {
                    trigger: wrapRef.current,
                    start: "top 85%",
                },
                onUpdate: () => {
                    if (numRef.current) {
                        const display =
                            stat.number % 1 !== 0
                                ? obj.val.toFixed(1)
                                : Math.round(obj.val).toString();
                        numRef.current.textContent = `${stat.prefix}${display}${stat.suffix}`;
                    }
                },
                onComplete: () => {
                    // Pulse scale on complete
                    if (numRef.current) {
                        gsap.fromTo(
                            numRef.current,
                            { scale: 1 },
                            { scale: 1.08, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }
                        );
                    }
                },
            });

            // Label slides up
            gsap.fromTo(
                labelRef.current,
                { y: 15, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.15 + 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: wrapRef.current,
                        start: "top 85%",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [stat, index]);

    return (
        <div className="stat-item" ref={wrapRef}>
            <div className="stat-number">
                <span ref={numRef} className="shimmer-text">
                    {stat.prefix}0{stat.suffix}
                </span>
            </div>
            <div className="stat-label" ref={labelRef}>
                {stat.label}
            </div>
        </div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            ".stats-glow-line",
            { scaleX: 0, opacity: 0 },
            {
                scaleX: 1,
                opacity: 1,
                duration: 1.4,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <section className="stats-section" ref={sectionRef}>
            <div className="holder">
                <div
                    className="glow-line stats-glow-line"
                    style={{ marginBottom: 24 }}
                />
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <StatItem key={i} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
