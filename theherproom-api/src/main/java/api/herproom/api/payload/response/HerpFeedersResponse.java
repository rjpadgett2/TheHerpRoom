package api.herproom.api.payload.response;

import api.herproom.api.models.Feeders;

import java.io.Serializable;
import java.util.Date;

public class HerpFeedersResponse implements Serializable {

    private static final long serialVersionUID = 1L;



    private Long id;
    private Date createdDate;
    private float customWeight;

    public HerpFeedersResponse(Long id, Date createdDate, float customWeight, float customLength, Feeders feeder) {
        this.id = id;
        this.createdDate = createdDate;
        this.customWeight = customWeight;
        this.customLength = customLength;
        this.feeder = feeder;
    }

    private float customLength;
    private Feeders feeder;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public float getCustomWeight() {
        return customWeight;
    }

    public void setCustomWeight(float customWeight) {
        this.customWeight = customWeight;
    }

    public float getCustomLength() {
        return customLength;
    }

    public void setCustomLength(float customLength) {
        this.customLength = customLength;
    }

    public Feeders getFeeder() {
        return feeder;
    }

    public void setFeeder(Feeders feeder) {
        this.feeder = feeder;
    }

}
