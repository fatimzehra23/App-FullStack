// src/services/VoitureService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/voitures';

export const getVoitures = () => {
  return axios.get(API_URL);
};

export const getVoitureById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createVoiture = (voiture) => {
  console.log("📤 Création voiture :", voiture);
  return axios.post(API_URL, voiture);
};

export const updateVoiture = (id, voiture) => {
  console.log("📤 Mise à jour voiture :", id, voiture);
  return axios.put(`${API_URL}/${id}`, voiture);
};

export const deleteVoiture = (id) => {
  console.log("📤 Suppression voiture :", id);
  return axios.delete(`${API_URL}/${id}`);
};
