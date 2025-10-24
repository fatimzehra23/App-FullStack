package com.cours.springdatarest;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cours.springdatarest.modele.Proprietaire;
import com.cours.springdatarest.modele.Voiture;
import com.cours.springdatarest.repository.ProprietaireRepo;
import com.cours.springdatarest.repository.VoitureRepo;

@SpringBootApplication
public class SpringDataRestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringDataRestApplication.class, args);
    }

    // Bean exécuté au démarrage de l’application
    @Bean
    CommandLineRunner initDatabase(VoitureRepo voitureRepo, ProprietaireRepo proprietaireRepo) {
        return args -> {
            // Création de quelques propriétaires
            Proprietaire p1 = new Proprietaire("Ali", "Hassan");
            Proprietaire p2 = new Proprietaire("Najat", "Bani");

            proprietaireRepo.save(p1);
            proprietaireRepo.save(p2);

            // Création de quelques voitures et association à un propriétaire
            Voiture v1 = new Voiture("Toyota", "Corolla", "Grise", "A-12345", 2018, 95000);
            v1.setProprietaire(p1);

            Voiture v2 = new Voiture("Ford", "Fiesta", "Rouge", "B-67890", 2015, 87000);
            v2.setProprietaire(p1);

            Voiture v3 = new Voiture("Honda", "Civic", "Bleue", "C-54321", 2020, 120000);
            v3.setProprietaire(p2);

            // Sauvegarde des voitures
            voitureRepo.save(v1);
            voitureRepo.save(v2);
            voitureRepo.save(v3);

            System.out.println("✅ Données de test insérées dans la base H2 !");
        };
    }
}
