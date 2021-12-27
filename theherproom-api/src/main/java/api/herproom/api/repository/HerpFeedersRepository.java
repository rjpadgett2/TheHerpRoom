package api.herproom.api.repository;

import api.herproom.api.models.HerpFeeders;
import api.herproom.api.models.UserHerps;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HerpFeedersRepository extends JpaRepository<HerpFeeders, Long> {

    List<HerpFeeders> findByUserHerps(Optional<UserHerps> userHerps);

}
