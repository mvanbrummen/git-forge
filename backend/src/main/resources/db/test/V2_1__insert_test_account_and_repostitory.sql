INSERT INTO account (id, username, email_address, password)
VALUES (UUID('07dea038-dbad-459b-9643-ca9706195f28'), 'test_user', 'test_user@test.com', '$2a$10$H2NvbSRiEq/u7Ow4MaWZh.StBl4xCJ1UJwXjQQwlkDdt0EjGv.iCG');

INSERT INTO repository (id, account_id, name, description)
VALUES (UUID('8d984d8e-da75-419f-9e91-68b7f3d482cf'), UUID('07dea038-dbad-459b-9643-ca9706195f28'), 'test_repository', 'A splendid git repository');