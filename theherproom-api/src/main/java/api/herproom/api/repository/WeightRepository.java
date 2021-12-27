package api.herproom.api.repository;

import api.herproom.api.models.Length;
import api.herproom.api.models.UserHerps;
import api.herproom.api.models.Weight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WeightRepository extends JpaRepository<Weight, Long> {
    List<Weight> findByUserHerps(Optional<UserHerps> userHerps);
}
