package com.herowiki.controller;

import com.herowiki.config.CurrentUserService;
import com.herowiki.model.AppUser;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<Map<String, Object>> status(Authentication authentication) {
        Map<String, Object> result = new HashMap<>();

        if (authentication == null || !authentication.isAuthenticated()) {
            result.put("authenticated", false);
            return noStore(result);
        }

        try {
            AppUser user = currentUserService
                    .getCurrentUserIfAuthenticated(authentication)
                    .orElseGet(() -> currentUserService.getOrCreateCurrentUser(authentication));
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

        return noStore(result);
    }

    private ResponseEntity<Map<String, Object>> noStore(Map<String, Object> body) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noStore().mustRevalidate())
                .header(HttpHeaders.PRAGMA, "no-cache")
                .header(HttpHeaders.EXPIRES, "0")
                .header(HttpHeaders.VARY, "Cookie")
                .body(body);
    }
}
