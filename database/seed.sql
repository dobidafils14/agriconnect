USE agriconnect;

INSERT INTO users (nom, email, password, role, telephone) VALUES
('Admin AgriConnect', 'admin@agriconnect.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+237600000000'),
('Jean Dupont', 'jean@agriconnect.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'agriculteur', '+237611000001'),
('Marie Éleveuse', 'marie@agriconnect.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'eleveur', '+237611000002');

-- Mot de passe par défaut pour tous : "password"

INSERT INTO products (titre, description, prix, unite, quantite, categorie, image, user_id, telephone) VALUES
('Tomates fraîches', 'Tomates cultivées sans pesticides, variété Roma.', 500, 'kg', 200, 'agriculture', NULL, 2, '+237611000001'),
('Maïs jaune', 'Maïs séché de qualité supérieure, récolte 2026.', 300, 'kg', 500, 'agriculture', NULL, 2, '+237611000001'),
('Poulet fermier', 'Poulets élevés en plein air, nourris au grain.', 3500, 'pièce', 50, 'elevage', NULL, 3, '+237611000002'),
('Lait de vache frais', 'Lait entier non pasteurisé, livraison matin.', 600, 'litre', 100, 'elevage', NULL, 3, '+237611000002');