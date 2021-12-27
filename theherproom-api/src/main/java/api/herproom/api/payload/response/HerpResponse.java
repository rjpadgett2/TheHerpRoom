package api.herproom.api.payload.response;

import api.herproom.api.models.Herp;
import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Document(indexName="name", type="herp")
public class HerpResponse implements Serializable {

    private static final long serialVersionUID = 1L;


    private Long id;

    private String name;

    @Field(type = FieldType.Nested, includeInParent = true)
    private List<Herp> herps;

    public HerpResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }


    public List<Herp> getHerps() {
        return herps;
    }

    public void setHerps(List<Herp> herps) {
        this.herps = herps;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof HerpResponse)) return false;
        HerpResponse that = (HerpResponse) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
