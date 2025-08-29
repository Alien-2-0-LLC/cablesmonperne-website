CREATE TABLE contenido_alien.template_variables (
    variable_id SERIAL PRIMARY KEY,  
    template_id INTEGER NOT NULL, 
    name TEXT NOT NULL,  
    bannerbear_id VARCHAR(255) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
