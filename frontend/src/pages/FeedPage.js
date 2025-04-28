import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <<< Import Link
import Layout from '../components/Layout';
import HeroCard from '../components/HeroCard';
import { getAllHeroes } from '../services/heroService';

function FeedPage() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to generate preview (can be moved to HeroCard or utils later)
    const generatePreview = (markdown, length = 60) => {
        if (!markdown) return '';
        const plainText = markdown
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
            .replace(/(\*|_)(.*?)\1/g, '$2')   // Italic
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Code
            .replace(/#+\s/g, '')              // Headers
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
            .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Images (alt text)
            .replace(/(\r\n|\n|\r)/gm, " ")     // Newlines
            .trim();
        return plainText.length > length ? plainText.substring(0, length - 3) + '...' : plainText;
    };


    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllHeroes();
                setHeroes(data);
            } catch (err) {
                console.error("Failed to fetch heroes:", err);
                setError("Failed to load heroes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchHeroes();
    }, []);

    // Get first 5 heroes for the carousel
    const featuredHeroes = heroes.slice(0, 5);

    return (
        <Layout>
            {/* Optional: Title for the carousel section */}
            {/* <h2 className="text-2xl font-semibold mb-4 text-center">Featured Heroes</h2> */}

            {/* --- Carousel Section --- */}
            {!loading && !error && featuredHeroes.length > 0 && (
                <div className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box mb-8">
                    {featuredHeroes.map((hero, index) => (
                        <div key={hero.id || index} className="carousel-item w-64 md:w-80"> {/* Adjust width as needed */}
                            <Link to={`/hero/${hero.id}`} className="block w-full">
                                <div className="card card-compact bg-base-100 shadow-md h-full transition-transform duration-200 hover:scale-105">
                                    {/* You might add an image here later */}
                                    {/* <figure><img src="/path/to/placeholder.jpg" alt={hero.title} className="h-32 object-cover w-full" /></figure> */}
                                    <div className="card-body">
                                        <h3 className="card-title text-lg truncate text-primary">{hero.title}</h3>
                                        <p className="text-xs text-base-content text-opacity-70">{generatePreview(hero.description)}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            {/* --- End Carousel Section --- */}


            {/* Title styling for the main feed */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
                {heroes.length > 0 ? 'All Heroes' : 'Hero Feed'} {/* Adjust title based on content */}
            </h1>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
            {error && <div className="alert alert-error shadow-lg"><span>{error}</span></div>}

            {!loading && !error && (
                heroes.length > 0 ? (
                     // Grid styling
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {heroes.map((hero) => (
                            // Pass hero data to HeroCard (already handles linking)
                            <HeroCard key={hero.id} hero={hero} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-xl text-base-content text-opacity-70">No heroes found yet. Be the first to create one!</p>
                    </div>
                )
            )}
        </Layout>
    );
}

export default FeedPage;
