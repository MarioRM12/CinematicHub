package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.domain.Usuario;
import org.iesvdm.cinematichub.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

//    public List<Usuario> all(String buscar, String ordenar, Pageable pageable) {
//
//    }
//
//    public Categoria save(Categoria categoria) {
//        return this.categoriaRepository.save(categoria);
//    }
//
//    public Categoria one(Long id) {
//        return this.categoriaRepository.findById(id)
//                .orElseThrow(() -> new PeliculaNotFoundException(id));
//    }
//
//    public Categoria replace(Long id, Categoria categoria) {
//
//        return this.categoriaRepository.findById(id).map( p -> (id.equals(categoria.getId())  ?
//                        this.categoriaRepository.save(categoria) : null))
//                .orElseThrow(() -> new PeliculaNotFoundException(id));
//
//    }
//
//    public void delete(Long id) {
//        this.categoriaRepository.findById(id).map(p -> {this.categoriaRepository.delete(p);
//                    return p;})
//                .orElseThrow(() -> new PeliculaNotFoundException(id));
//    }

}
