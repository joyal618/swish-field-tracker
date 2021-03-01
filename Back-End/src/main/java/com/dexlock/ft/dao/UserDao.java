package com.dexlock.ft.dao;

import com.byteowls.jopencage.JOpenCageGeocoder;
import com.byteowls.jopencage.model.JOpenCageForwardRequest;
import com.byteowls.jopencage.model.JOpenCageLatLng;
import com.byteowls.jopencage.model.JOpenCageResponse;
import com.dexlock.ft.application.MongoDBConnection;
import com.dexlock.ft.model.AccessToken;


import com.dexlock.ft.model.OTP;
import com.dexlock.ft.model.ResetPassword;
import com.dexlock.ft.model.User;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;


import com.google.gson.Gson;
import com.mongodb.BasicDBObjectBuilder;


import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;
import org.bson.Document;
import org.bson.conversions.Bson;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import javax.ws.rs.core.Response;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;


public class UserDao {
    static Gson gson = new Gson();
    private static MongoDBConnection mongoDBConnection = MongoDBConnection.getInstance();
    private static MongoDatabase db = mongoDBConnection.getDatabase();
    private static MongoCollection<Document> collectionUser = db.getCollection("User");
    private static MongoCollection<Document> collectionAccessToken = db.getCollection("AccessToken");
    private static MongoCollection<Document> collectionOTP = db.getCollection("OTP");
    BasicDBObject document = new BasicDBObject();

    public static String signUp(User userData) {
        String result = null;
        Document user = Document.parse(gson.toJson(userData));
        Document verification = collectionUser.find(new Document("userEmail", userData.getUserEmail())).first();
        if (verification == null) {
            result = "user created";
            collectionUser.insertOne(user);
        } else if (verification.size() > 0) {
            result = "Email already used";
        }
        return (result);
    }

    public HashMap<String, String> userLogin(String userEmail, String password, String userRole) {
        String obj = null;
        HashMap<String, String> send = new HashMap<>();
        List<Document> user = collectionUser.find((new Document("userEmail", userEmail)).append("password", password).append("userRole", userRole)).into(new ArrayList<Document>());
        if (user.size() < 1) {
            obj = "user not found";
            send.put("data", obj);
        } else {
            String accessToken = UUID.randomUUID().toString();
            addAccessToken(userEmail, accessToken, userRole);
            obj = "user found";
            send.put("email", userEmail);
            send.put("token", accessToken);
            send.put("role", userRole);
            send.put("data", obj);
        }
        return (send);
    }

    public static Response addAccessToken(String userEmail, String Token, String userRole) {
        Document document = collectionUser.find(new Document("userEmail", userEmail)).first();
        collectionAccessToken.insertOne(new Document("Token", Token).append("userEmail", userEmail).append("userRole", userRole).append("status","free"));
        return Response.ok().build();
    }

    public List<Document> findActiveAgent() {
        List<Document> document = collectionAccessToken.find(new Document("status", "free").append("userRole", "Agent")).into(new ArrayList<Document>());
        return document;
    }

    public static String otpGeneration(User userData) {
        String result = null;
        Document document = collectionUser.find(new Document("userEmail", userData.getUserEmail())).first();
        if (document == null) {
            result = "User not found";
        } else if (document.size() > 0) {
            Random rn = new Random();
            int num = rn.nextInt(1000000);
            collectionOTP.insertOne(new Document("userEmail", userData.getUserEmail()).append("OTP", num));
            sendMail(userData.getUserEmail(), num);
            result = "Otp created";
        }
        return (result);
    }

    private static void sendMail(String userEmail, int num) {
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
            message.setSubject("Swish: Verify it's you!");
            message.setText("Hi"
                    + "\n\n  Please verify your account using this OTP: " + num + "  which will be valid only for :");

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public String otpvalidation(OTP userData) {
        String result = "null";
        Document document = collectionOTP.find(new Document("OTP", userData.getOtp())).first();
        if (document == null) {
            result = "OTP not found";
        } else if (document.size() > 0) {
            result = "Valid OTP";
        }
        return (result);
    }

    public String changePassword(User userData) {
        Document newDocument = Document.parse(gson.toJson(userData));
        for (String name : newDocument.keySet()) {
            collectionUser.updateOne(eq("userEmail", userData.getUserEmail()), Updates.set(name, newDocument.get(name)));
        }
        return ("Password changed successfully");
    }


    public String displayUsers() {
        StringBuilder items = new StringBuilder();
        MongoCursor<Document> cursor = collectionUser.find().iterator();
        try {

            items.append("[");
            while (cursor.hasNext()) {

                items.append(cursor.next().toJson());
                if(cursor.hasNext()) {
                    items.append(",");
                }
            }
            items.append("]");
        } finally {
            cursor.close();
        }

        return items.toString();
    }
    public String deleteByName(User userData) {
        collectionUser.deleteOne(new Document("userEmail",userData.getUserEmail()));
        return "Success";
    }
    public String displayAgents(){
        BasicDBObject whereQuery = new BasicDBObject();
        whereQuery.put("userRole", "Agent" );
        StringBuilder items = new StringBuilder();
        MongoCursor<Document> cursor = collectionUser.find(whereQuery).iterator();
        try {

            items.append("[");
            while (cursor.hasNext()) {

                items.append(cursor.next().toJson());
                if(cursor.hasNext()) {
                    items.append(",");
                }
            }
            items.append("]");
        } finally {
            cursor.close();
        }

        return items.toString();
    }
    public static String deleteByAgentName(User userData) {

        collectionUser.deleteOne(new Document("userEmail", userData.getUserEmail()));
        return "Success";
    }
    public String fetchNameByEmail(User userEmail) {
        String result=null;
        Document document= collectionUser.find(new Document("userEmail", userEmail.getUserEmail())).first();
        if (document == null) {
            System.out.println("User Not found");
            result="null";
        }
        else {
            User role = gson.fromJson(document.toJson(),User.class);
            result= role.getFirstName();


        }
        return result;
    }

    public Document fetchProfile(User userEmail) {
        Document user = collectionUser.find(new Document("userEmail", userEmail.getUserEmail())).first();
        if (user != null)
            return user;
        else
            return null;
    }

    public String resetPassword(ResetPassword userData) {
        String result = "";
        Document user = collectionUser.find(new Document("userEmail", userData.getUserEmail()).append("password", userData.getPassword())).first();
        if (user != null) {
            collectionUser.updateOne(eq("userEmail", userData.getUserEmail()), Updates.set("password", userData.getNewPassword()));
            result = "Password changed successfully";
        } else {
            result = "Password doesn't match";
        }
        return (result);
    }

    public String accessTokenObject(String AccessToken) {
        Document document = collectionAccessToken.find(new Document("AccessToken", AccessToken)).first();
        if (document == null) {
            return "Not Found";
        }
        return (String) document.get("userEmail");

    }

    public String accessTokenExists() {
        Integer documentCount = Math.toIntExact(collectionAccessToken.countDocuments());
        if (documentCount == 0)
            return "user-not-logged-in";
        else
            return "user-logged-in";
    }

    public String logout(AccessToken userData) {
        String token = userData.getToken();
        collectionAccessToken.deleteOne(new Document("Token", token));
        return ("ok");
    }

    //authentication
    public boolean userExists(String token) {
        Document validUser = collectionAccessToken.find(new Document("AccessToken", token)).first();
        return true;
    }


    public AccessToken userRole(String token) {
        Document document = collectionAccessToken.find(new Document("Token", token)).first();
        AccessToken role = gson.fromJson(document.toJson(), AccessToken.class);
        return role;
    }
}
