package org.iesvdm.cinematichub.repository.serie;

import org.iesvdm.cinematichub.domain.Serie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {
}
