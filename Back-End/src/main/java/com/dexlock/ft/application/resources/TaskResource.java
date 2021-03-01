package com.dexlock.ft.application.resources;

import com.dexlock.ft.dao.TaskDao;
import com.dexlock.ft.model.AccessToken;
import com.dexlock.ft.model.Task;
import com.dexlock.ft.model.User;
import io.dropwizard.auth.Auth;
import org.bson.Document;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

import javax.annotation.PostConstruct;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.List;

@Path("/home")
public class TaskResource {

    TaskDao daoTask = new TaskDao();

    @POST
    @Path("/file-upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @RolesAllowed("Customer")
    public Response addFile(@FormDataParam("file") InputStream fileInputStream,
                            @FormDataParam("file") FormDataContentDisposition fileMetaData) throws IOException {

        String response = daoTask.imageTaskRequest(fileInputStream, fileMetaData);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @POST
    @Path("/task-submit")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("Customer")
    public Response addFile(Task taskData) {
        String response = daoTask.detailsAppendRequest(taskData);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @Path("/user-text-task-submit")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("Customer")
    public Response addTextTask(Task taskData) {
        String textTask = daoTask.textTaskRequest(taskData);
        return Response.ok(textTask).build();
    }
    @POST
    @Path("/active-tasks")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("Customer")
    public List<Document> tasksActive( Task taskData){
        List<Document> activeTask = daoTask.activeTask(taskData);
        return activeTask;
    }

    @Path("/price-calculation")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("Customer")
    public Response priceCalculation(Task taskData) {
        Integer fare = daoTask.fareCalculation(taskData);
        return Response.ok(fare).build();
    }

    @POST
    @Path("/task-update")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("Admin")
    public String taskUpdate(Task taskData){



        String updateTask = daoTask.updateTasksForAgent(taskData);
        return updateTask;
    }

    @GET
    @Path("/assigned-tasks")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("Admin")
    public List<Document> tasksAssignedFiltering() {
        List<Document> assignedTask = daoTask.AssignedTasksFiltering();
        return assignedTask;
    }

    @GET
    @Path("/unassigned-tasks")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("Admin")
    public List<Document> tasksUnassignedFiltering() {
        List<Document> unassignedTask = daoTask.UnassignedTasksFiltering();
        return unassignedTask;
    }





    @POST
    @Path("/delivered-tasks")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("Customer")
    public List<Document> taskDelivered(User userData) {
        List<Document> deliveredTask = daoTask.deliveredTask(userData);
        return deliveredTask;
    }

    @POST
    @Path("/agent-number")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("Admin")
    public String phoneNumberAgent(User userData){



        String unassignedTask = daoTask.agentPhoneNumber(userData);
        return unassignedTask;
    }


    @POST
    @Path("/download-image")
    @PermitAll
    public Response downloadAPK(Task taskData) {
        {
            String fileLocation = taskData.getFileAttachment();
            Response response = null;
            NumberFormat myFormat = NumberFormat.getInstance();
            myFormat.setGroupingUsed(true);

            // Retrieve the file
            File file = new File(fileLocation);
            if (file.exists()) {
                Response.ResponseBuilder builder = Response.ok(file);
                builder.header("Content-Disposition", "attachment; filename=" + file.getName());
                response = builder.build();

                long file_size = file.length();
                System.out.println(String.format("Inside downloadFile==> fileName: %s, fileSize: %s bytes",
                        fileLocation, myFormat.format(file_size)));

            } else {
                System.out.println(String.format("Inside downloadFile==> FILE NOT FOUND: fileName: %s",
                        fileLocation));

                response = Response.status(404).
                        entity("FILE NOT FOUND: " + fileLocation).
                        type("text/plain").
                        build();
            }

            return response;
        }
    }

}
