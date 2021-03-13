package api.herproom.api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "feeders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Feeders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "feeders", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<HerpFeeders> herpFeeders;

    private String species;

    private String commonName;

    private float weight;

    private float crudeProtein;

    private float crudeFat;

    private float ash;

    private float length;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public HerpFeeders getHerpFeeders() {
//        return herpFeeders;
//    }
//
//    public void setHerpFeeders(HerpFeeders herpFeeders) {
//        this.herpFeeders = herpFeeders;
//    }


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

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getCrudeProtein() {
        return crudeProtein;
    }

    public void setCrudeProtein(float crudeProtein) {
        this.crudeProtein = crudeProtein;
    }

    public float getCrudeFat() {
        return crudeFat;
    }

    public void setCrudeFat(float crudeFat) {
        this.crudeFat = crudeFat;
    }

    public float getAsh() {
        return ash;
    }

    public void setAsh(float ash) {
        this.ash = ash;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }
}
