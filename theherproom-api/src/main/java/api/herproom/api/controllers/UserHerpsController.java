package api.herproom.api.controllers;

import api.herproom.api.exceptions.NotFoundException;
import api.herproom.api.models.*;
import api.herproom.api.payload.request.UserHerpRequest;
import api.herproom.api.payload.request.HerpFeederRequest;
import api.herproom.api.payload.response.HerpFeedersResponse;
import api.herproom.api.payload.response.MessageResponse;
import api.herproom.api.payload.response.UserHerpResponse;
import api.herproom.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    FeedersRepository feedersRepository;

    @Autowired
    HerpFeedersRepository herpFeedersRepository;

    @Autowired
    LengthRepository lengthRepository;

    @Autowired
    WeightRepository weightRepository;

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

    @DeleteMapping("/herpFeeders/{herpFeederId}/{userHerpsId}")
    public ResponseEntity<?> deleteUserHerpFeeder(@PathVariable(value = "userHerpsId") long userHerpId,
                                                  @PathVariable(value = "herpFeederId") long herpFeederId) {

        if(!userHerpRepository.existsById(userHerpId)) {
            throw new NotFoundException("Herp User not found!");
        }

        return herpFeedersRepository.findById(herpFeederId)
                .map(herpsFeeders -> {
                    if(herpsFeeders.getHerpFeedersId() == herpFeederId){
                        herpFeedersRepository.delete(herpsFeeders);
                    }
                    return ResponseEntity.ok(new MessageResponse("Deleted Succesfully!"));
                }).orElseThrow(() -> new NotFoundException("Contact not found!"));
    }

    @PostMapping("/herpFeeders/{userHerpsId}")
    public ResponseEntity<?> postUserHerpFeeder(@PathVariable(value = "userHerpsId") long userHerpsId,
                                                @RequestBody HerpFeederRequest form) {
        HerpFeeders newHerpFeeders = new HerpFeeders();

        feedersRepository.findById(form.getFeeders())
                .map(feeders -> {
                    newHerpFeeders.setFeeders(feeders);
                    return newHerpFeeders;
                }).orElseThrow(() -> new NotFoundException("Feeder not found!"));

        userHerpRepository.findById(userHerpsId)
                .map(userHerp -> {
                    newHerpFeeders.setUserHerps(userHerp);
                    return newHerpFeeders;
                }).orElseThrow(() -> new NotFoundException("User Herp not found!"));

        newHerpFeeders.setCustomWeight(form.getCustomWeight());
        newHerpFeeders.setCustomLength(form.getCustomLength());
        newHerpFeeders.setCreatedDate(form.getCreatedDate());

        herpFeedersRepository.save(newHerpFeeders);

        return ResponseEntity.ok(new MessageResponse("Herp Feeder Added Succesfully!"));

    }

    @GetMapping(value = "/herpFeeders/{userHerpsId}")
    @ResponseBody
    public List<HerpFeedersResponse> getUserHerpFeeders(@PathVariable(value = "userHerpsId") long userHerpsId) {
        List<HerpFeedersResponse> userHerpFeederResponse = new ArrayList<HerpFeedersResponse>();
        if(!userHerpRepository.existsById(userHerpsId)) {
            throw new NotFoundException("User Herp not found!");
        }

        Optional<UserHerps> currentHerp = userHerpRepository.findById(userHerpsId);

         herpFeedersRepository.findByUserHerps(currentHerp).forEach( herpFeeders -> {
             HerpFeedersResponse payload = new HerpFeedersResponse(
                     herpFeeders.getHerpFeedersId(),
                     herpFeeders.getCreatedDate(),
                     herpFeeders.getCustomWeight(),
                     herpFeeders.getCustomLength(),
                     herpFeeders.getFeeders()
             );
            userHerpFeederResponse.add(payload);
        });


        return userHerpFeederResponse;
    }

    @GetMapping("/feeders")
    public ResponseEntity<List<Feeders>> getAllFeeders() {
        try {
            List<Feeders> feeders = feedersRepository.findAll();
            return new ResponseEntity<>(feeders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/herpLength/{userHerpsId}")
    public ResponseEntity<?> postUserHerpLength(@PathVariable(value = "userHerpsId") long userHerpsId,
                                                @RequestBody Length length) {
        Length newLength = new Length();

        userHerpRepository.findById(userHerpsId)
                .map(userHerp -> {
                    newLength.setUserHerps(userHerp);
                    return newLength;
                }).orElseThrow(() -> new NotFoundException("Length not found!"));

        newLength.setDate(length.getDate());
        newLength.setLength(length.getLength());

        lengthRepository.save(newLength);

        return ResponseEntity.ok(new MessageResponse("Length Added Succesfully!"));

    }

    @GetMapping("/herpLength/{userHerpsId}")
    public ResponseEntity<?> getAllUserHerpLengths(@PathVariable(value = "userHerpsId") long userHerpsId) {
        ArrayList<Length> newLengths = new ArrayList<Length>();
        if(!userHerpRepository.existsById(userHerpsId)) {
            throw new NotFoundException("User Herp not found!");
        }

        Optional<UserHerps> currentHerp = userHerpRepository.findById(userHerpsId);

        lengthRepository.findByUserHerps(currentHerp).forEach( herpLength -> {
            newLengths.add(herpLength);
        });


        return new ResponseEntity<>(newLengths, HttpStatus.OK);

    }

    @DeleteMapping("/herpLength/{herpLengthId}/{userHerpsId}")
    public ResponseEntity<?> deleteUserHerpLengths(@PathVariable(value = "userHerpsId") long userHerpId,
                                                  @PathVariable(value = "herpLengthId") long herpLengthId) {

        if(!userHerpRepository.existsById(userHerpId)) {
            throw new NotFoundException("Herp User not found!");
        }

        return lengthRepository.findById(herpLengthId)
                .map(herpsLength -> {
                    if(herpsLength.getId() == herpLengthId){
                        lengthRepository.delete(herpsLength);
                    }
                    return ResponseEntity.ok(new MessageResponse("Deleted Succesfully!"));
                }).orElseThrow(() -> new NotFoundException("Contact not found!"));
    }

    @PostMapping("/herpWeight/{userHerpsId}")
    public ResponseEntity<?> postUserHerpWeight(@PathVariable(value = "userHerpsId") long userHerpsId,
                                                @RequestBody Weight weight) {
        Weight newWeight = new Weight();

        userHerpRepository.findById(userHerpsId)
                .map(userHerp -> {
                    newWeight.setUserHerps(userHerp);
                    return newWeight;
                }).orElseThrow(() -> new NotFoundException("Weight not found!"));

        newWeight.setDate(new Date());
        newWeight.setWeight(weight.getWeight());

        weightRepository.save(newWeight);

        return ResponseEntity.ok(new MessageResponse("Weight Added Succesfully!"));

    }

    @GetMapping("/herpWeight/{userHerpsId}")
    public ResponseEntity<?> getAllUserHerpWeights(@PathVariable(value = "userHerpsId") long userHerpsId) {
        ArrayList<Weight> newWeights = new ArrayList<Weight>();
        if(!userHerpRepository.existsById(userHerpsId)) {
            throw new NotFoundException("User Herp not found!");
        }

        Optional<UserHerps> currentHerp = userHerpRepository.findById(userHerpsId);

        weightRepository.findByUserHerps(currentHerp).forEach( herpLength -> {
            newWeights.add(herpLength);
        });


        return new ResponseEntity<>(newWeights, HttpStatus.OK);

    }

    @DeleteMapping("/herpWeight/{herpWeigthtId}/{userHerpsId}")
    public ResponseEntity<?> deleteUserHerpWeight(@PathVariable(value = "userHerpsId") long userHerpId,
                                                  @PathVariable(value = "herpWeightId") long herpWeightId) {

        if(!userHerpRepository.existsById(userHerpId)) {
            throw new NotFoundException("Herp User not found!");
        }

        return weightRepository.findById(herpWeightId)
                .map(herpsWeight -> {
                    if(herpsWeight.getId() == herpWeightId){
                        weightRepository.delete(herpsWeight);
                    }
                    return ResponseEntity.ok(new MessageResponse("Deleted Succesfully!"));
                }).orElseThrow(() -> new NotFoundException("Contact not found!"));
    }


}
