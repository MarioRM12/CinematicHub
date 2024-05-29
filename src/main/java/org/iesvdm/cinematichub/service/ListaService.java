package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.exception.PeliculaNotFoundException;
import org.iesvdm.cinematichub.repository.lista.ListaCustomRepositoryJPQLImpl;
import org.iesvdm.cinematichub.repository.lista.ListaRepository;
import org.iesvdm.cinematichub.repository.pelicula.PeliculaRepository;
import org.iesvdm.cinematichub.repository.serie.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ListaService {

    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private ListaCustomRepositoryJPQLImpl listaCustomRepositoryJPQLImpl;

    public List<Lista> all() {
        return this.listaRepository.findAll();
    }

    public List<Lista> all(String buscar, String ordenar, Pageable pageable) {
        return listaCustomRepositoryJPQLImpl.queryCustomLista(
                Optional.ofNullable(buscar),
                Optional.ofNullable(ordenar),
                pageable
        );
    }

    public Lista save(Lista lista) {
        return this.listaRepository.save(lista);
    }

    public Lista one(Long id) {
        return this.listaRepository.findById(id)
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public Lista replace(Long id, Lista lista) {
        return this.listaRepository.findById(id).map(l -> (id.equals(lista.getIdLista()) ?
                        this.listaRepository.save(lista) : null))
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public void delete(Long id) {
        this.listaRepository.findById(id).map(l -> {
                    this.listaRepository.delete(l);
                    return l;
                })
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

}
