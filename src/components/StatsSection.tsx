"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: 2.4, suffix: "B+", label: "Assets Under Management", prefix: "$" },
    { number: 18, suffix: "%", label: "Target Annual IRR", prefix: "" },
    { number: 150, suffix: "+", label: "Properties Acquired", prefix: "" },
    { number: 14, suffix: " Yrs", label: "Industry Experience", prefix: "" },
];

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
    const numRef = useRef<HTMLSpanElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal card
            gsap.fromTo(
                wrapRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: wrapRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Count-up animation
            const obj = { val: 0 };
            gsap.to(obj, {
                val: stat.number,
                duration: 2,
                ease: "power2.out",
                delay: index * 0.12 + 0.3,
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
            });
        });

        return () => ctx.revert();
    }, [stat, index]);

    return (
        <div className="stat-item" ref={wrapRef}>
            <div className="stat-number">
                <span ref={numRef}>{stat.prefix}0{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
        </div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section className="stats-section" ref={sectionRef}>
            <div className="holder">
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <StatItem key={i} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
