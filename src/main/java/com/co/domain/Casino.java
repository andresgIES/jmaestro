package com.co.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Casino.
 */
@Entity
@Table(name = "casino")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Casino implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "cantidad_maquinas")
    private Integer cantidadMaquinas;

    @OneToOne
    @JoinColumn(unique = true)
    private Maquina maquina;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Casino nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public Casino direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Integer getCantidadMaquinas() {
        return cantidadMaquinas;
    }

    public Casino cantidadMaquinas(Integer cantidadMaquinas) {
        this.cantidadMaquinas = cantidadMaquinas;
        return this;
    }

    public void setCantidadMaquinas(Integer cantidadMaquinas) {
        this.cantidadMaquinas = cantidadMaquinas;
    }

    public Maquina getMaquina() {
        return maquina;
    }

    public Casino maquina(Maquina maquina) {
        this.maquina = maquina;
        return this;
    }

    public void setMaquina(Maquina maquina) {
        this.maquina = maquina;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Casino casino = (Casino) o;
        if (casino.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), casino.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Casino{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", cantidadMaquinas=" + getCantidadMaquinas() +
            "}";
    }
}
