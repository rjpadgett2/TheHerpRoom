package api.herproom.api.payload.response;

import api.herproom.api.models.Herp;

import java.io.Serializable;
import java.util.Date;

public class UserHerpResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private Date createdDate;
    private Herp herp;
    private Boolean breeder;
    private String sex;

    private String nickName;
    private Date dob;
    private Date dateAcquired;

    public UserHerpResponse(Long id, Date createdDate, Herp herp, Boolean breeder, String sex, String nickName, Date dob, Date dateAcquired) {
        this.id = id;
        this.createdDate = createdDate;
        this.herp = herp;
        this.breeder = breeder;
        this.sex = sex;
        this.nickName = nickName;
        this.dob = dob;
        this.dateAcquired = dateAcquired;
    }

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

    public Herp getHerp() {
        return herp;
    }

    public void setHerp(Herp herp) {
        this.herp = herp;
    }

    public Boolean getBreeder() {
        return breeder;
    }

    public void setBreeder(Boolean breeder) {
        this.breeder = breeder;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getDateAcquired() {
        return dateAcquired;
    }

    public void setDateAcquired(Date dateAcquired) {
        this.dateAcquired = dateAcquired;
    }
}
