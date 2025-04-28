import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeroCard from '../components/HeroCard';
import { getAllHeroes } from '../services/heroService';

// --- Updated Quotes Data ---
const quotes = [
    { id: 1, text: "With great power comes great responsibility.", author: "Spider-Man", color: "text-info", font: "font-serif", bgColor: "bg-blue-900/30" },
    { id: 2, text: "I am vengeance. I am the night. I am Batman!", author: "Batman", color: "text-warning", font: "font-sans font-bold", bgColor: "bg-gray-800/30" },
    { id: 3, text: "Truth, justice, and the American way.", author: "Superman", color: "text-error", font: "font-mono", bgColor: "bg-red-900/30" },
    { id: 4, text: "Hulk smash!", author: "Hulk", color: "text-success", font: "font-sans uppercase font-black", bgColor: "bg-green-900/30" },
    { id: 5, text: "I can do this all day.", author: "Captain America", color: "text-primary", font: "font-serif italic", bgColor: "bg-blue-800/30" },
    { id: 6, text: "The cake is a lie.", author: "Portal", color: "text-orange-400", font: "font-sans font-extrabold", bgColor: "bg-orange-900/30" },
    { id: 7, text: "War. War never changes.", author: "Fallout", color: "text-red-500", font: "font-mono font-semibold", bgColor: "bg-red-800/30" },
    { id: 8, text: "Do a barrel roll!", author: "Star Fox", color: "text-lime-400", font: "font-serif", bgColor: "bg-lime-900/30" },
    { id: 9, text: "You wouldn't like me when I'm angry.", author: "Hulk", color: "text-green-500", font: "font-sans italic", bgColor: "bg-green-800/30" },
    { id: 10, text: "Wakanda Forever!", author: "Black Panther", color: "text-purple-500", font: "font-sans font-bold", bgColor: "bg-purple-900/30" },
    { id: 11, text: "I am Groot.", author: "Groot", color: "text-green-400", font: "font-mono", bgColor: "bg-green-700/30" },
    { id: 12, text: "Avengers Assemble!", author: "Captain America", color: "text-blue-500", font: "font-serif font-extrabold", bgColor: "bg-blue-700/30" },
    { id: 13, text: "The right man in the wrong place can make all the difference in the world.", author: "Half-Life 2", color: "text-yellow-400", font: "font-serif italic", bgColor: "bg-yellow-900/30" },
    { id: 14, text: "Fus Ro Dah!", author: "Skyrim", color: "text-blue-400", font: "font-sans font-bold", bgColor: "bg-blue-900/30" },
    { id: 15, text: "A man chooses, a slave obeys.", author: "Bioshock", color: "text-cyan-400", font: "font-mono", bgColor: "bg-cyan-900/30" },
    { id: 16, text: "The Force will be with you. Always.", author: "Star Wars", color: "text-indigo-400", font: "font-serif italic", bgColor: "bg-indigo-900/30" },
    { id: 17, text: "Nothing is true, everything is permitted.", author: "Assassin's Creed", color: "text-gray-400", font: "font-sans font-bold", bgColor: "bg-gray-900/30" },
    { id: 18, text: "Stay awhile and listen.", author: "Diablo", color: "text-yellow-500", font: "font-serif", bgColor: "bg-yellow-800/30" },
    { id: 19, text: "Praise the Sun!", author: "Dark Souls", color: "text-orange-500", font: "font-sans uppercase font-black", bgColor: "bg-orange-800/30" },
    { id: 20, text: "It's dangerous to go alone! Take this.", author: "The Legend of Zelda", color: "text-green-500", font: "font-mono", bgColor: "bg-green-900/30" },
];
// --- End Updated Quotes Data ---

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
                <div className="flex overflow-x-auto space-x-4 p-4 mb-8 scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-300 backdrop-blur-sm rounded-lg">
                    {quotes.map((quote) => (
                        <div
                            key={quote.id}
                            className={`card flex-shrink-0 w-72 md:w-80 p-4 rounded-lg shadow ${quote.bgColor} bg-opacity-80`}
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
                        {heroes.map((hero) => (
                            <HeroCard
                                key={hero.id}
                                hero={hero}
                                bgColor={hero.cardColor}
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
