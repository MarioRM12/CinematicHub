package org.iesvdm.cinematichub.repository.serie;

import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.domain.Serie;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SerieCustomRepository {

    List<Serie> queryCustomSerie(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            org.springframework.data.domain.Pageable pageable
    );
}
