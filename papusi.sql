DROP TYPE IF EXISTS categ_papusi;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categ_papusi AS ENUM( 'varsta0-2', 'varsta3-5', 'varsta6-10', 'varsta10-14', 'colectie', 'haine', 'incaltaminte', 'casa de papusi');
CREATE TYPE tipuri_produse AS ENUM('papusa', 'accesoriu');
CREATE TYPE stil_set AS ENUM('modern','vintage', 'casual', 'sport', 'elegant');

CREATE TABLE IF NOT EXISTS papusi (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(5,2) NOT NULL,
   tip_produs tipuri_produse DEFAULT 'papusa',
   categorie categ_papusi DEFAULT 'colectie',
   dimensiune NUMERIC(5,2) NOT NULL CHECK (dimensiune>=0),
   material VARCHAR [],
   vegan BOOLEAN NOT NULL DEFAULT True,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
   CHECK (
      (tip_produs = 'papusa' AND categorie IN ('varsta0-2', 'varsta3-5', 'varsta6-10', 'varsta10-14', 'colectie'))
      OR
      (tip_produs = 'accesoriu' AND categorie IN ('haine', 'incaltaminte', 'casa de papusi'))
   )
   stil stil_set DEFAULT 'casual';
);


INSERT INTO papusi (nume,descriere,pret, tip_produs, categorie, dimensiune, material, vegan, stil, imagine) VALUES 
('Papusa Ana', 'Papusa vesela pentru copii, din material textil si plastic.', 59.99, 'papusa', 'varsta3-5', 32.0, '{"textil", "plastic"}', True, 'casual', 'resurse/imagini/papusa_ana.jpg'),

('Papusa Bebe', 'Papusa special conceputa pentru bebelusi.', 45.50, 'papusa', 'varsta0-2', 20.5, NULL, False, 'casual', 'resurse/imagini/papusa_bebe.jpg'),

('Colectia Star', 'Editie limitata din colectia speciala.', 120.00, 'papusa', 'colectie', 35.0, '{"plastic"}', True, 'vintage', 'resurse/imagini/colectia_star.jpg'),

('Papusa Maria', 'Papusa clasica pentru varste intre 6 si 10 ani.', 65.00, 'papusa', 'varsta6-10', 28.0, '{"bumbac"}', False, 'casual', 'resurse/imagini/papusa_maria.jpg'),

('Papusa Adolescenta', 'Papusa stil adolescenta pentru varsta 10-14.', 72.50, 'papusa', 'varsta10-14', 32.0, NULL, True, 'modern', 'resurse/imagini/papusa_adolescenta.jpg'),

('Set Rochite', 'Set de rochite elegante pentru papusi.', 35.99, 'accesoriu', 'haine', 14.2, '{"textil"}', False, 'elegant', 'resurse/imagini/set_rochite.jpg'),

('Set Rochii', 'Set de rochite casual pentru papusi.', 25.50, 'accesoriu', 'haine', 12.2, NULL, True, 'casual', 'resurse/imagini/set_rochii.jpg'),

('Papusa Sofia', 'Papusa pentru copii intre 6-10 ani.', 58.00, 'papusa', 'varsta6-10', 29.5, '{"plastic"}', True, 'modern', 'resurse/imagini/papusa_sofia.jpg'),

('Papusa Carina', 'Papusa de colectie eleganta.', 110.00, 'papusa', 'colectie', 50.0, '{"ceramica"}', False, 'vintage', 'resurse/imagini/papusa_carina.jpg'),

('Papusa BabyLuv', 'Perfecta pentru nou-nascuti.', 40.00, 'papusa', 'varsta0-2', 20.0, '{"pluș"}', True, 'casual', 'resurse/imagini/papusa_babyluv.jpg'),

('Pantofi', 'Pantofi cu toc eleganti.', 39.90, 'accesoriu', 'incaltaminte', 3.1, '{"plastic", "textil"}', False, 'elegant', 'resurse/imagini/pantofi.jpg'),

('Set Bucatarie', 'Accesoriu bucatarie pentru casa de papusi.', 89.00, 'accesoriu', 'casa de papusi', 100, '{"plastic"}', True, 'modern', 'resurse/imagini/set_bucatarie.jpg'),

('Set Iarna', 'Haine groase pentru papusi.', 50.00, 'accesoriu', 'haine', 30, '{"lana", "bumbac"}', True, 'casual', 'resurse/imagini/set_iarna.jpg'),

('Papusa Elsa', 'Papusa inspirata din povesti.', 67.99, 'papusa', 'varsta3-5', 27.5, '{"plastic"}', False, 'modern', 'resurse/imagini/papusa_elsa.jpg'),

('Papusa Mini', 'Mini-papusa pentru colectii.', 114.99, 'papusa', 'colectie', 15.0, NULL, True, 'modern', 'resurse/imagini/papusa_mini.jpg'),

('Papusa Junior', 'Model pentru copii peste 10 ani.', 70.00, 'papusa', 'varsta10-14', 25.0, '{"textil"}', True, 'casual', 'resurse/imagini/papusa_junior.jpg'),

('Adidasi', 'Pereche clasică de adidasi.', 38.90, 'accesoriu', 'incaltaminte', 4.0, '{"plastic", "textil"}', False, 'casual', 'resurse/imagini/adidasi.jpg'),

('Pantofi Sport', 'Incaltaminte sport pentru papusi.', 32.00, 'accesoriu', 'incaltaminte', 4.0, '{"piele"}', True, 'sport', 'resurse/imagini/pantofi_sport.jpg'),

('Papusa Sporty', 'Papusa activa pentru copii energici.', 64.00, 'papusa', 'varsta6-10', 29.0, '{"plastic", "textil"}', False, 'sport', 'resurse/imagini/papusa_sporty.jpg'),

('Papusa NoName', 'Papusa misterioasa fara descriere.', 150.00, 'papusa', 'colectie', 45, NULL, True, 'elegant', 'resurse/imagini/papusa_noname.jpg');