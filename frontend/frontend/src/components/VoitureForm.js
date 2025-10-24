import React, { useState, useEffect } from 'react';
import { createVoiture, updateVoiture, getVoitureById } from '../services/VoitureService';
import { useNavigate, useParams } from 'react-router-dom';

const VoitureForm = () => {
  const [voiture, setVoiture] = useState({
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    annee: '',
    prix: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getVoitureById(id)
        .then(res => {
          console.log("✅ Voiture chargée :", res.data);
          setVoiture(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("❌ Erreur chargement :", err);
          setError("Impossible de charger la voiture");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoiture({ ...voiture, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Convertir annee et prix en nombres
    const voitureData = {
      ...voiture,
      annee: parseInt(voiture.annee),
      prix: parseInt(voiture.prix)
    };

    console.log("📤 Envoi données :", voitureData);

    const action = id 
      ? updateVoiture(id, voitureData)
      : createVoiture(voitureData);

    action
      .then((response) => {
        console.log("✅ Succès :", response.data);
        alert(id ? "Voiture modifiée avec succès !" : "Voiture ajoutée avec succès !");
        navigate('/');
      })
      .catch((err) => {
        console.error("❌ Erreur :", err);
        console.error("Détails :", err.response?.data);
        setError(err.response?.data?.message || err.message || "Erreur lors de l'enregistrement");
        setLoading(false);
      });
  };

  if (loading && id) {
    return <div className="container mt-4">⏳ Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">
        {id ? "✏️ Modifier" : "➕ Ajouter"} une Voiture
      </h2>

      {error && (
        <div className="alert alert-danger">
          ❌ {error}
        </div>
      )}

      <div className="card border-dark">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Marque *</label>
                <input
                  type="text"
                  name="marque"
                  className="form-control"
                  value={voiture.marque}
                  onChange={handleChange}
                  placeholder="Ex: Toyota"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Modèle *</label>
                <input
                  type="text"
                  name="modele"
                  className="form-control"
                  value={voiture.modele}
                  onChange={handleChange}
                  placeholder="Ex: Corolla"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Couleur *</label>
                <input
                  type="text"
                  name="couleur"
                  className="form-control"
                  value={voiture.couleur}
                  onChange={handleChange}
                  placeholder="Ex: Grise"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Immatricule *</label>
                <input
                  type="text"
                  name="immatricule"
                  className="form-control"
                  value={voiture.immatricule}
                  onChange={handleChange}
                  placeholder="Ex: A-12345"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Année *</label>
                <input
                  type="number"
                  name="annee"
                  className="form-control"
                  value={voiture.annee}
                  onChange={handleChange}
                  placeholder="Ex: 2020"
                  min="1900"
                  max="2025"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Prix (DH) *</label>
                <input
                  type="number"
                  name="prix"
                  className="form-control"
                  value={voiture.prix}
                  onChange={handleChange}
                  placeholder="Ex: 150000"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                ❌ Annuler
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? '⏳ Enregistrement...' : '💾 Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoitureForm;


