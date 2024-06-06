package org.iesvdm.cinematichub.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.service.ListaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/listas")
public class ListaController {

    @Autowired
    private ListaService listaService;


    @GetMapping({"", "/"})
    public List<Lista> all(
            @RequestParam(required = false) String buscar,
            @RequestParam(required = false) String ordenar,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return this.listaService.all(buscar, ordenar, PageRequest.of(page, size));
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

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteLista(@PathVariable("id") Long id) {
        this.listaService.delete(id);
    }

}
