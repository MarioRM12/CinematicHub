package org.iesvdm.cinematichub.repository.usuario;

import org.iesvdm.cinematichub.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
