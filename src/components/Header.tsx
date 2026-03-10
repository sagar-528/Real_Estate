"use client";
import { useEffect, useState } from "react";

const navLeft = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Invest", href: "#invest" },
];

const navRight = [
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="holder">
                <div className="header-block">
                    <div className="header-logo">
                        <a href="#home">Prime<span>vest</span></a>
                    </div>

                    <nav className="header-nav">
                        <ul className="header-nav-list">
                            {navLeft.map((item) => (
                                <li key={item.label} className={item.href === "#home" ? "active" : ""}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <ul className="header-nav-list">
                            {navRight.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <a className="header-phone" href="tel:+12125550100">+1 (212) 555-0100</a>

                    <button
                        className="mob-nav-icon"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span
                            className="mob-nav-block"
                            style={{
                                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "",
                            }}
                        />
                        <span
                            className="mob-nav-block"
                            style={{ opacity: mobileOpen ? 0 : 1 }}
                        />
                        <span
                            className="mob-nav-block"
                            style={{
                                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "",
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        top: "var(--header-h)",
                        background: "rgba(10,10,10,0.97)",
                        zIndex: 99,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 32,
                    }}
                >
                    {[...navLeft, ...navRight].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                fontSize: 22,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--text-primary)",
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="tel:+12125550100"
                        style={{ fontSize: 16, color: "var(--accent)", marginTop: 16 }}
                    >
                        +1 (212) 555-0100
                    </a>
                </div>
            )}
        </header>
    );
}
