package com.herowiki.repository;

import com.herowiki.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByOauth2ProviderAndOauth2Subject(String oauth2Provider, String oauth2Subject);
}
