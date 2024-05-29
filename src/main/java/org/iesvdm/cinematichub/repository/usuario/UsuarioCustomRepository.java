package org.iesvdm.cinematichub.repository.usuario;

import org.iesvdm.cinematichub.domain.Serie;
import org.iesvdm.cinematichub.domain.Usuario;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioCustomRepository {

    List<Usuario> queryCustomUsuario(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            org.springframework.data.domain.Pageable pageable
    );
}
