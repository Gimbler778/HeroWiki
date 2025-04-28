// filepath: d:\a 2.o\herowiki\backend\src\main\java\com\yourcompany\herowiki\model\Hero.java
package com.yourcompany.herowiki.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
// import jakarta.persistence.Column;

@Entity
public class Hero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String description;

    private String cardColor; // <<< ADD THIS FIELD

    // --- GETTERS AND SETTERS ---
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

    public String getCardColor() { // <<< ADD GETTER
        return cardColor;
    }

    public void setCardColor(String cardColor) { // <<< ADD SETTER
        this.cardColor = cardColor;
    }
}
