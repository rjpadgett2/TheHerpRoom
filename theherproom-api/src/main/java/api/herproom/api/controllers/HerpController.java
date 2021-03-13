package api.herproom.api.controllers;

import api.herproom.api.models.Herp;
import api.herproom.api.models.User;
import api.herproom.api.models.UserHerps;
import api.herproom.api.payload.response.HerpResponse;
import api.herproom.api.repository.HerpRepository;
import api.herproom.api.repository.UserHerpRepository;
import api.herproom.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class HerpController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    HerpRepository herpRepository;

    @GetMapping("/herps")
    public ResponseEntity<List<Herp>> getAllHerps() {
        try {
            List<Herp> herps = herpRepository.findAll();
            return new ResponseEntity<>(herps, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/herps/{id}")
    public ResponseEntity<Herp> getHerpById(@PathVariable("id") long id){
        Optional<Herp> herps = herpRepository.findById(id);
        if (herps.isPresent()) {
            return new ResponseEntity<>(herps.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/herps/{id}")
    public ResponseEntity<Herp> postHerpByUserId(@PathVariable("id") long id){
        Optional<Herp> herps = herpRepository.findById(id);
        if (herps.isPresent()) {
            return new ResponseEntity<>(herps.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/herps/search", method = RequestMethod.GET)
    @ResponseBody
    public List<HerpResponse> search(@RequestParam String term, @RequestParam String category) {
        List<HerpResponse> herps = new ArrayList<>();
        //Sear Limiters
        Pageable findFirstPage = PageRequest.of(0,10);
        switch(category) {
            case "commonName":
                herps =  herpRepository.searchByCommonName(term, findFirstPage);
                break;
            case "scientificName":
                herps = herpRepository.searchBySpecies(term, findFirstPage);
                break;
        }
        return herps;
    }


}
