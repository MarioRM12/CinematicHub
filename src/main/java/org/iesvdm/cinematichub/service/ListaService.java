package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.domain.Pelicula;
import org.iesvdm.cinematichub.exception.ListaNotFoundException;
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

    public Lista agregarPeliculaALista(Long idLista, Pelicula pelicula) {
        return this.listaRepository.findById(idLista).map(lista -> {
            lista.getPeliculas().add(pelicula); // Asumiendo que existe una relación con películas
            return this.listaRepository.save(lista);
        }).orElseThrow(() -> new ListaNotFoundException(idLista)); // Manejo de error para listas no encontradas
    }

    public void eliminarPeliculaDeLista(Long idLista, Long idPelicula) {
        listaRepository.findById(idLista).map(lista -> {
            lista.getPeliculas().removeIf(pelicula -> pelicula.getIdPelicula().equals(idPelicula));
            listaRepository.save(lista);
            return lista;
        }).orElseThrow(() -> new ListaNotFoundException(idLista));
    }
}
