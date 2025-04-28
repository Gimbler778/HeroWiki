// filepath: d:\a 2.o\herowiki\frontend\src\components\HeroCard.js
import React from 'react';
import { Link } from 'react-router-dom';

// Accept bgColor prop
function HeroCard({ hero, bgColor }) { // Removed default here

    const generatePreview = (markdown) => {
        // ... (keep existing generatePreview function)
        if (!markdown) return '';
        const plainText = markdown
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
            .replace(/#+\s/g, '')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Added image alt text extraction
            .replace(/(\r\n|\n|\r)/gm, " ");
        return plainText.length > 100 ? plainText.substring(0, 97) + '...' : plainText;
    };

    // Define a fallback color class
    const fallbackColor = 'bg-base-200';
    // Use the provided bgColor, or the fallback if bgColor is missing/falsy
    const cardBgClass = bgColor || fallbackColor;

    return (
        <Link to={`/hero/${hero.id}`} className="block group h-full">
            {/* Apply dynamic cardBgClass */}
            <div className={`card shadow-xl h-full transition-all duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-2xl ${cardBgClass}`}> {/* <<< Use cardBgClass */}
                <div className="card-body">
                    <h2 className="card-title truncate text-primary">{hero.title || 'Untitled Hero'}</h2>
                    <p className="text-sm text-base-content text-opacity-70">
                        {generatePreview(hero.description)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default HeroCard;
