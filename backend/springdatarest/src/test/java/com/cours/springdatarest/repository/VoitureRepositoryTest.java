package com.cours.springdatarest.repository;


import com.cours.springdatarest.modele.Voiture;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class VoitureRepositoryTest {

    @Autowired
    private VoitureRepo voitureRepo;

    @Test
    void testCreateAndFindVoiture() {
        // Création d’une voiture
        Voiture v = new Voiture();
        v.setMarque("Peugeot");
        v.setModele("208");
        v.setCouleur("Rouge");
        v.setImmatricule("TEST-208");
        v.setAnnee(2022);
        v.setPrix(140000);

        voitureRepo.save(v);

        // Vérifie qu’elle a bien été enregistrée
        List<Voiture> voitures = (List<Voiture>) voitureRepo.findAll();
        assertThat(voitures).isNotEmpty();
    }
}

