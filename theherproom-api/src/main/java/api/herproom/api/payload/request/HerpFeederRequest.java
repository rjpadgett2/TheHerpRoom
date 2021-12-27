package api.herproom.api.payload.request;

import api.herproom.api.models.Feeders;
import api.herproom.api.models.UserHerps;

import java.util.Date;

public class HerpFeederRequest {

    private static final long serialVersionUID = 1L;

    private Date createdDate;
    private float customWeight;
    private float customLength;

    private Long userHerps;
    private Long feeders;

    public HerpFeederRequest(Date createdDate, float customWeight, float customLength, Long userHerps, Long feeders) {
        this.createdDate = createdDate;
        this.customWeight = customWeight;
        this.customLength = customLength;
        this.userHerps = userHerps;
        this.feeders = feeders;
    }

    public Long getUserHerps() {
        return userHerps;
    }

    public void setUserHerps(Long userHerps) {
        this.userHerps = userHerps;
    }

    public Long getFeeders() {
        return feeders;
    }

    public void setFeeders(Long feeders) {
        this.feeders = feeders;
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



}
