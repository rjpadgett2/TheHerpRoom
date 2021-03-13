package api.herproom.api.payload.request;

import api.herproom.api.models.Herp;

import java.util.Date;

public class UserHerpRequest {
    private Long herp;

    private Long length;

    private Long weight;

    private Date dob;

    private boolean breeder;

    private String sex;

    private Date dateAcquired;


    public Long getHerp() {
        return herp;
    }

    public void setHerp(Long herp) {
        this.herp = herp;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public boolean isBreeder() {
        return breeder;
    }

    public void setBreeder(boolean breeder) {
        this.breeder = breeder;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getDateAcquired() {
        return dateAcquired;
    }

    public void setDateAcquired(Date dateAcquired) {
        this.dateAcquired = dateAcquired;
    }
}
