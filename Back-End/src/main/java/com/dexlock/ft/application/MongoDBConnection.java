package com.dexlock.ft.application;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnection {
    private static MongoDBConnection instance = null;
    private MongoClient mongoClient;
    private MongoDatabase database;

    public MongoClient getMongoClient() {
        return mongoClient;
    }

    public MongoDatabase getDatabase() {
        return database;
    }

    private MongoDBConnection() {
        this.mongoClient = new MongoClient("localhost", 27017);

        this.database = this.mongoClient.getDatabase("FieldTracker");
    }

    public static synchronized MongoDBConnection getInstance() {
        if (instance == null)
            instance = new MongoDBConnection();
        return instance;
    }
}
