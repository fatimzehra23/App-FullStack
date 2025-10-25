import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCar, faRefresh } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

export default function VoitureList() {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    loadVoitures();
  }, []);

  const loadVoitures = () => {
    console.log("📡 Chargement des voitures...");
    setLoading(true);
    axios
      .get("http://localhost:8080/voitures")
      .then((response) => {
        console.log("✅ Voitures chargées :", response.data);
        setVoitures(response.data);
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

  const deleteVoiture = (id, marque, modele) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la voiture ${marque} ${modele} ?`)) {
      console.log("🗑️ Suppression de la voiture ID:", id);
      
      axios
        .delete(`http://localhost:8080/voitures/${id}`)
        .then(() => {
          console.log("✅ Voiture supprimée avec succès");
          // Mettre à jour la liste sans recharger
          setVoitures(voitures.filter(v => v.id !== id));
          // Afficher un toast de succès
          setToast({
            show: true,
            message: `Voiture ${marque} ${modele} supprimée avec succès !`,
            type: 'success'
          });
        })
        .catch((error) => {
          console.error("❌ Erreur lors de la suppression :", error);
          setToast({
            show: true,
            message: "Erreur lors de la suppression de la voiture",
            type: 'danger'
          });
        });
    }
  };

  const editVoiture = (id) => {
    console.log("✏️ Redirection vers édition de la voiture ID:", id);
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <FontAwesomeIcon icon={faCar} spin className="me-2" />
          Chargement des voitures...
        </div>
      </div>
    );
  }

  if (error && voitures.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          ❌ Erreur : {error}
          <button 
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={loadVoitures}
          >
            <FontAwesomeIcon icon={faRefresh} /> Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Toast de notification */}
      <MyToast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* En-tête avec titre et bouton d'ajout */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FontAwesomeIcon icon={faCar} className="me-2" />
          Liste des voitures ({voitures.length})
        </h2>
        <div className="btn-group">
          <button 
            className="btn btn-success"
            onClick={() => navigate('/add')}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Ajouter une voiture
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={loadVoitures}
            title="Actualiser la liste"
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        </div>
      </div>

      {/* Message si aucune voiture */}
      {voitures.length === 0 ? (
        <div className="alert alert-warning">
          <FontAwesomeIcon icon={faCar} className="me-2" />
          ⚠️ Aucune voiture trouvée. 
          <button 
            className="btn btn-sm btn-primary ms-2"
            onClick={() => navigate('/add')}
          >
            <FontAwesomeIcon icon={faPlus} className="me-1" />
            Ajouter la première voiture
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Immatricule</th>
                <th>Année</th>
                <th className="text-end">Prix (DH)</th>
                <th>Propriétaire</th>
                <th className="text-center" style={{width: '180px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {voitures.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>
                    <FontAwesomeIcon icon={faCar} className="me-2 text-muted" />
                    <strong>{v.marque}</strong>
                  </td>
                  <td>{v.modele}</td>
                  <td>
                    <span 
                      className="badge px-3 py-2" 
                      style={{
                        backgroundColor: v.couleur.toLowerCase(),
                        color: ['blanc', 'white', 'jaune', 'yellow'].includes(v.couleur.toLowerCase()) 
                          ? '#000' 
                          : '#fff'
                      }}
                    >
                      {v.couleur}
                    </span>
                  </td>
                  <td>
                    <code className="text-dark">{v.immatricule}</code>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-secondary">{v.annee}</span>
                  </td>
                  <td className="text-end">
                    <strong className="text-success">
                      {v.prix?.toLocaleString('fr-MA')} DH
                    </strong>
                  </td>
                  <td>
                    {v.proprietaire ? (
                      <span className="badge bg-info text-dark">
                        {v.proprietaire.prenom} {v.proprietaire.nom}
                      </span>
                    ) : (
                      <span className="text-muted fst-italic">Non assigné</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => editVoiture(v.id)}
                        title="Modifier cette voiture"
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-1" />
                        Éditer
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteVoiture(v.id, v.marque, v.modele)}
                        title="Supprimer cette voiture"
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

      {/* Footer avec statistiques */}
      {voitures.length > 0 && (
        <div className="mt-3 p-3 bg-light rounded border">
          <div className="row text-center">
            <div className="col-md-4">
              <h5 className="text-primary">{voitures.length}</h5>
              <small className="text-muted">Voitures totales</small>
            </div>
            <div className="col-md-4">
              <h5 className="text-success">
                {voitures.reduce((sum, v) => sum + (v.prix || 0), 0).toLocaleString('fr-MA')} DH
              </h5>
              <small className="text-muted">Valeur totale</small>
            </div>
            <div className="col-md-4">
              <h5 className="text-info">
                {voitures.filter(v => v.proprietaire).length}
              </h5>
              <small className="text-muted">Voitures assignées</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}