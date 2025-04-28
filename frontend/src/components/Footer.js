// frontend/src/components/Footer.js
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
                <p>Copyright © {new Date().getFullYear()} - All right reserved by HEROWIKI</p>
            </aside>
        </footer>
    );
}

export default Footer;
