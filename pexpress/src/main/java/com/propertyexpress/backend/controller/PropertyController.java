package com.propertyexpress.backend.controller;
import com.propertyexpress.backend.exception.ResourceNotFoundException;
import com.propertyexpress.backend.model.Property;
import com.propertyexpress.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class PropertyController {
    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/properties")
    public List<Property> getAllProperties(){
        return propertyRepository.findAll();
    }

    @GetMapping("/properties/city/{city}")
    public List<Property> getPropertiesByCity(@PathVariable String city){
        return propertyRepository.findByCity(city);
    }

    @PostMapping("/property")
    public ResponseEntity createProperty(@RequestBody Map<String, String> jsonData) {
        Property property = new Property();
        property.setTitle(jsonData.get("title"));
        property.setDescription(jsonData.get("description"));
        property.setCountry(jsonData.get("country"));
        property.setCity(jsonData.get("city"));
        property.setStreet(jsonData.get("street"));
        property.setBuildingNumber(jsonData.get("buildingNumber"));
        property.setAptNumber(jsonData.get("aptNumber"));
        property.setNo_beds(Integer.parseInt(jsonData.get("no_beds")));
        property.setNo_bathroom(Integer.parseInt(jsonData.get("no_bathroom")));
        property.setNo_balcony(Integer.parseInt(jsonData.get("no_balcony")));
        property.setPrice(Integer.parseInt(jsonData.get("price")));
        property.setCurrency(jsonData.get("currency"));

        propertyRepository.save(property);
        return new ResponseEntity<>(property, HttpStatus.CREATED);
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property doesn't exist with id :" + id));
        return ResponseEntity.ok(property);
    }

    @PutMapping("/property/{id}")
    public ResponseEntity<Property> updateUser(@PathVariable Long id, @RequestBody  Map<String, String> jsonData){
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not exist with id :" + id));

        String title = jsonData.getOrDefault("title", property.getTitle());
        String description = jsonData.getOrDefault("description", property.getDescription());
        String country = jsonData.getOrDefault("country", property.getCountry());
        String city = jsonData.getOrDefault("city", property.getCity());
        String street = jsonData.getOrDefault("street", property.getStreet());
        String buildingNumber = jsonData.getOrDefault("buildingNumber", property.getBuildingNumber());
        String aptNumber = jsonData.getOrDefault("aptNumber", property.getAptNumber());
        String noBeds = jsonData.getOrDefault("no_beds", String.valueOf(property.getNoBeds()));
        String noBathrooms = jsonData.getOrDefault("no_bathroom", String.valueOf(property.getNo_bathroom()));
        String noBalcony = jsonData.getOrDefault("no_balcony", String.valueOf(property.getNo_balcony()));
        String price = jsonData.getOrDefault("price", String.valueOf(property.getPrice()));
        String currency = jsonData.getOrDefault("currency", property.getCurrency());

        property.setTitle(title);
        property.setDescription(description);
        property.setCountry(country);
        property.setCity(city);
        property.setStreet(street);
        property.setBuildingNumber(buildingNumber);
        property.setAptNumber(aptNumber);
        property.setNo_beds(Integer.parseInt(noBeds));
        property.setNo_bathroom(Integer.parseInt(noBathrooms));
        property.setNo_balcony(Integer.parseInt(noBalcony));
        property.setPrice(Integer.parseInt(price));
        property.setCurrency(currency);

        Property updatedProperty = propertyRepository.save(property);
        return ResponseEntity.ok(updatedProperty);
    }

    @PutMapping("/property/picture/{id}")
    public ResponseEntity<Property> updatePropertyPicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not exist with id :" + id));

        // upload foto
        property.setMainPicture(file.getBytes());
        Property updatedProperty = propertyRepository.save(property);
        return ResponseEntity.ok(updatedProperty);
    }

}
