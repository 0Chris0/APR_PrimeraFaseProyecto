-- BASE DE DATOS --
CREATE TABLE IF NOT EXISTS roles (
id_rol SERIAL PRIMARY KEY,
nombre_rol VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
id_usuario SERIAL PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
telefono VARCHAR(20),
carnet_universitario VARCHAR(20) NOT NULL UNIQUE,
universidad VARCHAR(100) NOT NULL,
id_rol INT NOT NULL REFERENCES roles(id_rol),
estado VARCHAR(20) DEFAULT 'ACTIVO',
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS perfiles_emprendimiento (
id_perfil SERIAL PRIMARY KEY,
id_usuario INT UNIQUE NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
nombre_emprendimiento VARCHAR(100) NOT NULL,
descripcion TEXT,
rubro VARCHAR(50) NOT NULL,
logo_url TEXT,
whatsapp_contacto VARCHAR(20),
instagram_url TEXT,
facebook_url TEXT
);

CREATE TABLE IF NOT EXISTS planes (
id_plan SERIAL PRIMARY KEY,
nombre_plan VARCHAR(30) NOT NULL UNIQUE,
precio_mensual NUMERIC(8,2) NOT NULL,
limite_productos INT NOT NULL,
acceso_ferias_presenciales BOOLEAN DEFAULT FALSE,
destacar_productos BOOLEAN DEFAULT FALSE,
acceso_asesorias BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS suscripciones (
id_suscripcion SERIAL PRIMARY KEY,
id_perfil INT NOT NULL REFERENCES perfiles_emprendimiento(id_perfil),
id_plan INT NOT NULL REFERENCES planes(id_plan),
fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fecha_fin TIMESTAMP NOT NULL,
estado VARCHAR(20) DEFAULT 'ACTIVA'
);

CREATE TABLE IF NOT EXISTS historial_pagos (
id_pago SERIAL PRIMARY KEY,
id_suscripcion INT NOT NULL REFERENCES suscripciones(id_suscripcion),
monto NUMERIC(8,2) NOT NULL,
fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
metodo_pago VARCHAR(30) NOT NULL,
comprobante_url TEXT,
estado_pago VARCHAR(20) DEFAULT 'APROBADO'
);

CREATE TABLE IF NOT EXISTS categorias (
id_categoria SERIAL PRIMARY KEY,
nombre_categoria VARCHAR(50) NOT NULL UNIQUE,
descripcion TEXT
);

CREATE TABLE IF NOT EXISTS productos_servicios (
id_producto SERIAL PRIMARY KEY,
id_perfil INT NOT NULL REFERENCES perfiles_emprendimiento(id_perfil) ON DELETE CASCADE,
id_categoria INT NOT NULL REFERENCES categorias(id_categoria),
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
precio NUMERIC(8,2) NOT NULL,
stock INT DEFAULT 0,
tipo VARCHAR(20) CHECK (tipo IN ('PRODUCTO', 'SERVICIO')),
es_destacado BOOLEAN DEFAULT FALSE,
estado VARCHAR(20) DEFAULT 'ACTIVO'
);

CREATE TABLE IF NOT EXISTS imagenes_producto (
id_imagen SERIAL PRIMARY KEY,
id_producto INT NOT NULL REFERENCES productos_servicios(id_producto) ON DELETE CASCADE,
imagen_url TEXT NOT NULL,
es_principal BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ferias_eventos (
id_evento SERIAL PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
descripcion TEXT,
universidad_sede VARCHAR(100) NOT NULL,
ubicacion_exacta VARCHAR(150),
fecha_inicio TIMESTAMP NOT NULL,
fecha_fin TIMESTAMP NOT NULL,
cupos_disponibles INT NOT NULL,
estado VARCHAR(20) DEFAULT 'PROGRAMADO'
);

CREATE TABLE IF NOT EXISTS inscripciones_feria (
id_inscripcion SERIAL PRIMARY KEY,
id_evento INT NOT NULL REFERENCES ferias_eventos(id_evento),
id_perfil INT NOT NULL REFERENCES perfiles_emprendimiento(id_perfil),
fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
estado_postulacion VARCHAR(20) DEFAULT 'PENDIENTE',
CONSTRAINT unique_inscripcion_evento UNIQUE (id_evento, id_perfil)
);

CREATE TABLE IF NOT EXISTS solicitudes_asesoria (
id_asesoria SERIAL PRIMARY KEY,
id_perfil INT NOT NULL REFERENCES perfiles_emprendimiento(id_perfil),
tema VARCHAR(50) NOT NULL,
descripcion TEXT,
fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
estado VARCHAR(20) DEFAULT 'PENDIENTE'
);

CREATE TABLE IF NOT EXISTS metricas_interaccion (
id_metrica SERIAL PRIMARY KEY,
id_perfil INT NOT NULL REFERENCES perfiles_emprendimiento(id_perfil),
id_producto INT REFERENCES productos_servicios(id_producto),
tipo_interaccion VARCHAR(30) NOT NULL, -- ej: 'VISITA_PERFIL', 'CLIC_WHATSAPP'
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (nombre_rol) VALUES ('ADMIN'), ('EMPRENDEDOR'), ('CLIENTE')
ON CONFLICT DO NOTHING;

INSERT INTO planes (nombre_plan, precio_mensual, limite_productos, acceso_ferias_presenciales, destacar_productos, acceso_asesorias)
VALUES
('Básico', 0.00, 5, FALSE, FALSE, FALSE),
('Premium', 9.99, 50, TRUE, TRUE, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO categorias (nombre_categoria, descripcion) VALUES
('Alimentos y Bebidas', 'Snacks, postres, bebidas preparadas'),
('Ropa y Moda', 'Prendas de vestir, calzado y accesorios'),
('Tecnología y Gadgets', 'Accesorios electrónicos, cables, servicios de reparación'),
('Arte y Manualidades', 'Pinturas, bisutería, decoraciones'),
('Servicios Académicos', 'Tutorías, asesorías, traducciones')
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION fn_actualizar_estado_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock <= 0 AND NEW.tipo = 'PRODUCTO' THEN
        NEW.estado := 'AGOTADO';
    ELSIF NEW.stock > 0 AND NEW.tipo = 'PRODUCTO' AND NEW.estado = 'AGOTADO' THEN
        NEW.estado := 'ACTIVO';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tg_actualizar_stock
BEFORE INSERT OR UPDATE ON productos_servicios
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_estado_stock();
