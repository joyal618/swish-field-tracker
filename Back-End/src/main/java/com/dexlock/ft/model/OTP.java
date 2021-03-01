package com.dexlock.ft.model;

public class OTP {
   private String userEmail;
   private Integer otp;

    public OTP() {
    }

    public OTP(String userEmail, Integer otp) {
        this.userEmail = userEmail;
        this.otp = otp;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getOtp() {
        return otp;
    }

    public void setOtp(Integer otp) {
        this.otp = otp;
    }
}
