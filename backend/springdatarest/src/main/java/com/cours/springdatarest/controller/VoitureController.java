package com.cours.springdatarest.controller;

import org.springframework.web.bind.annotation.*;
import com.cours.springdatarest.repository.VoitureRepo;
import com.cours.springdatarest.modele.Voiture;
import java.util.Optional;

@RestController
@RequestMapping("/voitures")
@CrossOrigin(origins = "*", allowedHeaders = "*")  // ← MODIFIEZ CETTE LIGNE
public class VoitureController {

    private final VoitureRepo voitureRepo;

    public VoitureController(VoitureRepo voitureRepo) {
        this.voitureRepo = voitureRepo;
    }

    @GetMapping
    public Iterable<Voiture> getAllVoitures() {
        return voitureRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Voiture> getVoitureById(@PathVariable Long id) {
        return voitureRepo.findById(id);
    }

    @PostMapping
    public Voiture addVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    @PutMapping("/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        voiture.setId(id);
        return voitureRepo.save(voiture);
    }

    @DeleteMapping("/{id}")
    public void deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }
}