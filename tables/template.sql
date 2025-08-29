CREATE TABLE contenido_cablesmonperne.template (
    template_id SERIAL PRIMARY KEY, 
    nombre TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);