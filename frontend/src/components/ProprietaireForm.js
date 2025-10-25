import React, { useState, useEffect } from 'react';
import { createProprietaire, updateProprietaire, getProprietaireById } from '../services/ProprietaireService';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const ProprietaireForm = () => {
  const [proprietaire, setProprietaire] = useState({
    nom: '',
    prenom: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProprietaireById(id)
        .then(res => {
          console.log("✅ Propriétaire chargé :", res.data);
          setProprietaire(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("❌ Erreur chargement :", err);
          setError("Impossible de charger le propriétaire");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProprietaire({ ...proprietaire, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("📤 Envoi données :", proprietaire);

    const action = id 
      ? updateProprietaire(id, proprietaire)
      : createProprietaire(proprietaire);

    action
      .then((response) => {
        console.log("✅ Succès :", response.data);
        alert(id ? "Propriétaire modifié avec succès !" : "Propriétaire ajouté avec succès !");
        navigate('/proprietaires');
      })
      .catch((err) => {
        console.error("❌ Erreur :", err);
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
        {id ? "✏️ Modifier" : "➕ Ajouter"} un Propriétaire
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
                <label className="form-label">Prénom *</label>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  value={proprietaire.prenom}
                  onChange={handleChange}
                  placeholder="Ex: Mohamed"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Nom *</label>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  value={proprietaire.nom}
                  onChange={handleChange}
                  placeholder="Ex: Alami"
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/proprietaires')}
              >
                <FontAwesomeIcon icon={faTimes} className="me-1" />
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faSave} className="me-1" />
                {loading ? '⏳ Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProprietaireForm;