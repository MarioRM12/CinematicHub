package org.iesvdm.cinematichub.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pelicula")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pelicula")
    @EqualsAndHashCode.Include
    private Long idPelicula;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "imagen")
    private String imagen; // Puede almacenar la URL de la imagen

    // Almacenar la imagen en la base de datos, puedes usar un campo tipo byte[]
    // @Lob
    // private byte[] imagen;
}
