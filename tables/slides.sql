CREATE TABLE contenido_cablesmonperne.slides (
    slide_id BIGSERIAL PRIMARY KEY,
    carousel_id BIGINT NOT NULL,
    orden INTEGER NOT NULL CHECK (orden > 0),
    tipo contenido_cablesmonperne.slide_tipo NOT NULL DEFAULT 'titulo_descripcion',
    titulo TEXT,
    descripcion TEXT,
    cuerpo TEXT,
    contenido_texto TEXT,
    imagen TEXT,
    imagen_diseñada TEXT,
    imagen_original_url TEXT,
    imagen_diseñada_url TEXT,
    metadatos JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
