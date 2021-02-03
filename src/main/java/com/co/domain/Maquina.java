package com.co.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Maquina.
 */
@Entity
@Table(name = "maquina")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Maquina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "cantidad_juegos")
    private Integer cantidadJuegos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public Maquina modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getCantidadJuegos() {
        return cantidadJuegos;
    }

    public Maquina cantidadJuegos(Integer cantidadJuegos) {
        this.cantidadJuegos = cantidadJuegos;
        return this;
    }

    public void setCantidadJuegos(Integer cantidadJuegos) {
        this.cantidadJuegos = cantidadJuegos;
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
        Maquina maquina = (Maquina) o;
        if (maquina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), maquina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Maquina{" +
            "id=" + getId() +
            ", modelo='" + getModelo() + "'" +
            ", cantidadJuegos=" + getCantidadJuegos() +
            "}";
    }
}
