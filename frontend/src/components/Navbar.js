import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuthStatus, logout } from '../services/heroService';
import LoginModal from './LoginModal';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Hide Navbar on the landing page
    if (location.pathname === '/') {
        return null;
    }

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const status = await getAuthStatus();
                setProfile(status.authenticated ? status.user : null);
            } catch (err) {
                setProfile(null);
            } finally {
                setProfileLoaded(true);
            }
        };

        loadProfile();

        const handleFocus = () => loadProfile();
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                loadProfile();
            }
        };

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [location.pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setProfile(null);
            setDropdownOpen(false);
            window.location.href = '/feed';
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleFeedClick = (event) => {
        event.preventDefault();
        navigate('/feed', { state: { refreshAt: Date.now() } });
    };

    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return '?';
        const parts = name.trim().split(/\s+/);
        return parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : name[0].toUpperCase();
    };

    return (
        <>
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
            <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
                <div className="navbar-center">
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img
                            src="/favicons-32x32.png"
                            alt="HeroWiki Logo"
                            className="w-9 h-9"
                        />
                        HEROWIKI
                    </Link>
                </div>
                <div className="navbar-end gap-2">
                    <Link to="/feed" onClick={handleFeedClick} className="btn btn-outline btn-info btn-sm sm:btn-md">
                        Feed
                    </Link>
                    <Link to="/create" className="btn btn-outline btn-warning btn-sm sm:btn-md">
                        Create Post
                    </Link>

                    {/* Only render auth section after profile check to avoid flash */}
                    {profileLoaded && (
                        <>
                            {profile ? (
                                /* --- Avatar dropdown --- */
                                <div className="relative ml-2" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen((o) => !o)}
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-sm ring-2 ring-primary/40 hover:ring-primary transition-all focus:outline-none"
                                        title={profile.displayName || 'Profile'}
                                    >
                                        {profile.avatarUrl ? (
                                            <img
                                                src={profile.avatarUrl}
                                                alt={profile.displayName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            getInitials(profile.displayName)
                                        )}
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-base-200 border border-base-300 rounded-xl shadow-xl z-50 overflow-hidden">
                                            <div className="px-4 py-3 border-b border-base-300">
                                                <p className="text-sm font-semibold truncate">{profile.displayName}</p>
                                                {profile.email && (
                                                    <p className="text-xs opacity-60 truncate">{profile.email}</p>
                                                )}
                                            </div>
                                            <Link
                                                to="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-300 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                My Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-base-300 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* --- Sign In button --- */
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="btn btn-success btn-sm sm:btn-md ml-2"
                                >
                                    Sign In
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;
