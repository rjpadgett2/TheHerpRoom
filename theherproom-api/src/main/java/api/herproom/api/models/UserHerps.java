package api.herproom.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "user_herps")
public class UserHerps implements Serializable {

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
            name = "user_herp_id",
            unique = true,
            updatable = false,
            nullable = false
    )
    private Long user_herp_id;

    private Boolean breeder;

    private String sex;

    private String nickName;

    private Date dob;

    private Date dateAcquired;

    @CreatedDate
    @Column(name = "created_date")
    private Date createdDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "herp_id", nullable = false)
    @JsonIgnore
    private Herp herp;

    @OneToMany(mappedBy = "userHerps", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<HerpFeeders> herpFeeders;

    @OneToMany(mappedBy = "userHerps", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Length> lengths;

    @OneToMany(mappedBy = "userHerps", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Weight> weights;

    public UserHerps() {}

    public Long getId() {
        return user_herp_id;
    }

    public void setId(Long id) {
        this.user_herp_id = id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Set<HerpFeeders> getHerpFeeders() {
        return herpFeeders;
    }

    public void setHerpFeeders(Set<HerpFeeders> herpFeeders) {
        this.herpFeeders = herpFeeders;
    }

    public Set<Length> getLengths() {
        return lengths;
    }

    public void setLengths(Set<Length> lengths) {
        this.lengths = lengths;
    }

    public Set<Weight> getWeights() {
        return weights;
    }

    public void setWeights(Set<Weight> weights) {
        this.weights = weights;
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
