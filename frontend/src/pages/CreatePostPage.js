// filepath: d:\a 2.o\herowiki\frontend\src\pages\CreatePostPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { createHero } from '../services/heroService';

// --- Define Color Palette (Tailwind class names) ---
const colorPalette = [
    { name: 'Base', class: 'bg-base-200' },
    { name: 'Neutral', class: 'bg-neutral' },
    { name: 'Primary', class: 'bg-primary/30' }, // Using opacity variants
    { name: 'Secondary', class: 'bg-secondary/30' },
    { name: 'Accent', class: 'bg-accent/30' },
    { name: 'Info', class: 'bg-info/30' },
    { name: 'Success', class: 'bg-success/30' },
    { name: 'Warning', class: 'bg-warning/30' },
    { name: 'Error', class: 'bg-error/30' },
];
const defaultColor = colorPalette[0].class; // Default to 'Base'
// --- End Color Palette ---

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cardColor, setCardColor] = useState(defaultColor); // State for selected color
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) { // Keep description optional if desired
            setError("Hero Title / Name cannot be empty.");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            // Include cardColor in the data sent to the backend
            await createHero({ title, description, cardColor });
            navigate('/feed');
        } catch (err) {
            console.error("Failed to create hero:", err);
            setError(err.response?.data?.message || "Failed to create hero. Please try again.");
            setIsSubmitting(false); // Only set back on error
        }
        // No finally block needed if we only reset isSubmitting on error
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6 text-center">Create New Hero</h1>

            {error && <div className="alert alert-error shadow-lg mb-4"><span>{error}</span></div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
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
                        // required // Make description optional if needed
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                {/* --- Color Palette Selection --- */}
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Choose Card Background Color</span>
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 border border-base-300 rounded-lg">
                        {colorPalette.map((color) => (
                            <label key={color.class} className="cursor-pointer tooltip" data-tip={color.name}>
                                <input
                                    type="radio"
                                    name="cardColor"
                                    value={color.class}
                                    checked={cardColor === color.class}
                                    onChange={(e) => setCardColor(e.target.value)}
                                    className="sr-only" // Hide the actual radio button
                                    disabled={isSubmitting}
                                />
                                {/* Visual swatch */}
                                <div
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        cardColor === color.class ? 'border-primary scale-110 ring-2 ring-primary ring-offset-base-100 ring-offset-2' : 'border-base-content/20'
                                    } ${color.class} transition-transform`} // Apply color class, add selection indicator
                                ></div>
                            </label>
                        ))}
                    </div>
                </div>
                {/* --- End Color Palette Selection --- */}


                <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting ? 'btn-disabled' : ''}`} // Use btn-disabled correctly
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Submit Hero'}
                </button>
            </form>
        </Layout>
    );
}

export default CreatePostPage;
