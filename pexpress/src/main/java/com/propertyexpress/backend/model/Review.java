package com.propertyexpress.backend.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "reviewTable")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;

    @Column(name = "review_date", nullable = false)
    private Date reviewDate;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "description")
    private String description;

}
