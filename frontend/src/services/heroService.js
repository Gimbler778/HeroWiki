import axios from 'axios';

const API_URL = 'http://localhost:8080/api/heroes'; // Backend API URL
const PROFILE_URL = 'http://localhost:8080/api/me';

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
    const response = await axios.get('http://localhost:8080/api/auth/status');
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

export const getGoogleOAuthLoginUrl = () => 'http://localhost:8080/oauth2/authorization/google';
export const getGithubOAuthLoginUrl = () => 'http://localhost:8080/oauth2/authorization/github';
export const logout = async () => {
    await axios.post('http://localhost:8080/api/logout');
};
