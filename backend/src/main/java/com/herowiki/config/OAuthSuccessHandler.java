package com.herowiki.config;

import com.herowiki.model.AppUser;
import com.herowiki.model.SessionLog;
import com.herowiki.repository.SessionLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private static final long SESSION_DAYS = 3;

    private final CurrentUserService currentUserService;
    private final SessionLogRepository sessionLogRepository;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    public OAuthSuccessHandler(
            CurrentUserService currentUserService,
            SessionLogRepository sessionLogRepository
    ) {
        this.currentUserService = currentUserService;
        this.sessionLogRepository = sessionLogRepository;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {
        try {
            AppUser user = currentUserService.getOrCreateCurrentUser(authentication);

            String sessionId = request.getSession(true).getId();
            String provider = authentication.getClass().getSimpleName();
            // Extract clean provider name from OAuth token
            try {
                var oauthToken = (org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) authentication;
                provider = oauthToken.getAuthorizedClientRegistrationId();
            } catch (Exception ignored) {}

            String ipAddress = getClientIp(request);
            String userAgent = request.getHeader("User-Agent");

            Instant now = Instant.now();
            SessionLog log = new SessionLog();
            log.setUser(user);
            log.setSessionId(sessionId);
            log.setProvider(provider);
            log.setLoggedInAt(now);
            log.setExpiresAt(now.plus(SESSION_DAYS, ChronoUnit.DAYS));
            log.setIpAddress(ipAddress);
            log.setUserAgent(userAgent != null && userAgent.length() > 255 ? userAgent.substring(0, 255) : userAgent);

            sessionLogRepository.save(log);
        } catch (Exception e) {
            // Never block login due to logging failure
        }

        response.sendRedirect(frontendUrl + "/feed");
    }

    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
