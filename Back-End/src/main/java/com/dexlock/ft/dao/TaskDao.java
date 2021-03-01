package com.dexlock.ft.dao;

import com.byteowls.jopencage.JOpenCageGeocoder;
import com.byteowls.jopencage.model.JOpenCageForwardRequest;
import com.byteowls.jopencage.model.JOpenCageLatLng;
import com.byteowls.jopencage.model.JOpenCageResponse;

import com.dexlock.ft.application.MongoDBConnection;
import com.dexlock.ft.model.Task;
import com.dexlock.ft.model.User;
import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

import com.mongodb.client.model.Projections;


import org.bson.Document;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import java.io.*;


import java.util.Arrays;
import java.util.UUID;

import java.util.ArrayList;
import java.util.List;
import java.util.*;

import org.bson.conversions.Bson;

import javax.ws.rs.core.Response;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class TaskDao {

    static Gson gson = new Gson();
    private MongoDBConnection mongoDBConnection = MongoDBConnection.getInstance();
    private MongoDatabase db = mongoDBConnection.getDatabase();
    private MongoCollection<Document> collectionTask = db.getCollection("Task");
    private MongoCollection<Document> collectionUser = db.getCollection("User");
    private MongoCollection<Document> collectionAccessToken = db.getCollection("AccessToken");

    public List<Document> AssignedTasksFiltering() {
        List<Document> documentAssign = collectionTask.find(new Document("taskStatus", new Document("$in", Arrays.asList("Assigned", "Pickedup", "Delivered")))).into(new ArrayList<Document>());
        return documentAssign;
    }

    public List<Document> UnassignedTasksFiltering() {
        List<Document> documentUnassign = collectionTask.find(new Document("taskStatus", "Ordered")).into(new ArrayList<Document>());
        return documentUnassign;
    }

    public Integer fareCalculation(Task taskData) {

        Document task = Document.parse(gson.toJson(taskData));
        JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder("c86c41d2172248e997bbad45c0866ab5");
        JOpenCageForwardRequest request1 = new JOpenCageForwardRequest(taskData.getPickUpAddress());
        request1.setRestrictToCountryCode("in"); //set for India
        request1.setBounds(12.727779, 77.102315, 12.727779, 77.420918); // LatLng bounds of Kerala
        JOpenCageResponse response1 = jOpenCageGeocoder.forward(request1);
        JOpenCageLatLng firstResultLatLng = response1.getFirstPosition();
        Double lat1 = firstResultLatLng.getLat();
        Double lon1 = firstResultLatLng.getLng();

        System.out.println(firstResultLatLng.getLat());
        System.out.println(firstResultLatLng.getLng());

        JOpenCageForwardRequest request2 = new JOpenCageForwardRequest(taskData.getDeliveryAddress());
        request2.setRestrictToCountryCode("in");
        request2.setBounds(12.727779, 77.102315, 12.727779, 77.420918);
        JOpenCageResponse response2 = jOpenCageGeocoder.forward(request2);
        JOpenCageLatLng firstResultLatLng2 = response2.getFirstPosition();
        Double lat2 = firstResultLatLng2.getLat();
        Double lon2 = firstResultLatLng2.getLng();

        System.out.println(firstResultLatLng2.getLat());
        System.out.println(firstResultLatLng2.getLng());

        ///////////Haversine Formula//////////////
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);
        double a = Math.pow(Math.sin(dLat / 2), 2) +
                Math.pow(Math.sin(dLon / 2), 2) *
                        Math.cos(lat1) *
                        Math.cos(lat2);
        double rad = 6371;
        double c = 2 * Math.asin(Math.sqrt(a));
        double distance = rad * c;
        String informUser = null;
        System.out.println(distance);

        double deliveryCharge = distance * 10;
        taskData.setDeliveryCharge(deliveryCharge);
        if (distance > 5) {
            informUser = "Sorry,we don't deliver there";
            return -1;
        } else if (distance >= 0 && distance <= 1) {
            deliveryCharge = 15;
            informUser = "Sit back and relax. Your order will be delivered shortly.";
            System.out.println("Delivery charge: Rs." + deliveryCharge);
        } else if (distance >= 1 && distance <= 5) {
            informUser = "Sit back and relax. Your order will be delivered shortly.";
            System.out.println("Delivery charge: Rs." + Math.abs(deliveryCharge));
        }
        return Math.toIntExact(Math.round(deliveryCharge));
    }

    //API to submit image
    public String imageTaskRequest(InputStream fileInputStream, FormDataContentDisposition fileMetaData) throws IOException {
        String uuid = UUID.randomUUID().toString();
        String UPLOAD_PATH = "src/main/java/com/dexlock/ft/dao/images/" + uuid;
        //Code to read the file

        int read = 0;
        byte[] bytes = new byte[1024];
        OutputStream out = new FileOutputStream(new File(UPLOAD_PATH + fileMetaData.getFileName()));
        while ((read = fileInputStream.read(bytes)) != -1) {
            out.write(bytes, 0, read);
        }
        out.flush();
        out.close();
        return uuid;

    }

    public String detailsAppendRequest(Task taskData) {
        Document task = Document.parse(gson.toJson(taskData));
        collectionTask.insertOne(task);
        return "Task Added";

    }

    public String textTaskRequest(Task taskData) {
        Document task = Document.parse(gson.toJson(taskData));
        collectionTask.insertOne(task);
        return "Task Added";
    }

    public String updateTasksForAgent(Task taskData) {
        Bson filter = new Document("taskId", taskData.getTaskId());
        Bson insertAgentEmail = new Document("agentEmail", taskData.getAgentEmail());
        Bson updateTaskDocument = new Document("$set", insertAgentEmail);
        collectionTask.updateOne(filter, updateTaskDocument);
        alertAgent(taskData.getAgentEmail());

        Bson filter1 = new Document("taskId", taskData.getTaskId());
        Bson insertTaskStatus = new Document("taskStatus", "Assigned");
        Bson updateTaskDocument1 = new Document("$set", insertTaskStatus);
        collectionTask.updateOne(filter1, updateTaskDocument1);

        Bson filter2 = new Document("userEmail", taskData.getAgentEmail());
        Bson insertStatus = new Document("status", "busy");
        Bson updateTaskDocument2 = new Document("$set", insertStatus);
        collectionAccessToken.updateOne(filter2, updateTaskDocument2);




        Bson filter3 = new Document("taskId", taskData.getTaskId());
        Date assignedDate=new Date();
        Bson insertTaskAssignedDate= new Document("assignedTime",assignedDate);
        Bson updateTaskDocument3 = new Document("$set", insertTaskAssignedDate);

        collectionTask.updateOne(filter3, updateTaskDocument3);

        return "Task updated";
    }

    private static void alertAgent(String userEmail) {
        final String username = "akshay@dexlock.com";
        final String password = "vtivvnayvtvgqjox";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); //TLS

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("akshay@dexlock.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(userEmail)
            );
            message.setSubject("Swish: New Task Assigned");
            message.setText("Hi"
                    + "\n\n A new task has been assigned to you. Please check your login page.");

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


    public List<Document> activeTask(Task taskData) {
        List<Document> documentActiveTask = collectionTask.find(new Document("taskStatus", new Document("$in", Arrays.asList("Ordered", "Assigned", "PickedUp"))).append("customerId", taskData.getCustomerId())).into(new ArrayList<Document>());
        return documentActiveTask;
    }


    public Document returnTaskObject(User userData) {
        Document document = collectionTask.find(new Document("taskStatus", new Document("$in", Arrays.asList("Assigned", "PickedUp"))).append("agentEmail", userData.getUserEmail())).first();




        if (document.size()<1) {
            Response.ok("Currently no task assigned").build();
        }
        return document;
    }

    public String pickUpTime(Task taskData) {
        String str;
        Document document = collectionTask.find(new Document("taskId", taskData.getTaskId())).first();
        System.out.println(document);
        Document updatedTask = Document.parse(gson.toJson(taskData));
        if (document != null) {
            //  if (originalTask.get("agentEmail").equals(useProfile.getUserEmail()))
            {
                for (String name : updatedTask.keySet())
                    collectionTask.updateOne(Filters.eq("taskId", taskData.getTaskId()), Updates.set(name, updatedTask.get(name)));
            }
            str = "Task Updated";
        } else {
            str = "Task Not found";

        }
        return str;
    }

    public String deliveryTime(Task taskData) {
        String str;
        Document document = collectionTask.find(new Document("taskId", taskData.getTaskId())).first();
        Document updatedTask = Document.parse(gson.toJson(taskData));
        if (document != null) {
            {
                for (String name : updatedTask.keySet())
                    collectionTask.updateOne(Filters.eq("taskId", taskData.getTaskId()), Updates.set(name, updatedTask.get(name)));
            }
            str = "Task Updated";
        } else {
            str = "Task Not found";

        }
        return str;
    }

    public String deliveryDifficulty(Task taskData) {
        String str;
        Document document = collectionTask.find(new Document("taskId", taskData.getTaskId())).first();
        Document updatedTask = Document.parse(gson.toJson(taskData));

        if (document != null) {
            {
                for (String name : updatedTask.keySet())
                    collectionTask.updateOne(Filters.eq("taskId", taskData.getTaskId()), Updates.set(name, updatedTask.get(name)));
            }
            str = "Task Updated";
        } else {
            str = "Task Not found";

        }

        return str;
    }

    public List<Document> deliveredTask(User userData) {
        List<Document> documentDeliveredTask = collectionTask.find((new Document("customerId", userData.getUserEmail())).append("taskStatus", "Delivered")).into(new ArrayList<Document>());
        return documentDeliveredTask;
    }

    public String agentPhoneNumber(User userData) {
        Document findNumber = collectionUser.find(new Document("userEmail", userData.getUserEmail())).first();
        User role = gson.fromJson(findNumber.toJson(), User.class);
        String number = role.getPhoneNumber();
        return number;

    }


    public List<Document> pastOrders(User userData) {
        List<Document> documentDeliveredTask = collectionTask.find((new Document("agentEmail", userData.getUserEmail())).append("taskStatus", "Delivered")).into(new ArrayList<Document>());
        return documentDeliveredTask;
    }
}






