package org.iesvdm.cinematichub.repository.serie;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.domain.Serie;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SerieCustomRepositoryJPQLImpl implements SerieCustomRepository {


    @PersistenceContext
    private EntityManager em;


    @Override
    public List<Serie> queryCustomSerie(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            Pageable pageable
    ) {
        StringBuilder queryBuilder = new StringBuilder("SELECT s FROM Serie s");

        if (buscarOptional.isPresent()) {
            queryBuilder.append(" WHERE s.titulo LIKE :titulo");
        }

        if (ordenarOptional.isPresent()) {
            if ("asc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY s.titulo ASC");
            } else if ("desc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY s.titulo DESC");
            }
        }

        Query query = em.createQuery(queryBuilder.toString(), Serie.class);

        if (buscarOptional.isPresent()) {
            query.setParameter("titulo", "%" + buscarOptional.get() + "%");
        }

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        return query.getResultList();
    }

}
