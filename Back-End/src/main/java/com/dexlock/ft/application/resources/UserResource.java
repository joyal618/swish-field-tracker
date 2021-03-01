package com.dexlock.ft.application.resources;

import com.dexlock.ft.dao.UserDao;
import com.dexlock.ft.model.*;

import io.dropwizard.jersey.PATCH;
import org.bson.Document;


import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

import javax.ws.rs.*;
import javax.annotation.PostConstruct;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;

@Path("/home")
public class UserResource {

    UserDao daoUser = new UserDao();

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response userLogin(User userData) {
        String userEmail = userData.getUserEmail();
        String password = userData.getPassword();
        String userRole = userData.getUserRole();

        HashMap<String, String> send = daoUser.userLogin(userEmail, password, userRole);

        return Response.ok(send).build();
    }

    @Path("/logout")
    @POST
    @Consumes
    public Response logout(AccessToken userData) {
        String send = daoUser.logout(userData);
        return Response.ok().entity(send).build();
    }

    @Path("/signup")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
//    @RolesAllowed("Customer")
    public Response signUp(User userData) {
        String addUserData = daoUser.signUp(userData);
        return Response.ok(addUserData).build();
    }
    @GET
    @Path("/user-list")
    @Produces(MediaType.APPLICATION_JSON)
    public String listTasks(){
        String displayUser = daoUser.displayUsers();
        return displayUser;
    }

    @POST
    @Path("/user-list/delete")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteUser(User userData) {
        System.out.println(userData);
        String retName = daoUser.deleteByName(userData);
        return Response.ok(retName).build();
    }
    @GET
    @Path("/agent-list")
    @Produces(MediaType.APPLICATION_JSON)
    public String listAgents(){
        String displayAgent = daoUser.displayAgents();
        return displayAgent;
    }


    @Path("/active-agent")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"Admin"})
    public Response agentLogin() {
        List<Document> activeAgent = daoUser.findActiveAgent();
        return Response.ok(activeAgent).build();
    }

//    @Path("/active-agent-sort")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.APPLICATION_JSON)
//    public List<Document> agentLoginSort(Task tasData) //taskData for sending pickup adrress,acessData for lat and lon of agent
//    {
//        List<Document> activeAgent = daoUser.findActiveAgentSort(tasData);
//        return activeAgent;
//    }


    @Path("/otp-generation")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response otpGeneration(User userData) {
        String otpResponse = daoUser.otpGeneration(userData);
        return Response.ok(otpResponse).build();
    }

    @Path("/otp-validation")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response otpValidation(OTP userData) {
        String otpResponse = daoUser.otpvalidation(userData);
        return Response.ok(otpResponse).build();
    }

    @Path("/change-password")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(User userData) {
        String result = daoUser.changePassword(userData);
        return Response.ok(result).build();
    }

    @Path("/get-name")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"Customer","Agent"})
    public Response fetchName(User user) {
        String userName = daoUser.fetchNameByEmail(user);
        return Response.ok(userName).build();
    }

    @Path("/my-profile")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

    @RolesAllowed({"Customer","Agent"})

    public Response fetchMyProfile(User user) {
        Document userProfile = daoUser.fetchProfile(user);

        return Response.ok(userProfile).build();
    }



    @POST
    @Path("/agent-list/delete")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteAgent(User userData) {
        System.out.println(userData);
        String retName = daoUser.deleteByAgentName(userData);
        return Response.ok(retName).build();
    }

    @Path("/reset-password")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

  @RolesAllowed("Customer")
    public Response resetPassword(ResetPassword user){
        String resetPassword=daoUser.resetPassword(user);

        System.out.println(resetPassword);
        return Response.ok(resetPassword).build();
    }






}

