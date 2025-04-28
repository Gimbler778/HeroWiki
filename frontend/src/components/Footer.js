import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    // Hide Footer on the landing page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by HEROWIKI</p>
                <div className="flex space-x-4 mt-2">
                    {/* Instagram Link */}
                    <a
                        href="https://www.instagram.com/aditya_fr_fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700"
                    >
                        <i className="fab fa-instagram text-2xl"></i> {/* Font Awesome Icon */}
                    </a>
                    {/* LinkedIn Link */}
                    <a
                        href="https://in.linkedin.com/in/devanshsoni19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <i className="fab fa-linkedin text-2xl"></i> {/* Font Awesome Icon */}
                    </a>
                </div>
            </aside>
        </footer>
    );
}

export default Footer;
