package com.propertyexpress.backend.model;

import org.mindrot.jbcrypt.BCrypt;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "userTable")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name="user_id", nullable=false, updatable=false)
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_address")
    private String email;

    @Column(nullable = false)
    private String password;


    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "description")
    private String description;

    @Column(name = "l_country")
    private String country;

    @Column(name = "l_city")
    private String city;

    @Column(name="mainPicture")
    @Lob
    private byte[] mainPicture;

    public User() {

    }

    public User(String firstName, String lastName, String email, Date birthday, String password) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
    }

    public User(String email) {
        this.email = email;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Hash the password using a hashing algorithm (e.g., BCrypt)
    public void hashPassword() {
        String hashedPassword = BCrypt.hashpw(this.password, BCrypt.gensalt());
        this.password = hashedPassword;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Date getBirthday() {
        return birthday;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setMainPicture(byte[]  mainPicture) {
        this.mainPicture = mainPicture;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public byte[]  getMainPicture() {
        return mainPicture;
    }

    // Validate a provided password against the hashed password
    public boolean validatePassword(String providedPassword) {
        return BCrypt.checkpw(providedPassword, this.password);
    }
}