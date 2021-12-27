package api.herproom.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "feeders")
public class Feeders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String species;

    private String commonName;
    @JsonIgnore
    private Float weight;

    private Float crudeProtein;

    private Float crudeFat;

    private Float ash;

    private Float energy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public float getCrudeProtein() {
        return crudeProtein;
    }

    public void setCrudeProtein(Float crudeProtein) {
        this.crudeProtein = crudeProtein;
    }

    public float getCrudeFat() {
        return crudeFat;
    }

    public void setCrudeFat(Float crudeFat) {
        this.crudeFat = crudeFat;
    }

    public float getAsh() {
        return ash;
    }

    public void setAsh(Float ash) {
        this.ash = ash;
    }

    public float getEnergy() {
        return energy;
    }

    public void setEnergy(Float length) {
        this.energy = energy;
    }
}
