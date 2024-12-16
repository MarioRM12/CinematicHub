package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.domain.Pelicula;
import org.iesvdm.cinematichub.exception.PeliculaNotFoundException;
import org.iesvdm.cinematichub.repository.pelicula.PeliculaCustomRepository;
import org.iesvdm.cinematichub.repository.pelicula.PeliculaCustomRepositoryJPQLImpl;
import org.iesvdm.cinematichub.repository.pelicula.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;

    @Autowired
    private PeliculaCustomRepositoryJPQLImpl peliculaCustomRepositoryJPQLImpl;


    public List<Pelicula> all() {
        return this.peliculaRepository.findAll();
    }

    public List<Pelicula> all(String buscar, String ordenar, Pageable pageable) {
        return peliculaCustomRepositoryJPQLImpl.queryCustomPelicula(
                Optional.ofNullable(buscar),
                Optional.ofNullable(ordenar),
                pageable
        );
    }

    public Pelicula save(Pelicula pelicula) {
        return this.peliculaRepository.save(pelicula);
    }

    public Pelicula one(Long id) {
        return this.peliculaRepository.findById(id)
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public Pelicula replace(Long id, Pelicula pelicula) {
        return this.peliculaRepository.findById(id).map(p -> {
            if (id.equals(pelicula.getIdPelicula())) {
                return this.peliculaRepository.save(pelicula);
            } else {
                return null;
            }
        }).orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public void delete(Long id) {
        this.peliculaRepository.findById(id).map(p -> {
            this.peliculaRepository.delete(p);
            return p;
        }).orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public Pelicula findOrCreate(Pelicula pelicula) {
        Optional<Pelicula> existente = peliculaRepository.findById(pelicula.getIdPelicula());
        return existente.orElseGet(() -> this.peliculaRepository.save(pelicula));
    }

}
