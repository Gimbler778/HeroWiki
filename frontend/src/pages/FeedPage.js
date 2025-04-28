import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeroCard from '../components/HeroCard';
import { getAllHeroes } from '../services/heroService';

// --- Sample Quotes Data ---
const quotes = [
    { id: 1, text: "With great power comes great responsibility.", author: "Spider-Man", color: "text-info", font: "font-serif", bgColor: "bg-info/20" },
    { id: 2, text: "I am vengeance. I am the night. I am Batman!", author: "Batman", color: "text-warning", font: "font-sans font-bold", bgColor: "bg-warning/20" },
    { id: 3, text: "Truth, justice, and the American way.", author: "Superman", color: "text-error", font: "font-mono", bgColor: "bg-error/20" },
    { id: 4, text: "Hulk smash!", author: "Hulk", color: "text-success", font: "font-sans uppercase font-black", bgColor: "bg-success/20" },
    { id: 5, text: "I can do this all day.", author: "Captain America", color: "text-primary", font: "font-serif italic", bgColor: "bg-primary/20" },
    // --- ADDED QUOTES ---
    { id: 6, text: "It's clobberin' time!", author: "The Thing", color: "text-orange-400", font: "font-sans font-extrabold", bgColor: "bg-orange-900/30" },
    { id: 7, text: "I am Iron Man.", author: "Iron Man", color: "text-red-500", font: "font-mono font-semibold", bgColor: "bg-red-900/20" },
    { id: 8, text: "In brightest day, in blackest night, no evil shall escape my sight.", author: "Green Lantern", color: "text-lime-400", font: "font-serif", bgColor: "bg-lime-900/30" },
    { id: 9, text: "You wouldn't like me when I'm angry.", author: "Hulk", color: "text-green-500", font: "font-sans italic", bgColor: "bg-green-900/20" },
    // --- END ADDED QUOTES ---
];
// --- End Sample Quotes Data ---

// --- REMOVE Card Background Colors Array ---

function FeedPage() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <Layout>
            {/* --- Quotes Section --- */}
            {!loading && !error && quotes.length > 0 && (
                 // Add backdrop-blur-sm and rounded-lg to this container
                <div className="flex overflow-x-auto space-x-4 p-4 mb-8 scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-300 backdrop-blur-sm rounded-lg"> {/* <<< Added backdrop-blur-sm rounded-lg */}
                    {quotes.map((quote) => (
                        <div
                            key={quote.id}
                             // Optional: Added bg-opacity-80 to individual cards for layering
                            className={`card flex-shrink-0 w-72 md:w-80 p-4 rounded-lg shadow ${quote.bgColor} bg-opacity-80`} // <<< Added bg-opacity-80
                        >
                            <blockquote className={`text-lg ${quote.font} ${quote.color}`}>
                                "{quote.text}"
                            </blockquote>
                            <cite className={`block text-right mt-2 text-sm opacity-80 ${quote.color}`}>
                                - {quote.author}
                            </cite>
                        </div>
                    ))}
                </div>
            )}
            {/* --- End Quotes Section --- */}


            {/* Title styling for the main feed */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
                {heroes.length > 0 ? 'All Heroes' : 'Hero Feed'}
            </h1>

            {/* --- Loading/Error Handling --- */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
            {error && <div className="alert alert-error shadow-lg"><span>{error}</span></div>}

            {/* --- Hero Grid Section --- */}
            {!loading && !error && (
                heroes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {heroes.map((hero) => ( // REMOVED index parameter
                            // Pass hero.cardColor directly as the bgColor prop
                            <HeroCard
                                key={hero.id}
                                hero={hero}
                                bgColor={hero.cardColor} // <<< Use color from hero data
                            />
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
