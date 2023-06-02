package com.propertyexpress.backend.controller;
import com.google.gson.JsonObject;
import com.propertyexpress.backend.exception.ResourceNotFoundException;
import com.propertyexpress.backend.model.Property;
import com.propertyexpress.backend.model.Reservation;
import com.propertyexpress.backend.repository.PropertyRepository;
import com.propertyexpress.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/reservations")
    public List<Reservation> getReservations(){
        return reservationRepository.findAll();
    }

    @PostMapping("/reservation")
    public ResponseEntity createReservation(@RequestBody Map<String, String> jsonData) {
        Long propertyId = Long.parseLong(jsonData.getOrDefault("property_id", "1"));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property doesn't exist with id :" + propertyId));
        Reservation reservation = new Reservation();
        reservation.setStartDate(Date.valueOf(jsonData.get("startDate")));
        reservation.setEndDate(Date.valueOf(jsonData.get("endDate")));
        reservation.setFirstName(jsonData.get("firstName"));
        reservation.setLastName(jsonData.get("lastName"));
        reservation.setEmail(jsonData.get("email"));
        reservation.setProperty(property);

        reservationRepository.save(reservation);
        return new ResponseEntity<>("Reservation saved successfully", HttpStatus.CREATED);
    }

    @PostMapping("/reservation/check")
    public ResponseEntity checkReservation(@RequestBody Map<String, String> jsonData) {
        Long propertyId = Long.parseLong(jsonData.getOrDefault("property_id", "1"));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property doesn't exist with id :" + propertyId));

        Date startDate = Date.valueOf(jsonData.get("startDate"));
        Date endDate = Date.valueOf(jsonData.get("endDate"));

        List<Reservation> reservations = reservationRepository.findReservationByPropertyIdAndStartDateAndEndDateParams(propertyId, startDate, endDate);

        JsonObject responseJson = new JsonObject();
        if (reservations.size() == 0) {
            responseJson.addProperty("available", false);
        } else {
            responseJson.addProperty("available", true);
        }

        return new ResponseEntity<>(responseJson, HttpStatus.CREATED);
    }

    @GetMapping("/reservation/{id}")
    public ResponseEntity<Reservation> getPropertyById(@PathVariable Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property doesn't exist with id :" + id));
        return ResponseEntity.ok(reservation);
    }


}
