-- Intentional syntax error: "CREAT" instead of "CREATE"
CREAT TABLE invalid_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Another error: missing closing parenthesis
CREATE TABLE another_table (
    id INT,
    description TEXT
