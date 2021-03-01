package com.dexlock.ft.application;

import com.dexlock.ft.model.AccessToken;
import io.dropwizard.auth.Authorizer;

public class APIAuthorizer implements Authorizer<AccessToken> {
    @Override
    public boolean authorize(AccessToken user, String s) {

        return user.getUserRole().equals(s);
    }


}