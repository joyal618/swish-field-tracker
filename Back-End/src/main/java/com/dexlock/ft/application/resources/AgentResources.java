package com.dexlock.ft.application.resources;


import com.dexlock.ft.dao.TaskDao;
import com.dexlock.ft.dao.UserDao;
import com.dexlock.ft.model.Task;
import com.dexlock.ft.model.User;
import org.bson.Document;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/home")
public class AgentResources {

    UserDao daoUser = new UserDao();
    TaskDao daoTask = new TaskDao();





//    @Path("/agent-email")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public String returnEmail(){
//
//        String response = daoUser.accessTokenObject("d4388a2b-ff3a-4743-8f13-3337c6617567");
//        return response;
////         System.out.println(response);
//         return Response.ok(response).build();
//    }
//daoUser.accessTokenObject("d4388a2b-ff3a-4743-8f13-3337c6617567")

    @Path("/agent-task")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RolesAllowed("Agent")
    public Response returnTask(User userData){

        Document document = daoTask.returnTaskObject(userData);
        System.out.println(document);
        return Response.ok().entity(document).build();
    }


    @Path("/pickup-time-updation")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
//    @RolesAllowed("Agent")
    public Response pickUpTimeUpdation(Task taskData){
        String response= daoTask.pickUpTime(taskData);
        return Response.ok().entity(response).build();
    }


    @Path("/delivery-time-updation")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
//    @RolesAllowed("Agent")
    public Response deliveryTimeUpdation(Task taskData){
        String response= daoTask.deliveryTime(taskData);
        return Response.ok().entity(response).build();
    }

    @Path("/delivery-difficulty")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
//    @RolesAllowed("Agent")
    public Response deliveryDifficultyUpdation(Task taskData){
        String response= daoTask.deliveryDifficulty(taskData);
        return Response.ok().entity(response).build();
    }


    @POST
    @Path("/agent-past-orders")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RolesAllowed("Customer")
    public List<Document> pastOrders(User userData) {
        List<Document> pastOrders = daoTask.pastOrders(userData);
        return pastOrders;
    }
}
