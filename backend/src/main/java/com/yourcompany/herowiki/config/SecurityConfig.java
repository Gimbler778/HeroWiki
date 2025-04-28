package com.yourcompany.herowiki.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // <<< RE-ADD THIS IMPORT
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
            .csrf(csrf -> csrf.disable())
            // ---> RESTORE INTENDED SECURITY RULES <---
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow OPTIONS
                .requestMatchers(HttpMethod.GET, "/api/heroes", "/api/heroes/**").permitAll() // Allow GET
                .requestMatchers(HttpMethod.POST, "/api/heroes").permitAll() // Allow POST
                .anyRequest().authenticated() // Authenticate others (PUT, DELETE, etc.)
            )
            // ---> RESTORE httpBasic (optional for now, but good practice) <---
            .httpBasic(withDefaults());

        return http.build();
    }
}
