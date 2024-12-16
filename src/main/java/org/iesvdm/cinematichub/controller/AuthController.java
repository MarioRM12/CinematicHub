package org.iesvdm.cinematichub.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.iesvdm.cinematichub.domain.Usuario;
import org.iesvdm.cinematichub.security.AuthenticationRequest;
import org.iesvdm.cinematichub.security.AuthenticationResponse;
import org.iesvdm.cinematichub.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.util.Date;

@RestController
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //TOKEN
    String secretKey = "claveSecreta123"; // clave secreta en Base64
    byte[] claveDecodificada = Base64.getDecoder().decode(secretKey);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        // Buscar al usuario en la base de datos
        Usuario usuario = usuarioService.findByUsername(request.getUsername())
                .orElse(null);

        // Validar credenciales
        if (usuario == null || !passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        if (usuario == null) {
            System.out.println("[DEBUG] Usuario no encontrado en la base de datos: " + request.getUsername());
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            System.out.println("[DEBUG] La contraseña no coincide para el usuario: " + request.getUsername());
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        // Generar el token JWT
        String token = Jwts.builder()
                .setSubject(usuario.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Expira en 24 horas
                .signWith(SignatureAlgorithm.HS512, claveDecodificada) // Migración lista
                .compact();
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }
}