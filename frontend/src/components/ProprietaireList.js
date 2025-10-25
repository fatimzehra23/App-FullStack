import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUser, faRefresh } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

export default function ProprietaireList() {
  const [proprietaires, setProprietaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    loadProprietaires();
  }, []);

  const loadProprietaires = () => {
    console.log("📡 Chargement des propriétaires...");
    setLoading(true);
    axios
      .get("http://localhost:8080/proprietaires")
      .then((response) => {
        console.log("✅ Propriétaires chargés :", response.data);
        setProprietaires(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Erreur :", error);
        setError(error.message);
        setToast({
          show: true,
          message: `Erreur de chargement : ${error.message}`,
          type: 'danger'
        });
        setLoading(false);
      });
  };

  const deleteProprietaire = (id, nom, prenom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${prenom} ${nom} ?`)) {
      console.log("🗑️ Suppression du propriétaire ID:", id);
      
      axios
        .delete(`http://localhost:8080/proprietaires/${id}`)
        .then(() => {
          console.log("✅ Propriétaire supprimé avec succès");
          setProprietaires(proprietaires.filter(p => p.id !== id));
          setToast({
            show: true,
            message: `Propriétaire ${prenom} ${nom} supprimé avec succès !`,
            type: 'success'
          });
        })
        .catch((error) => {
          console.error("❌ Erreur lors de la suppression :", error);
          setToast({
            show: true,
            message: "Erreur lors de la suppression du propriétaire",
            type: 'danger'
          });
        });
    }
  };

  const editProprietaire = (id) => {
    console.log("✏️ Redirection vers édition du propriétaire ID:", id);
    navigate(`/proprietaire/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <FontAwesomeIcon icon={faUser} spin className="me-2" />
          Chargement des propriétaires...
        </div>
      </div>
    );
  }

  if (error && proprietaires.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          ❌ Erreur : {error}
          <button 
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={loadProprietaires}
          >
            <FontAwesomeIcon icon={faRefresh} /> Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <MyToast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Liste des Propriétaires ({proprietaires.length})
        </h2>
        <div className="btn-group">
          <button 
            className="btn btn-success"
            onClick={() => navigate('/proprietaire/add')}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Ajouter un propriétaire
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={loadProprietaires}
            title="Actualiser la liste"
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        </div>
      </div>

      {proprietaires.length === 0 ? (
        <div className="alert alert-warning">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          ⚠️ Aucun propriétaire trouvé. 
          <button 
            className="btn btn-sm btn-primary ms-2"
            onClick={() => navigate('/proprietaire/add')}
          >
            <FontAwesomeIcon icon={faPlus} className="me-1" />
            Ajouter le premier propriétaire
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Nombre de voitures</th>
                <th className="text-center" style={{width: '180px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proprietaires.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <FontAwesomeIcon icon={faUser} className="me-2 text-muted" />
                    <strong>{p.prenom}</strong>
                  </td>
                  <td>{p.nom}</td>
                  <td className="text-center">
                    {p.voitures && p.voitures.length > 0 ? (
                      <span className="badge bg-info">
                        {p.voitures.length} voiture(s)
                      </span>
                    ) : (
                      <span className="badge bg-secondary">0 voiture</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => editProprietaire(p.id)}
                        title="Modifier ce propriétaire"
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-1" />
                        Éditer
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteProprietaire(p.id, p.nom, p.prenom)}
                        title="Supprimer ce propriétaire"
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-1" />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}