package com.herowiki.repository;

import com.herowiki.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserIdAndHeroId(Long userId, Long heroId);
    long countByHeroIdAndValue(Long heroId, Integer value);
    List<Vote> findByUserIdAndHeroIdIn(Long userId, List<Long> heroIds);

    @Query("SELECT v.hero.id, v.value, COUNT(v) FROM Vote v WHERE v.hero.id IN :heroIds GROUP BY v.hero.id, v.value")
    List<Object[]> countVotesByHeroIds(@Param("heroIds") List<Long> heroIds);
}
