package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.domain.Usuario;
import org.iesvdm.cinematichub.exception.UsuarioNotFoundException;
import org.iesvdm.cinematichub.repository.usuario.UsuarioCustomRepositoryJPQLImpl;
import org.iesvdm.cinematichub.repository.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioCustomRepositoryJPQLImpl usuarioCustomRepositoryJPQLImpl;

    public List<Usuario> all() {
        return this.usuarioRepository.findAll();
    }

    public List<Usuario> all(String buscar, String ordenar, Pageable pageable) {
        return usuarioCustomRepositoryJPQLImpl.queryCustomUsuario(
                Optional.ofNullable(buscar),
                Optional.ofNullable(ordenar),
                pageable
        );
    }

    public Usuario save(Usuario usuario) {
        return this.usuarioRepository.save(usuario);
    }

    public Usuario one(Long id) {
        return this.usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public Usuario replace(Long id, Usuario usuario) {
        return this.usuarioRepository.findById(id).map(u -> {
            if (id.equals(usuario.getIdUsuario())) {
                return this.usuarioRepository.save(usuario);
            } else {
                return null;
            }
        }).orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public void delete(Long id) {
        this.usuarioRepository.findById(id).map(u -> {
            this.usuarioRepository.delete(u);
            return u;
        }).orElseThrow(() -> new UsuarioNotFoundException(id));
    }

}
