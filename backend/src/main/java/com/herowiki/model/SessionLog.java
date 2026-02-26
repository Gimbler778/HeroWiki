package com.herowiki.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "session_log")
public class SessionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @Column(name = "session_id", nullable = false)
    private String sessionId;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "logged_in_at", nullable = false)
    private Instant loggedInAt;

    @Column(name = "logged_out_at")
    private Instant loggedOutAt;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent")
    private String userAgent;

    // --- Getters & Setters ---

    public Long getId() { return id; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public Instant getLoggedInAt() { return loggedInAt; }
    public void setLoggedInAt(Instant loggedInAt) { this.loggedInAt = loggedInAt; }

    public Instant getLoggedOutAt() { return loggedOutAt; }
    public void setLoggedOutAt(Instant loggedOutAt) { this.loggedOutAt = loggedOutAt; }

    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
}
