import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { createHero } from '../services/heroService';

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError("Title and Description cannot be empty.");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            await createHero({ title, description });
            navigate('/feed');
        } catch (err) {
            console.error("Failed to create hero:", err);
            setError("Failed to create hero. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Create New Hero</h1>

            {error && <div className="alert alert-error shadow-lg mb-4"><span>{error}</span></div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="label">
                        <span className="label-text">Hero Title / Name</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="e.g., Captain Starlight"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="label">
                        <span className="label-text">Description (Markdown Supported)</span>
                    </label>
                    <textarea
                        id="description"
                        className="textarea textarea-bordered w-full h-60"
                        placeholder="Describe the hero's powers, origin, etc."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting ? 'btn-disabled' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Submit Hero'}
                </button>
            </form>
        </Layout>
    );
}

export default CreatePostPage;
