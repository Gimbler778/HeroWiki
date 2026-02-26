package com.herowiki.controller;

import com.herowiki.config.CurrentUserService;
import com.herowiki.model.AppUser;
import com.herowiki.model.Favorite;
import com.herowiki.model.Hero;
import com.herowiki.model.Vote;
import com.herowiki.repository.FavoriteRepository;
import com.herowiki.repository.Herorepository;
import com.herowiki.repository.VoteRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/heroes")
public class HeroController {

    private final Herorepository herorepository;
    private final VoteRepository voteRepository;
    private final FavoriteRepository favoriteRepository;
    private final CurrentUserService currentUserService;

    public HeroController(
            Herorepository herorepository,
            VoteRepository voteRepository,
            FavoriteRepository favoriteRepository,
            CurrentUserService currentUserService
    ) {
        this.herorepository = herorepository;
        this.voteRepository = voteRepository;
        this.favoriteRepository = favoriteRepository;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<Hero> getAllHeroes() {
        return herorepository.findAll();  
    }

    @GetMapping("/{id}")
    public Hero getHeroById(@PathVariable Long id) {
        return herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));
    }

    @GetMapping("/meta")
    public Map<Long, Map<String, Object>> getHeroesMeta(@RequestParam List<Long> ids, Authentication authentication) {
        Map<Long, Map<String, Object>> result = new HashMap<>();
        if (ids == null || ids.isEmpty()) {
            return result;
        }

        Map<Long, Long> upvoteCounts = new HashMap<>();
        Map<Long, Long> downvoteCounts = new HashMap<>();

        List<Object[]> groupedCounts = voteRepository.countVotesByHeroIds(ids);
        for (Object[] row : groupedCounts) {
            Long heroId = (Long) row[0];
            Integer value = (Integer) row[1];
            Long count = (Long) row[2];

            if (value == 1) {
                upvoteCounts.put(heroId, count);
            } else if (value == -1) {
                downvoteCounts.put(heroId, count);
            }
        }

        Set<Long> favoritedHeroIds = new HashSet<>();
        Map<Long, Integer> myVotes = new HashMap<>();

        currentUserService.getCurrentUserIfAuthenticated(authentication).ifPresent(user -> {
            List<Favorite> favorites = favoriteRepository.findByUserIdAndHeroIdIn(user.getId(), ids);
            favorites.forEach(f -> favoritedHeroIds.add(f.getHero().getId()));

            List<Vote> votes = voteRepository.findByUserIdAndHeroIdIn(user.getId(), ids);
            votes.forEach(v -> myVotes.put(v.getHero().getId(), v.getValue()));
        });

        for (Long heroId : ids) {
            long upvotes = upvoteCounts.getOrDefault(heroId, 0L);
            long downvotes = downvoteCounts.getOrDefault(heroId, 0L);

            Map<String, Object> meta = new HashMap<>();
            meta.put("upvotes", upvotes);
            meta.put("downvotes", downvotes);
            meta.put("score", upvotes - downvotes);
            meta.put("myVote", myVotes.getOrDefault(heroId, 0));
            meta.put("favorited", favoritedHeroIds.contains(heroId));

            result.put(heroId, meta);
        }

        return result;
    }

    @PostMapping
    public Hero createHero(@RequestBody Hero hero, Authentication authentication) {
        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        hero.setCreatedBy(currentUser);
        hero.setCreatedByName(currentUser.getDisplayName());
        return herorepository.save(hero);
    }

    @PutMapping("/{id}")
    public Hero updateHero(@PathVariable Long id, @RequestBody Hero heroDetails, Authentication authentication) {
        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        if (hero.getCreatedBy() == null || !hero.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only edit your own post");
        }

        hero.setTitle(heroDetails.getTitle());
        hero.setDescription(heroDetails.getDescription());
        hero.setCardColor(heroDetails.getCardColor());
        return herorepository.save(hero);
    }

    @DeleteMapping("/{id}")
    public void deleteHero(@PathVariable Long id, Authentication authentication) {
        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        if (hero.getCreatedBy() == null || !hero.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own post");
        }

        herorepository.delete(hero);
    }

    @PostMapping("/{id}/vote")
    public Map<String, Object> voteHero(
            @PathVariable Long id,
            @RequestParam int value,
            Authentication authentication
    ) {
        if (value != 1 && value != -1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "value must be 1 (upvote) or -1 (downvote)");
        }

        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        Vote vote = voteRepository.findByUserIdAndHeroId(currentUser.getId(), hero.getId())
                .orElseGet(Vote::new);

        vote.setUser(currentUser);
        vote.setHero(hero);
        vote.setValue(value);
        voteRepository.save(vote);

        return voteSummary(hero.getId());
    }

    @DeleteMapping("/{id}/vote")
    public Map<String, Object> removeVote(@PathVariable Long id, Authentication authentication) {
        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        voteRepository.findByUserIdAndHeroId(currentUser.getId(), hero.getId())
                .ifPresent(voteRepository::delete);

        return voteSummary(hero.getId());
    }

    @PostMapping("/{id}/favorite")
    public Map<String, Object> addFavorite(@PathVariable Long id, Authentication authentication) {
        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        favoriteRepository.findByUserIdAndHeroId(currentUser.getId(), hero.getId())
                .orElseGet(() -> {
                    Favorite favorite = new Favorite();
                    favorite.setUser(currentUser);
                    favorite.setHero(hero);
                    return favoriteRepository.save(favorite);
                });

        return Map.of("heroId", hero.getId(), "favorited", true);
    }

    @DeleteMapping("/{id}/favorite")
    public Map<String, Object> removeFavorite(@PathVariable Long id, Authentication authentication) {
        AppUser currentUser = currentUserService.getOrCreateCurrentUser(authentication);
        Hero hero = herorepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero not found"));

        favoriteRepository.findByUserIdAndHeroId(currentUser.getId(), hero.getId())
                .ifPresent(favoriteRepository::delete);

        return Map.of("heroId", hero.getId(), "favorited", false);
    }

    private Map<String, Object> voteSummary(Long heroId) {
        long upvotes = voteRepository.countByHeroIdAndValue(heroId, 1);
        long downvotes = voteRepository.countByHeroIdAndValue(heroId, -1);

        Map<String, Object> response = new HashMap<>();
        response.put("heroId", heroId);
        response.put("upvotes", upvotes);
        response.put("downvotes", downvotes);
        response.put("score", upvotes - downvotes);
        return response;
    }
}
