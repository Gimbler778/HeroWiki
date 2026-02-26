package com.herowiki.repository;

import com.herowiki.model.Favorite;
import com.herowiki.model.Hero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUserIdAndHeroId(Long userId, Long heroId);
    List<Favorite> findByUserId(Long userId);
    List<Favorite> findByUserIdAndHeroIdIn(Long userId, List<Long> heroIds);

    @Query("SELECT f.hero FROM Favorite f WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    List<Hero> findHeroesByUserId(@Param("userId") Long userId);
}
