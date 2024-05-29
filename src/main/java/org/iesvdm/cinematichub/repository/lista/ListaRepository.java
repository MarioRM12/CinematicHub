package org.iesvdm.cinematichub.repository.lista;

import org.iesvdm.cinematichub.domain.Lista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {
}
