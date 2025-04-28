import React from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundImageUrl = 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fdark-fantasy-3-v0-k7e9hd36jr9d1.jpg%3Fwidth%3D604%26format%3Dpjpg%26auto%3Dwebp%26s%3D0ed36fa9cd73b1b57090dd6df75a672347171776';

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
                        className="btn btn-outline btn-accent btn-lg" // Updated button style
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
