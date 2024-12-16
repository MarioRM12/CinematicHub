//package org.iesvdm.cinematichub.service;
//
//import org.iesvdm.cinematichub.domain.Usuario;
//import org.iesvdm.cinematichub.repository.usuario.UsuarioRepository;
//import org.iesvdm.cinematichub.repository.usuario.UsuarioRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//// DEPRECATED - ESTE SERVICIO FUE DE PRUEBA A PRINCIPIOS DE CINEMATICHUB
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UsuarioRepository usuarioRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Usuario usuario = usuarioRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el nombre: " + username));
//
//        return org.springframework.security.core.userdetails.User
//                .withUsername(usuario.getUsername())
//                .password(usuario.getPassword()) // Asegúrate de que la contraseña esté encriptada en la base de datos
//                .authorities("ROLE_USER")
//                .build();
//    }
//}