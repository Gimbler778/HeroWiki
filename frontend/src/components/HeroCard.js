import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    addFavorite,
    removeFavorite,
    removeVote,
    voteHero,
} from '../services/heroService';
import LoginModal from './LoginModal';

function HeroCard({ hero, bgColor, textColor, initialMeta }) {
    const [upvotes, setUpvotes] = useState(initialMeta?.upvotes ?? 0);
    const [downvotes, setDownvotes] = useState(initialMeta?.downvotes ?? 0);
    const [myVote, setMyVote] = useState(initialMeta?.myVote ?? 0);
    const [favorited, setFavorited] = useState(initialMeta?.favorited ?? false);
    const [isBusy, setIsBusy] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        setUpvotes(initialMeta?.upvotes ?? 0);
        setDownvotes(initialMeta?.downvotes ?? 0);
        setMyVote(initialMeta?.myVote ?? 0);
        setFavorited(initialMeta?.favorited ?? false);
    }, [initialMeta]);

    const generatePreview = (markdown) => {
        if (!markdown) return '';
        const plainText = markdown
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
            .replace(/#+\s/g, '')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/(\r\n|\n|\r)/gm, " ");
        return plainText.length > 100 ? plainText.substring(0, 97) + '...' : plainText;
    };

    const fallbackColor = 'bg-secondary/30';
    const fallbackTextColor = 'text-white';

    const promptLogin = () => setShowLoginModal(true);

    const applyVoteSummary = (summary, nextVoteValue) => {
        setUpvotes(summary.upvotes ?? 0);
        setDownvotes(summary.downvotes ?? 0);
        setMyVote(nextVoteValue);
    };

    const handleVote = async (e, value) => {
        e.preventDefault();
        if (isBusy) {
            return;
        }

        setIsBusy(true);
        try {
            if (myVote === value) {
                const summary = await removeVote(hero.id);
                applyVoteSummary(summary, 0);
            } else {
                const summary = await voteHero(hero.id, value);
                applyVoteSummary(summary, value);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                promptLogin();
            }
        } finally {
            setIsBusy(false);
        }
    };

    const handleFavorite = async (e) => {
        e.preventDefault();
        if (isBusy) {
            return;
        }

        setIsBusy(true);
        try {
            if (favorited) {
                await removeFavorite(hero.id);
                setFavorited(false);
            } else {
                await addFavorite(hero.id);
                setFavorited(true);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                promptLogin();
            }
        } finally {
            setIsBusy(false);
        }
    };

    return (
        <>
        <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            message="You need to be logged in to vote or favorite heroes."
        />
        <Link to={`/hero/${hero.id}`} className="block group h-full"> 
            <div className={`card shadow-xl h-full transition-all duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-2xl ${bgColor || fallbackColor}`}>
                <div className={`card-body ${textColor || fallbackTextColor}`}>
                    <h2 className="card-title truncate">{hero.title || 'Untitled Hero'}</h2>
                    {hero.createdByName && (
                        <p className="text-xs opacity-60 -mt-1">by {hero.createdByName}</p>
                    )}
                    <p className="text-sm">
                        {generatePreview(hero.description)}
                    </p>
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={handleFavorite}
                            className={`btn btn-soft btn-sm ${favorited ? 'btn-warning' : 'btn-ghost'}`}
                            disabled={isBusy}
                        >
                            {favorited ? '★ Favorited' : '☆ Favorite'}
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={(e) => handleVote(e, 1)}
                            className={`btn btn-soft flex items-center gap-2 ${myVote === 1 ? 'btn-success' : 'btn-ghost'}`}
                            disabled={isBusy}
                        >
                            <i className="fas fa-arrow-up"></i>
                            {upvotes}
                        </button>

                        <button
                            onClick={(e) => handleVote(e, -1)}
                            className={`btn btn-soft flex items-center gap-2 ${myVote === -1 ? 'btn-error' : 'btn-ghost'}`}
                            disabled={isBusy}
                        >
                            <i className="fas fa-arrow-down"></i>
                            {downvotes}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
        </>
    );
}

export default HeroCard;
