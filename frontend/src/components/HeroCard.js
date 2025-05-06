import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HeroCard({ hero, bgColor, textColor }) {
    const [upvotes, setUpvotes] = useState(0); // State for upvotes
    const [downvotes, setDownvotes] = useState(0); // State for downvotes

    const generatePreview = (markdown) => {
        if (!markdown) return '';
        const plainText = markdown
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
            .replace(/#+\s/g, '')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/(\r\n|\n|\r)/gm, " ");
        return plainText.length > 100 ? plainText.substring(0, 97) + '...' : plainText;
    };

    const fallbackColor = 'bg-secondary/30';
    const fallbackTextColor = 'text-white';

    return (
        <Link to={`/hero/${hero.id}`} className="block group h-full"> 
            <div className={`card shadow-xl h-full transition-all duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-2xl ${bgColor || fallbackColor}`}>
                <div className={`card-body ${textColor || fallbackTextColor}`}>
                    <h2 className="card-title truncate">{hero.title || 'Untitled Hero'}</h2>
                    <p className="text-sm">
                        {generatePreview(hero.description)}
                    </p>
                    {/* Upvote and Downvote Section */}
                    <div className="flex justify-between items-center mt-4">
                        {/* Upvote Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation when clicking the button
                                setUpvotes(upvotes + 1);
                            }}
                            className="btn btn-soft btn-success flex items-center gap-2"
                        >
                            <i className="fas fa-arrow-up"></i> {/* Font Awesome Up Arrow */}
                            {upvotes}
                        </button>
                        {/* Downvote Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation when clicking the button
                                setDownvotes(downvotes + 1);
                            }}
                            className="btn btn-soft btn-error flex items-center gap-2"
                        >
                            <i className="fas fa-arrow-down"></i> {/* Font Awesome Down Arrow */}
                            {downvotes}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HeroCard;
