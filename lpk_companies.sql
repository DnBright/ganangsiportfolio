-- SQL Insert Statements untuk Data LPK Companies
-- Pastikan tabel sudah dibuat sebelum menjalankan script ini

-- Contoh struktur tabel (sesuaikan dengan kebutuhan):
-- CREATE TABLE companies (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     company_name VARCHAR(255) NOT NULL,
--     industry VARCHAR(255),
--     region VARCHAR(100),
--     contact_person VARCHAR(255),
--     email VARCHAR(255),
--     contact VARCHAR(100),
--     project_type VARCHAR(100),
--     proposal_status VARCHAR(50),
--     admin VARCHAR(100),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

INSERT INTO companies (company_name, industry, region, contact_person, email, contact, project_type, proposal_status, admin) VALUES
('LPK Bina Insani Solo', 'LPK Jepang & Korea', 'Surakarta', 'Ibu Ika (Admin)', 'lpk_binainsani@yahoo.co.id', '0857-2538-8199', 'Website', 'Aktif', 'Ganang'),
('LPK Sakura Gakuin', 'LPK Jepang (SO)', 'Surakarta', 'Bp. Heru', 'lpk.sakuragakuin@gmail.com', '0896-6317-0666', 'Website', 'Aktif', 'Ganang'),
('LPK Aoisora Sinar Indo', 'LPK Jepang', 'Surakarta', 'Management', 'aoisorasinarindonesia@gmail.com', '0813-2735-0909', 'Website', 'Aktif', 'Ganang'),
('LPK Kosei Indonesia', 'LPK Jepang', 'Surakarta', 'Admin CS', 'koseiindonesiasolo@gmail.com', '0813-9310-4441', 'Website', 'Aktif', 'Ganang'),
('LPK Han Seok Kyu', 'LPK Korea', 'Surakarta', 'Admin', 'lpk.hanseokkyu@gmail.com', '0821-3323-2828', 'Website', 'Aktif', 'Ganang'),
('LPK J-NEX Indonesia', 'LPK Jepang', 'Surakarta', 'Admin', 'jnexindonesia@gmail.com', '0812-3866-2280', 'Website', 'Aktif', 'Ganang'),
('LPK Mirai Solo', 'LPK Jepang', 'Surakarta', 'Pengelola', 'lpk.mirai.solo@gmail.com', '0821-3652-3211', 'Website', 'Aktif', 'Ganang'),
('LPK Hikari Solo', 'LPK Jepang', 'Surakarta', 'Admin', 'hikarimagangjepang@gmail.com', '0822-2051-4040', 'Website', 'Aktif', 'Ganang'),
('LPK Gangnam Indonesia', 'LPK Korea', 'Surakarta', 'Management', 'gangnamindonesia.solo@gmail.com', '0856-4222-3432', 'Website', 'Aktif', 'Ganang'),
('LPK Shinju Solo', 'LPK Jepang', 'Surakarta', 'Admin', 'shinjusolo@gmail.com', '0857-0245-5551', 'Website', 'Aktif', 'Ganang'),
('LPK Kyodai Indonesia', 'LPK Jepang', 'Surakarta', 'Management', 'kyodaiindonesiasolo@gmail.com', '0858-7000-0925', 'Website', 'Aktif', 'Ganang'),
('LPK Gakushudo Solo', 'LPK Jepang', 'Surakarta', 'Admin', 'gakushudo.solo@gmail.com', '(0271) 714041', 'Website', 'Aktif', 'Ganang');
