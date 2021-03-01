package com.dexlock.ft.model;

public class ResetPassword {
    private String userEmail;
    private String password;
    private String newPassword;

    public ResetPassword() {
    }

    public ResetPassword(String userEmail, String password, String newPassword) {

        this.userEmail = userEmail;
        this.password = password;
        this.newPassword = newPassword;
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

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
