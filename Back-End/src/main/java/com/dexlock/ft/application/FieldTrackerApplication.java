package com.dexlock.ft.application;

import com.dexlock.ft.application.resources.AgentResources;
import com.dexlock.ft.application.resources.CORSFilter;
import com.dexlock.ft.application.resources.TaskResource;
import com.dexlock.ft.application.resources.UserResource;
import com.dexlock.ft.model.AccessToken;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.oauth.OAuthCredentialAuthFilter;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

public class FieldTrackerApplication extends Application<ApplicationConfig> {
    public void run(ApplicationConfig applicationConfig, Environment environment) {
        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);
        // Configure CORS parameters
        environment.servlets()
                .addFilter("CORSFilter", new CORSFilter())
                .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
        //Register Resources
        environment.jersey().register(MultiPartFeature.class);
        environment.jersey().register(new UserResource());
        environment.jersey().register(new TaskResource());
        environment.jersey().register(new AgentResources());
        environment.jersey().register(new AuthDynamicFeature(
                new OAuthCredentialAuthFilter.Builder<AccessToken>()
                        .setAuthenticator(new APIAuthenticator())
                        .setAuthorizer(new APIAuthorizer())
                        .setPrefix("Bearer")
                        .buildAuthFilter()));
        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(AccessToken.class));
    }

    @Override
    public void initialize(Bootstrap<ApplicationConfig> bootstrap) {
        super.initialize(bootstrap);
    }




    public static void main(String[] args) throws Exception {
        Logger logger = LoggerFactory.getLogger(FieldTrackerApplication.class);
        logger.trace("Hello");
        logger.debug("Hello");
        logger.info("Hello");
        logger.warn("Hello");
        logger.error("Hello");
        new FieldTrackerApplication().run(args);
    }

}
