package com.comarketia.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario; // Cambiado de Long a Integer

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false, length = 50)
    private String apellido;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(length = 20)
    private String telefono;

    @Column(name = "carnet_universitario", nullable = false, unique = true, length = 20)
    private String carnetUniversitario;

    @Column(nullable = false, length = 100)
    private String universidad;

    @Column(name = "id_rol", nullable = false)
    private Integer idRol;

    @Column(length = 20)
    private String estado = "ACTIVO";

    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    // Constructores
    public Usuario() {}

    // Getters y Setters
    public Integer getIdUsuario() { return idUsuario; } // Cambiado a Integer
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; } // Cambiado a Integer

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getCarnetUniversitario() { return carnetUniversitario; }
    public void setCarnetUniversitario(String carnetUniversitario) { this.carnetUniversitario = carnetUniversitario; }

    public String getUniversidad() { return universidad; }
    public void setUniversidad(String universidad) { this.universidad = universidad; }

    public Integer getIdRol() { return idRol; }
    public void setIdRol(Integer idRol) { this.idRol = idRol; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}