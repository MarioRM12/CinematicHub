package org.iesvdm.cinematichub.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.domain.Pelicula;
import org.iesvdm.cinematichub.service.ListaService;
import org.iesvdm.cinematichub.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("http://localhost:4200/*")
@RequestMapping("/listas")
public class ListaController {

    @Autowired
    private ListaService listaService;

    @Autowired
    private PeliculaService peliculaService;


    @GetMapping({"", "/"})
    public List<Lista> all(
            @RequestParam(required = false) String buscar,
            @RequestParam(required = false) String ordenar,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return this.listaService.all(buscar, ordenar, PageRequest.of(page, size));
    }

    @GetMapping({"/all"})
    public List<Lista> all() {
        return this.listaService.all();
    }

    @PostMapping({"", "/"})
    public Lista newLista(@RequestBody Lista lista) {
        return this.listaService.save(lista);
    }

    @GetMapping("/{id}")
    public Lista one(@PathVariable("id") Long id) {
        return this.listaService.one(id);
    }

    @PutMapping("/{id}")
    public Lista replaceLista(@PathVariable("id") Long id, @RequestBody Lista lista) {
        return this.listaService.replace(id, lista);
    }

    @PutMapping("/{id}/peliculas")
    public Lista agregarPelicula(
            @PathVariable("id") Long idLista,
            @RequestBody Pelicula pelicula) {
        return this.listaService.agregarPeliculaALista(idLista, pelicula);
    }

    @PostMapping("/{idLista}/verifica-o-crea")
    public ResponseEntity<?> verificaOCreaYAgrega(
            @PathVariable("idLista") Long idLista,
            @RequestBody Pelicula pelicula) {
        Pelicula peliculaGuardada = peliculaService.findOrCreate(pelicula);
        Lista listaActualizada = listaService.agregarPeliculaALista(idLista, peliculaGuardada);
        return ResponseEntity.ok(listaActualizada);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteLista(@PathVariable("id") Long id) {
        this.listaService.delete(id);
    }

    @DeleteMapping("/{idLista}/peliculas/{idPelicula}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarPeliculaDeLista(@PathVariable("idLista") Long idLista, @PathVariable("idPelicula") Long idPelicula) {
        this.listaService.eliminarPeliculaDeLista(idLista, idPelicula);
    }

}
