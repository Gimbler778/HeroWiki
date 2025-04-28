import React from 'react';
import { Link } from 'react-router-dom';

function HeroCard({ hero }) {
    const generatePreview = (markdown) => {
        // ... (keep existing generatePreview function)
        if (!markdown) return '';
        const plainText = markdown
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
            .replace(/#+\s/g, '')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/(\r\n|\n|\r)/gm, " ");
        return plainText.length > 100 ? plainText.substring(0, 97) + '...' : plainText;
    };

    return (
        // Apply group class to Link for hover effects on card
        <Link to={`/hero/${hero.id}`} className="block group">
            {/* Card styling with transitions and group-hover effects */}
            <div className="card bg-base-200 shadow-xl h-full transition-all duration-300 ease-in-out group-hover:bg-base-300 group-hover:scale-[1.03] group-hover:shadow-2xl">
                <div className="card-body">
                     {/* Title with primary color */}
                    <h2 className="card-title truncate text-primary">{hero.title || 'Untitled Hero'}</h2>
                    {/* Description preview */}
                    <p className="text-sm text-base-content text-opacity-70">
                        {generatePreview(hero.description)}
                    </p>
                    {/* Removed the button as the whole card is a link */}
                    {/* <div className="card-actions justify-end mt-4">
                        <button className="btn btn-sm btn-outline btn-primary">View Details</button>
                    </div> */}
                </div>
            </div>
        </Link>
    );
}

export default HeroCard;
