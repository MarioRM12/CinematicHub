package org.iesvdm.cinematichub.repository.pelicula;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.iesvdm.cinematichub.domain.Pelicula;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PeliculaCustomRepositoryJPQLImpl implements PeliculaCustomRepository {


    @PersistenceContext
    private EntityManager em;


    @Override
    public List<Pelicula> queryCustomPelicula(
            Optional<String> buscarOptional,
            Optional<String> ordenarOptional,
            Pageable pageable
    ) {
        StringBuilder queryBuilder = new StringBuilder("SELECT p FROM Pelicula p");

        if (buscarOptional.isPresent()) {
            queryBuilder.append(" WHERE p.titulo LIKE :titulo");
        }

        if (ordenarOptional.isPresent()) {
            if ("asc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY p.titulo ASC");
            } else if ("desc".equalsIgnoreCase(ordenarOptional.get())) {
                queryBuilder.append(" ORDER BY p.titulo DESC");
            }
        }

        Query query = em.createQuery(queryBuilder.toString(), Pelicula.class);

        if (buscarOptional.isPresent()) {
            query.setParameter("titulo", "%" + buscarOptional.get() + "%");
        }

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        return query.getResultList();
    }
}
