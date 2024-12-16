package org.iesvdm.cinematichub.service;

import jakarta.mail.internet.MimeMessage;
import org.iesvdm.cinematichub.domain.Lista;
import org.iesvdm.cinematichub.domain.Usuario;
import org.iesvdm.cinematichub.exception.UsuarioNotFoundException;
import org.iesvdm.cinematichub.repository.usuario.UsuarioCustomRepositoryJPQLImpl;
import org.iesvdm.cinematichub.repository.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UsuarioCustomRepositoryJPQLImpl usuarioCustomRepositoryJPQLImpl;
//    @Autowired
//    private JavaMailSender mailSender;

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

    /**
     * Registra un nuevo usuario en la base de datos.
     *
     * @param usuario El usuario a registrar.
     * @return El usuario registrado.
     * @throws IllegalArgumentException Si el nombre de usuario o el correo ya existen.
     */
    public Usuario registrarUsuario(Usuario usuario) {
        // Verificación para evitar duplicados de username o correo
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new IllegalArgumentException("El correo ya existe");
        }

        // Asignar el rol USER de forma predeterminada si no se proporcionó
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USER");
        }

        // Encriptar la contraseña
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        // Crear la lista "watchlist" y asociarla al usuario
        Lista watchlist = new Lista();
        watchlist.setNombre("watchlist");
        watchlist.setUsuarioCreador(usuario);

        // Añadir la lista al usuario
        usuario.setListas(List.of(watchlist)); // Aseguramos que siempre tenga una lista llamada "watchlist"

        // Guardar el usuario en la base de datos
        Usuario nuevoUsuario = usuarioRepository.save(usuario);

        // Enviar correo de bienvenida
        //enviarCorreo(nuevoUsuario.getCorreo(), "Bienvenido", "Gracias por registrarte.");

        return nuevoUsuario;
    }

    public Optional<Usuario> findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }


//    private void enviarCorreo(String destinatario, String asunto, String cuerpo) {
//        try {
//            MimeMessage mensaje = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);
//            helper.setTo(destinatario);
//            helper.setSubject(asunto);
//            helper.setText(cuerpo, true);
//            mailSender.send(mensaje);
//        } catch (Exception e) {
//            throw new RuntimeException("Error al enviar el correo", e);
//        }
//    }



}
