// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    // Hide Navbar on the landing page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    HEROWIKI
                </Link>
            </div>
            <div className="navbar-end">
                <Link to="/feed" className="btn btn-ghost mr-2">
                    Feed
                </Link>
                <Link to="/create" className="btn btn-primary">
                    Create Post
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
