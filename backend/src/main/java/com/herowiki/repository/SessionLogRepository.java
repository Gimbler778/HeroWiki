package com.herowiki.repository;

import com.herowiki.model.SessionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SessionLogRepository extends JpaRepository<SessionLog, Long> {

    List<SessionLog> findByUserIdOrderByLoggedInAtDesc(Long userId);

    Optional<SessionLog> findTopBySessionIdOrderByLoggedInAtDesc(String sessionId);

    @Query("SELECT s FROM SessionLog s WHERE s.user.id = :userId AND s.loggedOutAt IS NULL ORDER BY s.loggedInAt DESC")
    List<SessionLog> findActiveSessionsByUserId(Long userId);
}
