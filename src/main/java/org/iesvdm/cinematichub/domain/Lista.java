package org.iesvdm.cinematichub.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "lista")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Lista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Lista")
    @EqualsAndHashCode.Include
    private Long idLista;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private Usuario usuarioCreador;

    @Column(name = "fecha_creacion")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd-MMMM-yyyy", shape = JsonFormat.Shape.STRING)
    private Date fechaCreacion;

    @ManyToMany
    @JoinTable(
            name = "lista_peliculas",
            joinColumns = @JoinColumn(name = "id_lista", referencedColumnName = "id_lista"),
            inverseJoinColumns = @JoinColumn(name = "id_pelicula", referencedColumnName = "id_pelicula"))
    private List<Pelicula> peliculas;

    @ManyToMany
    @JoinTable(
            name = "lista_series",
            joinColumns = @JoinColumn(name = "id_lista", referencedColumnName = "id_lista"),
            inverseJoinColumns = @JoinColumn(name = "id_serie", referencedColumnName = "id_serie"))
    private List<Serie> series;
}
