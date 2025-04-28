import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import { getHeroById } from '../services/heroService';

function DisplayPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ... (keep existing useEffect)
        const fetchHero = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const data = await getHeroById(id);
                setHero(data);
            } catch (err) {
                console.error(`Failed to fetch hero with id ${id}:`, err);
                setError("Hero not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, [id]);

    return (
        <Layout>
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {error && (
                <div className="alert alert-error shadow-lg">
                    <span>{error} <Link to="/feed" className="link link-primary ml-2">Go back to feed</Link></span>
                </div>
            )}

            {!loading && !error && hero && (
                 // Use article tag, apply prose styles for markdown
                 // bg-base-200 provides slight contrast within the main container
                <article className="prose dark:prose-invert lg:prose-xl max-w-none bg-base-200 p-6 rounded-lg shadow">
                    {/* Centered and underlined title */}
                    <h1 className="text-center underline decoration-primary decoration-2 underline-offset-4 mb-6">
                        {hero.title}
                    </h1>
                    {/* Render markdown description */}
                    <ReactMarkdown>{hero.description}</ReactMarkdown>

                    <div className="mt-8 text-center"> {/* Center the button */}
                        <button onClick={() => navigate(-1)} className="btn btn-outline">
                            Go Back
                        </button>
                    </div>
                </article>
            )}
        </Layout>
    );
}

export default DisplayPage;
