package com.yourcompany.herowiki.repository;

import com.yourcompany.herowiki.model.Hero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Herorepository extends JpaRepository<Hero, Long> {
}
