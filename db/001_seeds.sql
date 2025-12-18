-- Intentional syntax error: wrong INSERT syntax
INSERT INTO invalid_table id, name VALUES (1, 'Test');

-- Another error: missing VALUES keyword
INSERT INTO another_table (id, description) (2, 'Sample');
