import axios from 'axios';

const API_URL = 'http://localhost:8080/proprietaires';

export const getProprietaires = () => {
  return axios.get(API_URL);
};

export const getProprietaireById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createProprietaire = (proprietaire) => {
  console.log("📤 Création propriétaire :", proprietaire);
  return axios.post(API_URL, proprietaire);
};

export const updateProprietaire = (id, proprietaire) => {
  console.log("📤 Mise à jour propriétaire :", id, proprietaire);
  return axios.put(`${API_URL}/${id}`, proprietaire);
};

export const deleteProprietaire = (id) => {
  console.log("📤 Suppression propriétaire :", id);
  return axios.delete(`${API_URL}/${id}`);
};