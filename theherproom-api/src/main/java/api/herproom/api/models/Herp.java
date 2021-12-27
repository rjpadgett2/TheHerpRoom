package api.herproom.api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "herps")
public class Herp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String species;

    private String author;

    private String subspecies;

    private String common_name;

    private String familyetc;

    private String species_number;

    private String changes;

    @OneToMany(mappedBy = "herp", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserHerps> userHerps;


    public Herp() {}

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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSubspecies() {
        return subspecies;
    }

    public void setSubspecies(String subspecies) {
        this.subspecies = subspecies;
    }

    public String getCommon_name() {
        return common_name;
    }

    public void setCommon_name(String common_name) {
        this.common_name = common_name;
    }

    public String getFamilyetc() {
        return familyetc;
    }

    public void setFamilyetc(String familyetc) {
        this.familyetc = familyetc;
    }

    public String getSpecies_number() {
        return species_number;
    }

    public void setSpecies_number(String species_number) {
        this.species_number = species_number;
    }

    public String getChanges() {
        return changes;
    }

    public void setChanges(String changes) {
        this.changes = changes;
    }

    public Set<UserHerps> getUserHerps() {
        return userHerps;
    }

    public void setUserHerps(Set<UserHerps> userHerps) {
        this.userHerps = userHerps;
    }

}
