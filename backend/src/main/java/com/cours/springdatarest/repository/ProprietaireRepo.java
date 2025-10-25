package com.cours.springdatarest.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import com.cours.springdatarest.modele.Proprietaire;

@RepositoryRestResource(collectionResourceRel = "proprietaires", path = "proprietaires")
@Repository
public interface ProprietaireRepo extends CrudRepository<Proprietaire, Long> {

    // 🔍 Méthodes dérivées
    List<Proprietaire> findByNom(String nom);

    List<Proprietaire> findByPrenom(String prenom);

    List<Proprietaire> findByNomAndPrenom(String nom, String prenom);

    // 🔍 Recherche partielle (nom contenant une sous-chaîne)
    @Query("SELECT p FROM Proprietaire p WHERE LOWER(p.nom) LIKE LOWER(CONCAT('%', :nomPartiel, '%'))")
    List<Proprietaire> searchByNomLike(@Param("nomPartiel") String nomPartiel);

    // 🔍 Exemple : récupérer les propriétaires ayant un certain nombre de voitures (optionnel)
    @Query("SELECT p FROM Proprietaire p WHERE SIZE(p.voitures) >= :minVoitures")
    List<Proprietaire> findByMinVoitures(@Param("minVoitures") int minVoitures);
}
