package org.iesvdm.cinematichub.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    @EqualsAndHashCode.Include
    private Long idUsuario;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellido", nullable = false)
    private String apellido;

    @Column(name = "fecha_nacimiento")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd-MMMM-yyyy", shape = JsonFormat.Shape.STRING)
    private Date fechaNacimiento;

    @Column(name = "correo", nullable = false, unique = true)
    private String correo;

    @OneToMany(mappedBy = "usuarioCreador")
    private List<Lista> listas;
}

