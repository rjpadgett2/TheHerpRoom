package api.herproom.api.repository;

import api.herproom.api.models.Feeders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedersRepository extends JpaRepository<Feeders, Long> {
    Optional<Feeders> findFeedersBySpecies(String species);
}
