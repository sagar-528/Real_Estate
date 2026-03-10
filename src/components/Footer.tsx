"use client";

const footerNav = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Invest", href: "#invest" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="holder">
                <div className="footer-top">
                    <div>
                        <a href="#home" className="footer-logo-name">
                            Prime<span>vest</span>
                        </a>
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

                <div className="footer-bottom">
                    <div className="footer-copy">
                        <div className="copyright">
                            © {year} Primevest LLC. All Rights Reserved.
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
