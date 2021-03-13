package api.herproom.api.repository;

import api.herproom.api.models.UserHerps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserHerpRepository extends JpaRepository<UserHerps, Long> {
    List<UserHerps> findByHerpId(Long herp_id);

    List<UserHerps> findByUserId(Long user_id);
}
