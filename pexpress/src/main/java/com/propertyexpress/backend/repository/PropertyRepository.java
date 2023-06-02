package com.propertyexpress.backend.repository;

import com.propertyexpress.backend.model.Property;
import com.propertyexpress.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByCity(final String city);
}
