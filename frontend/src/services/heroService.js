import axios from 'axios';

const API_URL = 'http://localhost:8080/api/heroes'; // Backend API URL

export const getAllHeroes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getHeroById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
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
