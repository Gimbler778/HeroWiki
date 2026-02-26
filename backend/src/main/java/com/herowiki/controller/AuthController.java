package com.herowiki.controller;

import com.herowiki.config.CurrentUserService;
import com.herowiki.model.AppUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CurrentUserService currentUserService;

    public AuthController(CurrentUserService currentUserService) {
        this.currentUserService = currentUserService;
    }

    /**
     * Public endpoint — no authentication required.
     * Returns { authenticated: false } for guests,
     * or { authenticated: true, user: { id, displayName, email, avatarUrl } } for logged-in users.
     */
    @GetMapping("/status")
    public Map<String, Object> status(Authentication authentication) {
        Map<String, Object> result = new HashMap<>();

        if (authentication == null
                || !authentication.isAuthenticated()
                || !(authentication instanceof OAuth2AuthenticationToken)) {
            result.put("authenticated", false);
            return result;
        }

        try {
            AppUser user = currentUserService.getOrCreateCurrentUser(authentication);
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("displayName", user.getDisplayName() != null ? user.getDisplayName() : "");
            userMap.put("email", user.getEmail() != null ? user.getEmail() : "");
            userMap.put("avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : "");

            result.put("authenticated", true);
            result.put("user", userMap);
        } catch (Exception e) {
            result.put("authenticated", false);
        }

        return result;
    }
}
