package org.iesvdm.cinematichub.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesvdm.cinematichub.domain.Usuario;
import org.iesvdm.cinematichub.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/Usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping({"", "/"})
    public List<Usuario> all(
            @RequestParam(required = false) String buscar,
            @RequestParam(required = false) String ordenar,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return this.usuarioService.all(buscar, ordenar, PageRequest.of(page, size));
    }

    @PostMapping({"", "/"})
    public Usuario newUsuario(@RequestBody Usuario usuario) {
        return this.usuarioService.save(usuario);
    }

    @GetMapping("/{id}")
    public Usuario one(@PathVariable("id") Long id) {
        return this.usuarioService.one(id);
    }

    @PutMapping("/{id}")
    public Usuario replaceUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
        return this.usuarioService.replace(id, usuario);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable("id") Long id) {
        this.usuarioService.delete(id);
    }

}
