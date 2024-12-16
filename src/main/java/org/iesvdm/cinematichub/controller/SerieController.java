package org.iesvdm.cinematichub.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesvdm.cinematichub.domain.Serie;
import org.iesvdm.cinematichub.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
//@CrossOrigin("http://localhost:4200/*")
@RequestMapping("/series")
public class SerieController {

    @Autowired
    private SerieService serieService;

    @GetMapping({"", "/"})
    public List<Serie> all(
            @RequestParam(required = false) String buscar,
            @RequestParam(required = false) String ordenar,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return this.serieService.all(buscar, ordenar, PageRequest.of(page, size));
    }

    @GetMapping({ "/all"})
    public List<Serie> all() {
        return this.serieService.all();
    }

    @PostMapping({"", "/"})
    public Serie newSerie(@RequestBody Serie serie) {
        return this.serieService.save(serie);
    }

    @GetMapping("/{id}")
    public Serie one(@PathVariable("id") Long id) {
        return this.serieService.one(id);
    }

    @PutMapping("/{id}")
    public Serie replaceSerie(@PathVariable("id") Long id, @RequestBody Serie serie) {
        return this.serieService.replace(id, serie);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteSerie(@PathVariable("id") Long id) {
        this.serieService.delete(id);
    }


}
