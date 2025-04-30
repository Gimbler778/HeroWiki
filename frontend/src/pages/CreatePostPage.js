import React, { useState } from 'react'; // Added useState import
import { useNavigate } from 'react-router-dom'; // Added useNavigate import
import Layout from '../components/Layout';
import { createHero } from '../services/heroService';

// --- Updated Color Palette ---
const colorPalette = [
    { name: 'Blue', class: 'bg-blue-500', textColor: 'text-white' },
    { name: 'Green', class: 'bg-green-500', textColor: 'text-white' },
    { name: 'Yellow', class: 'bg-yellow-500', textColor: 'text-black' },
    { name: 'Red', class: 'bg-red-500', textColor: 'text-white' },
    { name: 'Purple', class: 'bg-purple-500', textColor: 'text-white' },
    { name: 'Cyan', class: 'bg-cyan-500', textColor: 'text-black' },
    { name: 'Orange', class: 'bg-orange-500', textColor: 'text-black' },
    { name: 'Pink', class: 'bg-pink-500', textColor: 'text-black' },
    { name: 'Lime', class: 'bg-lime-500', textColor: 'text-black' },
    { name: 'Teal', class: 'bg-teal-500', textColor: 'text-white' },
];
const defaultColor = colorPalette[0]; // Default to 'Blue'

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cardColor, setCardColor] = useState(defaultColor); // State for selected color
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Hero Title / Name cannot be empty.");
            return;
        }
        if (!description.trim()) {
            setError("Description cannot be empty.");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            // Pass both bgColor and textColor to the backend
            await createHero({
                title,
                description,
                cardColor: cardColor.class,
                textColor: cardColor.textColor,
            });
            navigate('/feed');
        } catch (err) {
            console.error("Failed to create hero:", err);
            setError(err.response?.data?.message || "Failed to create hero. Please try again.");
            setIsSubmitting(false);
        }
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
                                    checked={cardColor.class === color.class}
                                    onChange={() => setCardColor(color)}
                                    className="sr-only"
                                    disabled={isSubmitting}
                                />
                                <div
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        cardColor.class === color.class
                                            ? 'border-primary scale-110 ring-2 ring-primary ring-offset-base-100 ring-offset-2'
                                            : 'border-base-content/20'
                                    } ${color.class} transition-transform`}
                                ></div>
                            </label>
                        ))}
                    </div>
                </div>
                {/* --- End Color Palette Selection --- */}

                <button
                    type="submit"
                    className={`btn btn-outline btn-secondary ${isSubmitting ? 'btn-disabled' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Submit'}
                </button>
            </form>
        </Layout>
    );
}

export default CreatePostPage;
