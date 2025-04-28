package com.yourcompany.herowiki.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob; // <<< IMPORT THIS
// Optionally import Column if using that approach
// import jakarta.persistence.Column;

@Entity
public class Hero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob // <<< ADD THIS ANNOTATION
    // Alternatively: @Column(columnDefinition = "TEXT") // Use this OR @Lob
    private String description;

    // Getters and Setters
    // ... (keep existing getters and setters)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
