import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_URL = `${BACKEND_URL}/api/heroes`;
const PROFILE_URL = `${BACKEND_URL}/api/me`;

axios.defaults.withCredentials = true;

export const getAllHeroes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getHeroById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const getHeroesMeta = async (ids) => {
    if (!ids || ids.length === 0) {
        return {};
    }
    const response = await axios.get(`${API_URL}/meta`, {
        params: { ids },
        paramsSerializer: {
            indexes: null,
        },
    });
    return response.data;
};

export const createHero = async (heroData) => {
    const response = await axios.post(API_URL, heroData);
    return response.data;
};

export const updateHero = async (id, heroData) => { // Update hero by ID
    const response = await axios.put(`${API_URL}/${id}`, heroData);
    return response.data;
};

export const deleteHero = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const voteHero = async (id, value) => {
    const response = await axios.post(`${API_URL}/${id}/vote`, null, { params: { value } });
    return response.data;
};

export const removeVote = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}/vote`);
    return response.data;
};

export const addFavorite = async (id) => {
    const response = await axios.post(`${API_URL}/${id}/favorite`);
    return response.data;
};

export const removeFavorite = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}/favorite`);
    return response.data;
};

export const getMyProfile = async () => {
    const response = await axios.get(PROFILE_URL);
    return response.data;
};

export const getAuthStatus = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/auth/status`);
    return response.data; // { authenticated: bool, user?: {...} }
};

export const getMyPosts = async () => {
    const response = await axios.get(`${PROFILE_URL}/posts`);
    return response.data;
};

export const getMyFavorites = async () => {
    const response = await axios.get(`${PROFILE_URL}/favorites`);
    return response.data;
};

export const getGoogleOAuthLoginUrl = () => `${BACKEND_URL}/oauth2/authorization/google`;
export const getGithubOAuthLoginUrl = () => `${BACKEND_URL}/oauth2/authorization/github`;
export const logout = async () => {
    await axios.post(`${BACKEND_URL}/api/logout`);
};
