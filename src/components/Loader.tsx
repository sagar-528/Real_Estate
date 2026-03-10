"use client";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [canHide, setCanHide] = useState(false);

    // ── SpyltMilk PreLoader-style resource tracking ──
    useEffect(() => {
        const MIN_DURATION = 1200;
        const startTime = performance.now();

        const resources: (HTMLImageElement | HTMLVideoElement)[] = [
            ...Array.from(document.images),
            ...Array.from(document.querySelectorAll("video")),
        ];

        const total = resources.length || 1;
        let loaded = 0;

        const updateProgress = () => {
            loaded++;
            const percent = Math.round((loaded / total) * 100);
            setProgress((prev) => (percent > prev ? percent : prev));
        };

        resources.forEach((res) => {
            if (
                (res instanceof HTMLImageElement && res.complete) ||
                (res instanceof HTMLVideoElement && res.readyState >= 3)
            ) {
                updateProgress();
            } else {
                res.addEventListener("load", updateProgress);
                res.addEventListener("loadeddata", updateProgress);
                res.addEventListener("error", updateProgress);
            }
        });

        if (document.fonts) {
            document.fonts.ready.then(() => {
                setProgress((prev) => (prev < 90 ? 90 : prev));
            });
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    const elapsed = performance.now() - startTime;
                    const remaining = MIN_DURATION - elapsed;
                    if (remaining > 0) {
                        setTimeout(() => setCanHide(true), remaining);
                    } else {
                        setCanHide(true);
                    }
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        const handleWindowLoad = () => {
            const elapsed = performance.now() - startTime;
            const remaining = MIN_DURATION - elapsed;
            if (remaining > 0) {
                setTimeout(() => setCanHide(true), remaining);
            } else {
                setCanHide(true);
            }
        };
        window.addEventListener("load", handleWindowLoad);

        return () => {
            clearInterval(interval);
            window.removeEventListener("load", handleWindowLoad);
        };
    }, []);

    // ── SpyltMilk PreLoader-style GSAP fade-out ──
    useGSAP(() => {
        if (progress >= 100 && canHide) {
            gsap.to(".loader", {
                yPercent: -100,
                duration: 0.9,
                ease: "power3.inOut",
                onComplete,
            });
        }
    }, [progress, canHide, onComplete]);

    return (
        <div className="loader">
            <div className="loader-bg" />
            <div className="loader-box">
                <div className="loader-lines-text">
                    <div className="loader-line-text-wrap">
                        <div className="loader-line-text">
                            Unlock the True Potential of your
                        </div>
                    </div>
                    <div className="loader-line-text-wrap">
                        <div className="loader-line-text">
                            Multi-Family Real Estate Investment
                        </div>
                    </div>
                </div>
                <div className="loader-key-wrap">
                    <div className="loader-key-icon" />
                    <span className="loader-logo-text">Primevest</span>
                </div>
                {/* SpyltMilk-style progress bar */}
                <div className="loader-progress-wrap">
                    <p className="loader-progress-text">{progress}%</p>
                    <div className="loader-progress-bar">
                        <div
                            className="loader-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
