package org.iesvdm.cinematichub.repository.usuario;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.iesvdm.cinematichub.domain.Serie;
import org.iesvdm.cinematichub.domain.Usuario;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuarioCustomRepositoryJPQLImpl implements UsuarioCustomRepository {


    @PersistenceContext
    private EntityManager em;


    @Override
    public List<Usuario> queryCustomUsuario(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            Pageable pageable
    ) {
        StringBuilder queryBuilder = new StringBuilder("SELECT u FROM Usuario u");

        if (buscarOptional.isPresent()) {
            queryBuilder.append(" WHERE u.username LIKE :username OR u.nombre LIKE :nombre");
        }

        if (ordenarOptional.isPresent()) {
            if ("asc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY u.username ASC");
            } else if ("desc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY u.username DESC");
            }
        }

        Query query = em.createQuery(queryBuilder.toString(), Usuario.class);

        if (buscarOptional.isPresent()) {
            query.setParameter("username", "%" + buscarOptional.get() + "%");
            query.setParameter("nombre", "%" + buscarOptional.get() + "%");
        }

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        return query.getResultList();
    }

}
