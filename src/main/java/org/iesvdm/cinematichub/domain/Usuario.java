package org.iesvdm.cinematichub.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name="usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private long idUsuario;

    private String username;

    private String nombre;

    private String apellido;

    @Column(name = "fecha_lanzamiento")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date fechaNacimiento;

}
