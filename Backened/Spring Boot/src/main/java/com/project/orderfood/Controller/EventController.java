package com.project.orderfood.Controller;

import com.project.orderfood.DTO.EventResponse;
import com.project.orderfood.Model.Event;
import com.project.orderfood.Repository.EventRepo;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class EventController {

    private final EventRepo eventRepo;

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @DeleteMapping("/admin/events/{id}")
    public EventResponse deleteEvent(@PathVariable long id) {
        EventResponse eventResponse = new EventResponse();
        try{
            eventRepo.deleteById(id);
            eventResponse.setMessage("Event successfully deleted");
        }catch (Exception e){
            eventResponse.setMessage(e.getMessage());
        }
        return eventResponse;
    }
}
