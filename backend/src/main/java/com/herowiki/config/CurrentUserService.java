package com.herowiki.config;

import com.herowiki.model.AppUser;
import com.herowiki.repository.AppUserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class CurrentUserService {

    private final AppUserRepository appUserRepository;

    public CurrentUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public AppUser getOrCreateCurrentUser(Authentication authentication) {
        if (!(authentication instanceof OAuth2AuthenticationToken oauthToken)) {
            throw new ResponseStatusException(UNAUTHORIZED, "OAuth2 login required");
        }

        OAuth2User oauthUser = oauthToken.getPrincipal();
        String provider = oauthToken.getAuthorizedClientRegistrationId();

        String subject = attributeAsString(oauthUser, "sub");
        if (subject == null) {
            subject = attributeAsString(oauthUser, "id");
        }
        if (subject == null) {
            throw new ResponseStatusException(UNAUTHORIZED, "Unable to identify OAuth2 user");
        }

        String email = attributeAsString(oauthUser, "email");
        String displayName = attributeAsString(oauthUser, "name");
        if (displayName == null) {
            displayName = attributeAsString(oauthUser, "login");
        }
        if (displayName == null) {
            displayName = email != null ? email : "User";
        }

        String avatarUrl = attributeAsString(oauthUser, "picture");
        if (avatarUrl == null) {
            avatarUrl = attributeAsString(oauthUser, "avatar_url");
        }

        AppUser user = appUserRepository
            .findByOauth2ProviderAndOauth2Subject(provider, subject)
            .orElseGet(AppUser::new);

        user.setOauth2Provider(provider);
        user.setOauth2Subject(subject);
        user.setEmail(email);
        user.setDisplayName(displayName);
        user.setAvatarUrl(avatarUrl);

        return appUserRepository.save(user);
    }

    public Optional<AppUser> getCurrentUserIfAuthenticated(Authentication authentication) {
        if (!(authentication instanceof OAuth2AuthenticationToken oauthToken)) {
            return Optional.empty();
        }

        OAuth2User oauthUser = oauthToken.getPrincipal();
        String provider = oauthToken.getAuthorizedClientRegistrationId();

        String subject = attributeAsString(oauthUser, "sub");
        if (subject == null) {
            subject = attributeAsString(oauthUser, "id");
        }
        if (subject == null) {
            return Optional.empty();
        }

        return appUserRepository.findByOauth2ProviderAndOauth2Subject(provider, subject);
    }

    private String attributeAsString(OAuth2User oauthUser, String attributeName) {
        Object value = oauthUser.getAttributes().get(attributeName);
        return value == null ? null : String.valueOf(value);
    }
}
