package com.dexlock.ft.application;

import io.dropwizard.Configuration;

public class ApplicationConfig extends Configuration
{
    private String mongoHost ="localhost";
    private Integer mongoPort=27017;
    private String mongoDB= "Task";


    public String getMongoHost() {
        return mongoHost;
    }

    public Integer getMongoPort() {
        return mongoPort;
    }

    public String getMongoDB() {
        return mongoDB;
    }
}
