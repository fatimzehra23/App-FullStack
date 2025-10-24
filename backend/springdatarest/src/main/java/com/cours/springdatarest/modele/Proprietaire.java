package com.cours.springdatarest.modele;

import java.util.List;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Proprietaire {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String nom;

    @NonNull
    private String prenom;

    // Relation avec Voiture (un propriétaire peut avoir plusieurs voitures)
    @OneToMany(mappedBy = "proprietaire", cascade = CascadeType.ALL)
    @JsonIgnore // pour éviter les boucles infinies JSON
    private List<Voiture> voitures;
}
