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
            <div className="navbar-center"> 
            <Link to="/" className="btn btn-ghost text-xl">
            <img
                    src="/favicons-32x32.png" // Path to the favicon in the public folder
                    alt="HeroWiki Logo"
                    className="w-9 h-9 " 
                />
                    HEROWIKI
                </Link>
            </div>
            <div className="navbar-end">
                <Link to="/feed" className="btn btn-outline btn-info  mr-3"> {/* Updated button style */}
                    Feed
                </Link>
                <Link to="/create" className="btn btn-outline btn-warning"> {/* Updated button style */}
                    Create Post
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
