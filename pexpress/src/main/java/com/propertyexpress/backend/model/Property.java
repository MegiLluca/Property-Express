package com.propertyexpress.backend.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "propertyTable")
public class Property implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name="property_id", nullable=false, updatable=false)
    private long property_id;

    @Column(name = "title")
    private String title;
    @Column(name="description")
    private String description;

    @Column(name = "l_country")
    private String country;
    @Column(name = "l_city")
    private String city;
    @Column(name = "l_street")
    private String street;
    @Column(name = "l_buildingNumber")
    private String buildingNumber;
    @Column(name = "l_aptNumber")
    private String aptNumber;

    @Column(name="no_beds")
    private int no_beds;
    @Column(name="no_bathroom")
    private int no_bathroom;
    @Column(name="no_balcony")
    private int no_balcony;

    // TODO: store as array?
    @Column(name="utilities")
    private String utilities;

    @Column(name="price")
    private int price;
    @Column(name="currency")
    private String currency;

    @Column(name="mainPicture")
    @Lob
    private byte[] mainPicture;

    @OneToMany(mappedBy="property", fetch = FetchType.LAZY)
    private Set<PropertyImage> images;

    public Property() {}

    public void setMainPicture(byte[] mainPicture) {
        this.mainPicture = mainPicture;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStreet(String street) {
        this.street = street;
    }
    public void setBuildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    public void setAptNumber(String aptNumber) {
        this.aptNumber = aptNumber;
    }

    public void setNo_beds(int no_beds) {
        this.no_beds = no_beds;
    }

    public void setNo_bathroom(int no_bathroom) {
        this.no_bathroom = no_bathroom;
    }

    public void setNo_balcony(int no_balcony) {
        this.no_balcony = no_balcony;
    }

    public void setUtilities(String utilities) {
        this.utilities = utilities;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public void setImages(Set<PropertyImage> images) {
        this.images = images;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public long getProperty_id() {
        return property_id;
    }

    public void setProperty_id(long property_id) {
        this.property_id = property_id;
    }
    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getStreet() {
        return street;
    }

    public String getBuildingNumber() {
        return buildingNumber;
    }

    public String getAptNumber() {
        return aptNumber;
    }

    public int getNoBeds() {
        return no_beds;
    }

    public int getNo_bathroom() {
        return no_bathroom;
    }

    public int getNo_balcony() {
        return no_balcony;
    }

    public String getUtilities() {
        return utilities;
    }

    public int getPrice() {
        return price;
    }

    public String getCurrency() {
        return currency;
    }

    public byte[] getMainPicture() {
        return mainPicture;
    }

    public Set<PropertyImage> getImages() {
        return images;
    }
}
