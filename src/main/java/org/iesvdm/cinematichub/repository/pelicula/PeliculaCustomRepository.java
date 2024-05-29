package org.iesvdm.cinematichub.repository.pelicula;

import org.iesvdm.cinematichub.domain.Pelicula;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PeliculaCustomRepository {

    List<Pelicula> queryCustomPelicula(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            org.springframework.data.domain.Pageable pageable
    );
}
