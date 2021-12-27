package api.herproom.api.repository;
import api.herproom.api.models.Length;
import api.herproom.api.models.UserHerps;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LengthRepository extends JpaRepository<Length, Long> {
    List<Length> findByUserHerps(Optional<UserHerps> userHerps);
}
