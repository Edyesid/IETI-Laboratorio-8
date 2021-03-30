package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mashape.unirest.http.Unirest;
@RestController
@RequestMapping(value="/api")
public class TaskController {
    @Autowired
    ObjectMapper objectMapper;
    @PostMapping
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        try {
            Unirest.post("https://ieb9gzs6li.execute-api.us-east-1.amazonaws.com/v1/add-task")
                    .header("Content-Type", "application/json")
                    .body(objectMapper.writeValueAsString(task)).asString().getStatus();
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (UnirestException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping
    public ResponseEntity<?> getTasks() {
        try {
            String tasks = Unirest.get("https://ieb9gzs6li.execute-api.us-east-1.amazonaws.com/v1/add-task").asString().getBody();
            return new ResponseEntity<>(tasks,HttpStatus.OK);
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
