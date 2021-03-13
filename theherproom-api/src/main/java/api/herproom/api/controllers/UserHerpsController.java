package api.herproom.api.controllers;

import api.herproom.api.exceptions.NotFoundException;
import api.herproom.api.models.UserHerps;
import api.herproom.api.payload.request.UserHerpRequest;
import api.herproom.api.payload.response.MessageResponse;
import api.herproom.api.payload.response.UserHerpResponse;
import api.herproom.api.repository.HerpRepository;
import api.herproom.api.repository.UserHerpRepository;
import api.herproom.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/userHerp")
public class UserHerpsController {

    @Autowired
    UserHerpRepository userHerpRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    HerpRepository herpRepository;

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public List<UserHerpResponse> getHerpsByUserId(@PathVariable long userId) {
        List<UserHerpResponse> userHerpsResponse = new ArrayList<UserHerpResponse>();
        if(!userRepository.existsById(userId)) {
            throw new NotFoundException("User not found!");
        }

        userHerpRepository.findByUserId(userId).forEach(userHerps -> {
            UserHerpResponse payload = new UserHerpResponse(
                    userHerps.getId(),
                    userHerps.getCreatedDate(),
                    userHerps.getHerp(),
                    userHerps.getBreeder(),
                    userHerps.getSex(),
                    userHerps.getNickName(),
                    userHerps.getDob(),
                    userHerps.getDateAcquired()
            );
            userHerpsResponse.add(payload);
        });

        return userHerpsResponse;
    }

    @PostMapping("/{userId}")
    public UserHerps addUserHerp(@PathVariable long userId, @RequestBody UserHerpRequest form) {
        System.out.println(form);
        UserHerps newUserHerp = new UserHerps();
        userRepository.findById(userId)
            .map(user -> {
                newUserHerp.setUser(user);
                return newUserHerp;
            }).orElseThrow(() -> new NotFoundException("User not found!"));

        herpRepository.findById(form.getHerp())
                .map(herp -> {
                    newUserHerp.setHerp(herp);
                    return newUserHerp;
                }).orElseThrow(() -> new NotFoundException("Herp not found!"));

        newUserHerp.setCreatedDate(new Date());
        newUserHerp.setBreeder(form.isBreeder());
        newUserHerp.setDateAcquired(form.getDateAcquired());
        newUserHerp.setDob(form.getDob());
        newUserHerp.setSex(form.getSex());
        userHerpRepository.save(newUserHerp);

        return newUserHerp;
    }

    @PutMapping("/{userId}/{userHerpsId}")
    public UserHerps updateUserHerps(@PathVariable long userId,
                                       @PathVariable long userHerpsId,
                                     @RequestBody UserHerpRequest userHerpsUpdated) {
        if(!userRepository.existsById(userId)) {
            throw new NotFoundException("User not found!");
        }

        return userHerpRepository.findById(userHerpsId)
                .map(userHerps -> {
                    userHerps.setBreeder(userHerpsUpdated.isBreeder());
                    userHerps.setSex(userHerpsUpdated.getSex());
                    userHerps.setDob(userHerpsUpdated.getDob());
                    userHerps.setDateAcquired(userHerpsUpdated.getDateAcquired());
                    return userHerpRepository.save(userHerps);
                }).orElseThrow(() -> new NotFoundException("Assignment not found!"));
    }


    @DeleteMapping("/{userId}/{userHerpsId}")
    public ResponseEntity<?> deleteUserHerps(@PathVariable(value = "userId") long userId,
                                          @PathVariable(value = "userHerpsId") long userHerpsId) {
        if(!userRepository.existsById(userId)) {
            throw new NotFoundException("User not found!");
        }

        return userHerpRepository.findById(userHerpsId)
                .map(userHerps -> {
                    if(userHerps.getId() == userHerpsId){
                        userHerpRepository.delete(userHerps);
                    }
                    return ResponseEntity.ok(new MessageResponse("Deleted Succesfully!"));
                }).orElseThrow(() -> new NotFoundException("Contact not found!"));
    }




}
