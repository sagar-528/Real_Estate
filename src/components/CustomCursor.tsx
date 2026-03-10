"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const isTouch = window.matchMedia("(hover: none)").matches;
        if (isTouch) return;

        gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 1 });
        gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0.5 });

        const moveDot = gsap.quickTo(dot, "css", { duration: 0.15, ease: "power2.out" });
        const moveRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
        const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power2.out" });
            moveRingX(e.clientX);
            moveRingY(e.clientY);
        };

        const interactives = "a, button, .button, .link-flash, input, .slider-dot, .approach-card, .team-card";

        const onEnter = () => {
            gsap.to(ring, { scale: 1.8, opacity: 0.3, duration: 0.3, ease: "power2.out" });
            gsap.to(dot, { scale: 1.5, duration: 0.3, ease: "power2.out" });
        };

        const onLeave = () => {
            gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out" });
            gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        window.addEventListener("mousemove", onMove);

        const addHoverListeners = () => {
            document.querySelectorAll(interactives).forEach((el) => {
                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);
            });
        };

        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            observer.disconnect();
            document.querySelectorAll(interactives).forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    );
}
