package com.propertyexpress.backend.repository;

import com.propertyexpress.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.property.property_id = :property_id")
    List<Review> findAllByPropertyIdParam(@Param("property_id")  Long property_id);
}
