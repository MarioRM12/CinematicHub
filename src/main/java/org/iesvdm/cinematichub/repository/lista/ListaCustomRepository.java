package org.iesvdm.cinematichub.repository.lista;

import org.iesvdm.cinematichub.domain.Lista;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListaCustomRepository {

    List<Lista> queryCustomLista(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            org.springframework.data.domain.Pageable pageable
    );
}
