package com.herowiki.controller;

import com.herowiki.model.Hero;
import com.herowiki.repository.Herorepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/heroes")
public class HeroController {

    @Autowired
    private Herorepository herorepository;

    @GetMapping
    public List<Hero> getAllHeroes() {
        return herorepository.findAll();
    }

    @GetMapping("/{id}")
    public Hero getHeroById(@PathVariable Long id) {
        return herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));
    }

    @PostMapping
    public Hero createHero(@RequestBody Hero hero) {
        return herorepository.save(hero);
    }

    @PutMapping("/{id}")
    public Hero updateHero(@PathVariable Long id, @RequestBody Hero heroDetails) {
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        hero.setTitle(heroDetails.getTitle());
        hero.setDescription(heroDetails.getDescription());
        return herorepository.save(hero);
    }

    @DeleteMapping("/{id}")
    public void deleteHero(@PathVariable Long id) {
        if (!herorepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found");
        }
        herorepository.deleteById(id);
    }

    
}
