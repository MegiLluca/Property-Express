package com.propertyexpress.backend.model;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Table(name = "propertyImageTable")
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="property_id", nullable=false)
    private Property property;

    @Column(name="image")
    @Lob
    private Blob image;

    public PropertyImage(Property property, Blob image) {
        this.property = property;
        this.image = image;
    }
}
