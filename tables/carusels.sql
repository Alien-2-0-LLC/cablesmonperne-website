CREATE TABLE contenido_cablesmonperne.caruseles (
    carusel_id BIGINT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    template_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);