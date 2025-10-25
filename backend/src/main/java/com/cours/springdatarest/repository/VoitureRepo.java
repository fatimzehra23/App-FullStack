package com.cours.springdatarest.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import com.cours.springdatarest.modele.Voiture;

// @RepositoryRestResource rend automatiquement ce repository accessible en REST
// Exemple : GET http://localhost:8080/api/voitures (si base-path défini)
@RepositoryRestResource(collectionResourceRel = "voitures", path = "voitures")
@Repository
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // ✅ Méthodes dérivées de Spring Data (pas besoin d’implémentation)
    List<Voiture> findByMarque(String marque);

    List<Voiture> findByCouleur(String couleur);

    List<Voiture> findByAnnee(int annee);

    List<Voiture> findByMarqueAndModele(String marque, String modele);

    List<Voiture> findByMarqueOrCouleur(String marque, String couleur);

    List<Voiture> findByMarqueOrderByAnneeAsc(String marque);

    // ✅ Exemple de requêtes personnalisées avec @Query
    @Query("SELECT v FROM Voiture v WHERE v.marque LIKE %:marque%")
    List<Voiture> searchByMarque(@Param("marque") String marque);

    @Query("SELECT v FROM Voiture v WHERE v.prix BETWEEN :min AND :max")
    List<Voiture> findByPrixRange(@Param("min") int min, @Param("max") int max);
}
