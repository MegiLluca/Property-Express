package com.propertyexpress.backend.repository;

import com.propertyexpress.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface ReservationRepository  extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.property.property_id = :property_id AND (:endDate < r.startDate OR :startDate > r.endDate)")
    List<Reservation> findReservationByPropertyIdAndStartDateAndEndDateParams(
            @Param("property_id") Long property_id,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
}
