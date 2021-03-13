package api.herproom.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "herp_feeders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class HerpFeeders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float weight;

    private float length;

    private String commonName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_herp_id", nullable = false)
    @JsonIgnore
    private UserHerps userHerps;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "feeders_id", nullable = false)
    @JsonIgnore
    private Feeders feeders;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

//    public Feeders getFeeders() {
//        return feeders;
//    }
//
//    public void setFeeders(Feeders feeders) {
//        this.feeders = feeders;
//    }

    public UserHerps getUserHerps() {
        return userHerps;
    }

    public void setUserHerps(UserHerps userHerps) {
        this.userHerps = userHerps;
    }
}
