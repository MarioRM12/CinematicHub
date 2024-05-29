package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.domain.Serie;
import org.iesvdm.cinematichub.exception.SerieNotFoundException;
import org.iesvdm.cinematichub.repository.serie.SerieCustomRepositoryJPQLImpl;
import org.iesvdm.cinematichub.repository.serie.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SerieService {

    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private SerieCustomRepositoryJPQLImpl serieCustomRepositoryJPQLImpl;

    public List<Serie> all() {
        return this.serieRepository.findAll();
    }

    public List<Serie> all(String buscar, String ordenar, Pageable pageable) {
        return serieCustomRepositoryJPQLImpl.queryCustomSerie(
                Optional.ofNullable(buscar),
                Optional.ofNullable(ordenar),
                pageable
        );
    }

    public Serie save(Serie serie) {
        return this.serieRepository.save(serie);
    }

    public Serie one(Long id) {
        return this.serieRepository.findById(id)
                .orElseThrow(() -> new SerieNotFoundException(id));
    }

    public Serie replace(Long id, Serie serie) {
        return this.serieRepository.findById(id).map(s -> {
            if (id.equals(serie.getIdSerie())) {
                return this.serieRepository.save(serie);
            } else {
                return null;
            }
        }).orElseThrow(() -> new SerieNotFoundException(id));
    }

    public void delete(Long id) {
        this.serieRepository.findById(id).map(s -> {
            this.serieRepository.delete(s);
            return s;
        }).orElseThrow(() -> new SerieNotFoundException(id));
    }

}
