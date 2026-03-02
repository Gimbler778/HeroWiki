package com.herowiki.config;

import com.herowiki.repository.SessionLogRepository;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuthSuccessHandler oAuthSuccessHandler;
    private final SessionLogRepository sessionLogRepository;
    private final CurrentUserService currentUserService;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    public SecurityConfig(OAuthSuccessHandler oAuthSuccessHandler,
                          SessionLogRepository sessionLogRepository,
                          CurrentUserService currentUserService) {
        this.oAuthSuccessHandler = oAuthSuccessHandler;
        this.sessionLogRepository = sessionLogRepository;
        this.currentUserService = currentUserService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            ObjectProvider<ClientRegistrationRepository> clientRegistrationRepository
    ) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(withDefaults())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(HttpMethod.GET, "/api/heroes/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/heroes/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/heroes/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/heroes/**").authenticated()
                .requestMatchers("/api/me/**", "/api/heroes/*/vote", "/api/heroes/*/favorite").authenticated()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().permitAll()
            );

        if (clientRegistrationRepository.getIfAvailable() != null) {
            http.oauth2Login(oauth2 -> oauth2
                .successHandler(oAuthSuccessHandler)
            );
        }

        http.logout(logout -> logout
                .logoutUrl("/api/logout")
            .logoutRequestMatcher(new OrRequestMatcher(
                new AntPathRequestMatcher("/api/logout", "POST"),
                new AntPathRequestMatcher("/api/logout", "GET")
            ))
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("SESSION", "JSESSIONID")
                .logoutSuccessHandler((request, response, authentication) -> {
                    // Stamp logged_out_at on the user's most recent active session
                    try {
                        if (authentication != null) {
                            var user = currentUserService.getOrCreateCurrentUser(authentication);
                            sessionLogRepository.findActiveSessionsByUserId(user.getId())
                                .stream().findFirst().ifPresent(log -> {
                                    log.setLoggedOutAt(java.time.Instant.now());
                                    sessionLogRepository.save(log);
                                });
                        }
                    } catch (Exception ignored) {}

                    String redirectBase = frontendUrl != null ? frontendUrl.trim() : "http://localhost:3000";
                    if (redirectBase.contains(",")) {
                        redirectBase = redirectBase.split(",")[0].trim();
                    }
                    if (redirectBase.endsWith("/")) {
                        redirectBase = redirectBase.substring(0, redirectBase.length() - 1);
                    }

                    if ("GET".equalsIgnoreCase(request.getMethod())) {
                        String redirect = request.getParameter("redirect");
                        if (redirect != null && !redirect.isBlank() && redirect.startsWith(redirectBase)) {
                            response.sendRedirect(redirect);
                            return;
                        }
                        response.sendRedirect(redirectBase + "/feed");
                        return;
                    }

                    response.setStatus(200);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"message\":\"Logged out\"}");
                })
            );

        return http.build();
    }
}

