package com.dexlock.ft.model;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import java.security.Principal;


public class User implements Principal {
    private String firstName;
    private String lastName;
    private String userEmail;
    private String userRole;
    private String password;
    private String profilePhoto;
    private String phoneNumber;


    public User(String firstName, String lastName, String userEmail, String userRole, String password, String profilePhoto, String phoneNumber) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.password = password;
        this.profilePhoto = profilePhoto;
        this.phoneNumber = phoneNumber;

    }

    public User() {

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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    @Override
    public String getName() {
        return null;
    }
}
