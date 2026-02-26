package com.herowiki.controller;

import com.herowiki.config.CurrentUserService;
import com.herowiki.model.AppUser;
import com.herowiki.model.Hero;
import com.herowiki.repository.FavoriteRepository;
import com.herowiki.repository.Herorepository;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/me")
public class ProfileController {

    private final CurrentUserService currentUserService;
    private final Herorepository herorepository;
    private final FavoriteRepository favoriteRepository;

    public ProfileController(
            CurrentUserService currentUserService,
            Herorepository herorepository,
            FavoriteRepository favoriteRepository
    ) {
        this.currentUserService = currentUserService;
        this.herorepository = herorepository;
        this.favoriteRepository = favoriteRepository;
    }

    @GetMapping
    public Map<String, Object> me(Authentication authentication) {
        // findOrUpdate — does NOT blindly re-save every request
        AppUser user = currentUserService.getOrCreateCurrentUser(authentication);
        return Map.of(
                "id", user.getId(),
                "displayName", user.getDisplayName() != null ? user.getDisplayName() : "",
                "email", user.getEmail() != null ? user.getEmail() : "",
                "avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : ""
        );
    }

    @GetMapping("/posts")
    @Transactional(readOnly = true)
    public List<Hero> myPosts(Authentication authentication) {
        AppUser user = currentUserService.getOrCreateCurrentUser(authentication);
        return herorepository.findByCreatedById(user.getId());
    }

    @GetMapping("/favorites")
    @Transactional(readOnly = true)
    public List<Hero> myFavorites(Authentication authentication) {
        AppUser user = currentUserService.getOrCreateCurrentUser(authentication);
        // Direct JPQL query avoids lazy-loading Favorite→Hero
        return favoriteRepository.findHeroesByUserId(user.getId());
    }
}
