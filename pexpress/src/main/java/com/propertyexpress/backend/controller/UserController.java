package com.propertyexpress.backend.controller;


import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.propertyexpress.backend.exception.ResourceNotFoundException;
import com.propertyexpress.backend.model.User;
import com.propertyexpress.backend.repository.UserRepository;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users.get(0), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity createUser(@RequestBody Map<String, String> jsonData) {
        User user = new User();

        user.setFirstName(jsonData.get("firstName"));
        user.setLastName(jsonData.get("lastName"));
        user.setEmail(jsonData.get("email"));
        user.setBirthday(Date.valueOf(jsonData.get("birthday")));
        user.setPassword(jsonData.get("password"));
        user.hashPassword();
        userRepository.save(user);

        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }

    @PostMapping("/users/auth")
    public ResponseEntity authUser(@RequestBody Map<String, String> jsonData) {
        User user = new User();
        user.setFirstName(jsonData.get("firstName"));
        user.setLastName(jsonData.get("lastName"));
        user.setEmail(jsonData.get("email"));
        user.setBirthday(Date.valueOf(jsonData.get("birthday")));
        user.setPassword(jsonData.get("password"));
        user.hashPassword();
        userRepository.save(user);

        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserId(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User doesn't exist with id :" + id));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody Map<String, String> jsonData){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not exist with id :" + id));

        String firstName = jsonData.getOrDefault("firstName", user.getFirstName());
        String lastName = jsonData.getOrDefault("lastName", user.getLastName());
        String email = jsonData.getOrDefault("email", user.getEmail());
        String birthday = jsonData.getOrDefault("birthday", user.getBirthday().toString());
        String country = jsonData.getOrDefault("country", user.getCountry());
        String city = jsonData.getOrDefault("city", user.getCity());
        String description = jsonData.getOrDefault("description", user.getDescription());

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setBirthday(Date.valueOf(birthday));
        user.setCountry(country);
        user.setCity(city);
        user.setDescription(description);

        User updatedEmployee = userRepository.save(user);
        return ResponseEntity.ok(updatedEmployee);
    }

    @PostMapping("/user/picture/{id}")
    public ResponseEntity<User> updateUserPicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {

        // upload foto
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
        user.setMainPicture(file.getBytes());

        User updatedEmployee = userRepository.save(user);
        return ResponseEntity.ok(updatedEmployee);
    }

    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User doesn't exist with id :" + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/login")
    public ResponseEntity<String> login() {
        return new ResponseEntity<>("Login endpoint", HttpStatus.OK);
    }

    @GetMapping("/users/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("Logout endpoint", HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        // Perform logout logic, such as invalidating session or revoking tokens

        return new ResponseEntity<>("User logged out successfully", HttpStatus.OK);
    }
}
