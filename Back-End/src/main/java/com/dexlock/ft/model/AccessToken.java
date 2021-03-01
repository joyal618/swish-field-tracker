package com.dexlock.ft.model;

import javax.security.auth.Subject;
import java.security.Principal;

public class AccessToken implements Principal {

        String Token;
        String userEmail;
        String userRole;
        String status;

    public AccessToken() {
    }

    public AccessToken(String token, String userEmail, String userRole, String status) {
        this.Token = token;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.status = status;


    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        this.Token = token;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    @Override
    public String getName() {
        return null;
    }

    @Override
    public boolean implies(Subject subject) {
        return false;
    }

}
