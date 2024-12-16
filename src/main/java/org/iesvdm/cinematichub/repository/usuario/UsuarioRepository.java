package org.iesvdm.cinematichub.repository.usuario;

import org.iesvdm.cinematichub.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);

    Optional<Object> findByCorreo(String correo);
}
