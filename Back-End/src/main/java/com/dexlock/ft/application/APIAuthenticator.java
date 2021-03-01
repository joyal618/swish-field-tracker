package com.dexlock.ft.application;


import com.dexlock.ft.dao.UserDao;
import com.dexlock.ft.model.AccessToken;
import io.dropwizard.auth.Authenticator;

import java.util.Optional;

public class APIAuthenticator implements Authenticator<String, AccessToken> {
    UserDao userDao= new UserDao();
    public Optional<AccessToken> authenticate(String token) {
        if(userDao.userExists(token)){
            return Optional.of(userDao.userRole(token));
        }
        else
            return Optional.empty();
    }
}

