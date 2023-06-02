package com.propertyexpress.backend.controller;

import com.propertyexpress.backend.exception.ResourceNotFoundException;
import com.propertyexpress.backend.model.Property;
import com.propertyexpress.backend.model.Review;
import com.propertyexpress.backend.repository.PropertyRepository;
import com.propertyexpress.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewsRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/reviews")
    public List<Review> getReviews(){
        return reviewsRepository.findAll();
    }

    @GetMapping("/reviews/{propertyId}")
    public List<Review> getPropertyById(@PathVariable Long propertyId) {
        List<Review> reviews  = reviewsRepository.findAllByPropertyIdParam(propertyId);
        return reviews;
    }

    @PostMapping("/review")
    public ResponseEntity createReview(@RequestBody Map<String, String> jsonData) {
        Long propertyId = Long.parseLong(jsonData.getOrDefault("property_id", "1"));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property doesn't exist with id :" + propertyId));

        Review review = new Review();
        review.setFirstName(jsonData.get("reviewFirstName"));
        review.setLastName(jsonData.get("reviewLastName"));
        review.setDescription(jsonData.get("reviewDescription"));
        review.setProperty(property);
        review.setReviewDate(Date.valueOf(LocalDate.now()));

        reviewsRepository.save(review);
        return new ResponseEntity<>("Review saved successfully", HttpStatus.CREATED);
    }


}
