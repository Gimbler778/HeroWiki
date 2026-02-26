package com.herowiki.repository;

import com.herowiki.model.Hero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Herorepository extends JpaRepository<Hero, Long> {
	List<Hero> findByCreatedById(Long userId);
}

