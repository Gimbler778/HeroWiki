package com.herowiki.repository;

import com.herowiki.model.Hero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Herorepository extends JpaRepository<Hero, Long> {
}
