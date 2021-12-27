package api.herproom.api.repository;

import api.herproom.api.models.Herp;
import api.herproom.api.payload.response.HerpResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface HerpRepository extends JpaRepository<Herp, Long> {
    Optional<Herp> findBySpecies(String species);

    @Query(value="SELECT * FROM herps WHERE species ILIKE CONCAT(:keyword, '%')", nativeQuery = true)
    List<Object[]> searchBySpecies(@Param("keyword") String keyword, Pageable pageable);

    @Query(value="SELECT id, common_name FROM herps WHERE common_name ILIKE %:keyword%", nativeQuery = true)
    List<HerpResponse> searchByCommonName(@Param("keyword") String keyword, Pageable pageable);

}
