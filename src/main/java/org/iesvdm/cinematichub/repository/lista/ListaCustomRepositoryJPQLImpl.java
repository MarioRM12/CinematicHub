package org.iesvdm.cinematichub.repository.lista;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.iesvdm.cinematichub.domain.Lista;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ListaCustomRepositoryJPQLImpl implements ListaCustomRepository {


    @PersistenceContext
    private EntityManager em;


    @Override
    public List<Lista> queryCustomLista(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            Pageable pageable
    ) {
        StringBuilder queryBuilder = new StringBuilder("SELECT l FROM Lista l");

        if (buscarOptional.isPresent()) {
            queryBuilder.append(" WHERE l.usuarioCreador.nombre LIKE :nombre");
        }

        if (ordenarOptional.isPresent()) {
            if ("asc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY l.fechaCreacion ASC");
            } else if ("desc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY l.fechaCreacion DESC");
            }
        }

        Query query = em.createQuery(queryBuilder.toString(), Lista.class);

        if (buscarOptional.isPresent()) {
            query.setParameter("nombre", "%" + buscarOptional.get() + "%");
        }

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        return query.getResultList();
    }
}
