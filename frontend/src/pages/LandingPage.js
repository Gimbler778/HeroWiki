import React from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundImageUrl = 'https://i.pinimg.com/736x/c6/99/6e/c6996e551757ea2975cd2584f8f93e92.jpg';

function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/feed');
    };

    return (
        <div
            className="hero min-h-screen"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="hero-overlay bg-black bg-opacity-60 backdrop-blur-sm"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-6xl font-bold text-white">HEROWIKI</h1>
                    <p className="mb-5 text-lg text-gray-200">
                        Discover, create, and share amazing heroes. Explore their stories, powers, and backgrounds in our community-driven wiki.
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="btn btn-primary btn-lg"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
