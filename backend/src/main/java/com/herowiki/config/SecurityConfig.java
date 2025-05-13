package com.herowiki.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults()) 
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow OPTIONS requests
                .requestMatchers(HttpMethod.GET, "/api/heroes", "/api/heroes/**").permitAll() // Allow GET requests
                .requestMatchers(HttpMethod.POST, "/api/heroes").permitAll() // Allow POST requests
                .requestMatchers(HttpMethod.PUT, "/api/heroes/**").permitAll() // Allow PUT requests
                .requestMatchers(HttpMethod.DELETE, "/api/heroes/**").permitAll() // Allow DELETE requests
                .anyRequest().authenticated() // Require authentication for other requests
            )
            .httpBasic(withDefaults()); // Use basic authentication (optional)

        return http.build();
    }
}
