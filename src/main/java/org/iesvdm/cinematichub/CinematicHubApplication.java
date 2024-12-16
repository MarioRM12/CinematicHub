package org.iesvdm.cinematichub;

import org.iesvdm.cinematichub.domain.Usuario;
import org.iesvdm.cinematichub.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CinematicHubApplication {
    //@Autowired
    //private UsuarioService usuarioService;

    public static void main(String[] args) {
        SpringApplication.run(CinematicHubApplication.class, args);
    }

}
