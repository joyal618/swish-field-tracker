package com.dexlock.ft.model;

public class Task {
    private String taskId;
    private String customerId;
    private String pickUpAddress;
    private String deliveryAddress;
    private String taskStatus;
    private String agentEmail;
    private String orderedTime;
    private String assignedTime;
    private String userPhoneNumber;
    private String pickedUpTime;
    private String deliveredTime;
    private String customerConfirmation;
    private String fileAttachment;
    private String taskDescription;
    private double deliveryCharge;

    public Task() {
    }

    public Task(String taskId, String customerId, String pickUpAddress, String deliveryAddress, String taskStatus, String agentEmail, String orderedTime, String assignedTime, String userPhoneNumber,String pickedUpTime, String deliveredTime, String customerConfirmation, String fileAttachment, String taskDescription, double deliveryCharge) {

        this.taskId = taskId;
        this.customerId = customerId;
        this.pickUpAddress = pickUpAddress;
        this.deliveryAddress = deliveryAddress;
        this.taskStatus = taskStatus;
        this.agentEmail = agentEmail;
        this.orderedTime = orderedTime;
        this.assignedTime = assignedTime;
        this.pickedUpTime = pickedUpTime;
        this.deliveredTime = deliveredTime;
        this.customerConfirmation = customerConfirmation;
        this.userPhoneNumber = userPhoneNumber;
        this.fileAttachment = fileAttachment;
        this.taskDescription = taskDescription;
        this.deliveryCharge = deliveryCharge;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getPickUpAddress() {
        return pickUpAddress;
    }

    public void setPickUpAddress(String pickUpAddress) {
        this.pickUpAddress = pickUpAddress;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getAgentEmail() {
        return agentEmail;
    }

    public void setAgentEmail(String agentEmail) {
        this.agentEmail = agentEmail;
    }

    public String getOrderedTime() {
        return orderedTime;
    }

    public void setOrderedTime(String orderedTime) {
        this.orderedTime = orderedTime;
    }

    public String getAssignedTime() {
        return assignedTime;
    }

    public void setAssignedTime(String assignedTime) {
        this.assignedTime = assignedTime;
    }

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }

    public String getPickedUpTime() {
        return pickedUpTime;
    }

    public void setPickedUpTime(String pickedUpTime) {
        this.pickedUpTime = pickedUpTime;
    }

    public String getDeliveredTime() {
        return deliveredTime;
    }

    public void setDeliveredTime(String deliveredTime) {
        this.deliveredTime = deliveredTime;
    }

    public String getCustomerConfirmation() {
        return customerConfirmation;
    }

    public void setCustomerConfirmation(String customerConfirmation) {
        this.customerConfirmation = customerConfirmation;
    }

    public String getFileAttachment() {
        return fileAttachment;
    }

    public void setFileAttachment(String fileAttachment) {
        this.fileAttachment = fileAttachment;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public double getDeliveryCharge() {
        return deliveryCharge;
    }

    public void setDeliveryCharge(double deliveryCharge) {
        this.deliveryCharge = deliveryCharge;
    }
}

