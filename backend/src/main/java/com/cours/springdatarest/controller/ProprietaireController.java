package com.cours.springdatarest.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.web.bind.annotation.*;
import com.cours.springdatarest.repository.ProprietaireRepo;
import com.cours.springdatarest.modele.Proprietaire;
import java.util.Optional;

@RestController
@RequestMapping("/proprietaires")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "👥 Gestion des Propriétaires", description = "API pour gérer les propriétaires de voitures")
public class ProprietaireController {

    private final ProprietaireRepo proprietaireRepo;

    public ProprietaireController(ProprietaireRepo proprietaireRepo) {
        this.proprietaireRepo = proprietaireRepo;
    }

    @GetMapping
    @Operation(summary = "Récupérer tous les propriétaires")
    @ApiResponse(responseCode = "200", description = "Liste des propriétaires récupérée")
    public Iterable<Proprietaire> getAllProprietaires() {
        System.out.println("📋 Récupération de tous les propriétaires");
        return proprietaireRepo.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un propriétaire par ID")
    public Optional<Proprietaire> getProprietaireById(
            @Parameter(description = "ID du propriétaire")
            @PathVariable Long id
    ) {
        System.out.println("🔍 Recherche du propriétaire ID: " + id);
        return proprietaireRepo.findById(id);
    }

    @PostMapping
    @Operation(summary = "Ajouter un nouveau propriétaire")
    @ApiResponse(responseCode = "201", description = "Propriétaire créé avec succès")
    public Proprietaire addProprietaire(
            @Parameter(description = "Objet propriétaire à créer")
            @RequestBody Proprietaire proprietaire
    ) {
        System.out.println("➕ Ajout d'un nouveau propriétaire: " + proprietaire.getNom());
        return proprietaireRepo.save(proprietaire);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifier un propriétaire existant")
    public Proprietaire updateProprietaire(
            @PathVariable Long id,
            @RequestBody Proprietaire proprietaire
    ) {
        System.out.println("✏️ Modification du propriétaire ID: " + id);
        proprietaire.setId(id);
        return proprietaireRepo.save(proprietaire);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un propriétaire")
    @ApiResponse(responseCode = "204", description = "Propriétaire supprimé avec succès")
    public void deleteProprietaire(@PathVariable Long id) {
        System.out.println("🗑️ Suppression du propriétaire ID: " + id);
        proprietaireRepo.deleteById(id);
    }
}