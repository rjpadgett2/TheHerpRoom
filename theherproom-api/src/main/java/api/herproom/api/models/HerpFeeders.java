package api.herproom.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "herp_feeders")
public class HerpFeeders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "entity_id_seq"
    )
    @SequenceGenerator(
            name = "entity_id_seq",
            sequenceName = "global_id_sequence",
            allocationSize = 1
    )
    @Column(
            name = "herp_feeders_id",
            unique = true,
            updatable = false,
            nullable = false
    )
    private Long herp_feeders_id;


    private float customWeight;

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    private float customLength;

    @CreatedDate
    @Column(name = "created_date")
    private Date createdDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_herp_id", nullable = false)
    @JsonIgnore
    private UserHerps userHerps;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "feeders_id", nullable = false)
    @JsonIgnore
    private Feeders feeders;

    public Long getHerpFeedersId() {
        return herp_feeders_id;
    }

    public void setHerpFeedersId(Long herp_feeders_id) {
        this.herp_feeders_id = herp_feeders_id;
    }

    public float getCustomWeight() {
        return customWeight;
    }

    public void setCustomWeight(float customWeight) {
        this.customWeight = customWeight;
    }

    public Feeders getFeeders() {
        return feeders;
    }

    public void setFeeders(Feeders feeders) {
        this.feeders = feeders;
    }

    public float getCustomLength() {
        return customLength;
    }

    public void setCustomLength(float customLength) {
        this.customLength = customLength;
    }


    public UserHerps getUserHerps() {
        return userHerps;
    }

    public void setUserHerps(UserHerps userHerps) {
        this.userHerps = userHerps;
    }
}
