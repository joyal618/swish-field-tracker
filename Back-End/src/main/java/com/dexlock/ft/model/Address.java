package com.dexlock.ft.model;

public class Address {
    private String customerId;
    private String customerAddress;
    private String phoneNumber;

    public Address(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Address(String customerId, String address, String phoneNumber) {
        this.customerId = customerId;
        this.customerAddress = address;
        this.phoneNumber = phoneNumber;
    }
}

