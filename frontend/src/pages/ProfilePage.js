import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginModal from '../components/LoginModal';
import { getMyFavorites, getMyPosts, getMyProfile } from '../services/heroService';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [myFavorites, setMyFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            // Fetch profile first — if 401, show login modal and stop
            let profileData;
            try {
                profileData = await getMyProfile();
                setProfile(profileData);
            } catch (err) {
                setLoading(false);
                if (err.response?.status === 401) {
                    setShowLoginModal(true);
                } else {
                    setError('Failed to load profile. Please try again.');
                }
                return;
            }

            // Fetch posts and favorites independently so one failure doesn't block the other
            const [postsResult, favoritesResult] = await Promise.allSettled([
                getMyPosts(),
                getMyFavorites(),
            ]);

            if (postsResult.status === 'fulfilled') {
                setMyPosts(Array.isArray(postsResult.value) ? postsResult.value : []);
            }
            if (favoritesResult.status === 'fulfilled') {
                setMyFavorites(Array.isArray(favoritesResult.value) ? favoritesResult.value : []);
            }

            setLoading(false);
        };

        load();
    }, []);

    return (
        <Layout>
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                message="You need to be logged in to view your profile."
            />
            <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

            {!loading && !error && profile && (
                <div className="space-y-8">
                    <div className="card bg-base-200 shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-14">
                                    <span>{(profile.displayName || 'U').charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl font-semibold">{profile.displayName}</p>
                                <p className="opacity-70">{profile.email || 'No email available'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">My Posts</h2>
                        {myPosts.length === 0 ? (
                            <p className="opacity-70">You have not created any posts yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {myPosts.map((hero) => (
                                    <Link key={hero.id} to={`/hero/${hero.id}`} className="card bg-base-200 p-4 shadow hover:shadow-lg transition-shadow">
                                        <p className="font-semibold text-lg">{hero.title}</p>
                                        <p className="text-sm opacity-80 line-clamp-3">{hero.description}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">My Favorites</h2>
                        {myFavorites.length === 0 ? (
                            <p className="opacity-70">No favorite heroes yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {myFavorites.map((hero) => (
                                    <Link key={hero.id} to={`/hero/${hero.id}`} className="card bg-base-200 p-4 shadow hover:shadow-lg transition-shadow">
                                        <p className="font-semibold text-lg">{hero.title}</p>
                                        <p className="text-sm opacity-80 line-clamp-3">{hero.description}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ProfilePage;
