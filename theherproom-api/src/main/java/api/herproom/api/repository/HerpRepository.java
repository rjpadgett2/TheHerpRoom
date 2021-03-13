package api.herproom.api.repository;

import api.herproom.api.models.Herp;
import api.herproom.api.payload.response.HerpResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface HerpRepository extends JpaRepository<Herp, Long> {
    Optional<Herp> findBySpecies(String species);

    @Query("SELECT new api.herproom.api.payload.response.HerpResponse(id, species) FROM Herp where species like %:keyword%")
    List<HerpResponse> searchBySpecies(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT new api.herproom.api.payload.response.HerpResponse(id, common_name) FROM Herp where common_name like %:keyword%")
    List<HerpResponse> searchByCommonName(@Param("keyword") String keyword, Pageable pageable);
}
