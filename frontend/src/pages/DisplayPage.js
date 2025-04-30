import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import { getHeroById, updateHero } from '../services/heroService'; // Import updateHero

function DisplayPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for editing
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        const fetchHero = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const data = await getHeroById(id);
                setHero(data);
                setUpdatedTitle(data.title); // Pre-fill the title
                setUpdatedDescription(data.description); // Pre-fill the description
            } catch (err) {
                console.error(`Failed to fetch hero with id ${id}:`, err);
                setError("Hero not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedHero = {
                title: updatedTitle,
                description: updatedDescription,
            };
            await updateHero(id, updatedHero); // Call the updateHero API
            setHero({ ...hero, ...updatedHero }); // Update the local state
            setIsEditing(false); // Close the edit form
        } catch (err) {
            console.error("Failed to update hero:", err);
            setError("Failed to update hero. Please try again.");
        }
    };

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
                <div className="prose dark:prose-invert lg:prose-xl max-w-none bg-base-200 p-6 rounded-lg shadow">
                    {!isEditing ? (
                        <>
                            {/* Display Hero Details */}
                            <h1 className="text-center underline decoration-primary decoration-2 underline-offset-4 mb-6">
                                {hero.title}
                            </h1>
                            <ReactMarkdown>{hero.description}</ReactMarkdown>

                            {/* Update Button */}
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setIsEditing(true)} // Open the edit form
                                    className="btn btn-outline btn-warning"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="btn btn-outline ml-4"
                                >
                                    Go Back
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Edit Form */}
                            <h1 className="text-center text-2xl font-bold mb-6">Update Hero</h1>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="label">
                                        <span className="label-text">Hero Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="input input-bordered w-full"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="label">
                                        <span className="label-text">Hero Description</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        className="textarea textarea-bordered w-full h-40"
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline btn-success">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)} // Cancel editing
                                        className="btn btn-outline btn-error ml-4"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default DisplayPage;
