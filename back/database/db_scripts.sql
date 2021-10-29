CREATE DATABASE datawarehouse;

USE datawarehouse;

CREATE TABLE regions (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
region_name VARCHAR(80) NOT NULL,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO regions (region_name) VALUES
('America del Norte'),
('Centroamerica'),
('Antillas'),
('America del Sur');

CREATE TABLE countries (
id CHAR(3) NOT NULL,
country_name VARCHAR(80) NOT NULL,
region_id INT UNSIGNED NOT NULL,
FOREIGN KEY (region_id) REFERENCES regions (id),
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO countries (id, country_name, region_id) VALUES
('BER','Bermudas',1),
('CAN','Canada',1),
('USA','Estados Unidos',1),
('GRO','Groenlandia',1),
('MEX','Mexico',1),
('COS','Costa Rica',2),
('SAL','El Salvador',2),
('GUA','Gautemala',2),
('HON','Honduras',2),
('NIC','Nicaragua',2),
('PAN','Panamá',2),
('BAH','Bahamas',3),
('CUB','Cuba',3),
('HAI','Haití',3),
('JAM','Jamaica',3),
('PUE','Puerto Rico',3),
('DOM','Republica Dominicana',3),
('ARG','Argentina',4),
('BOL','Bolivia',4),
('BRA','Brasil',4),
('CHI','Chile',4),
('COL','Colombia',4),
('ECU','Ecuador',4),
('PAR','Paraguay',4),
('PER','Peru',4),
('URU','Uruguay',4),
('VEN','Venezuela',4);

CREATE TABLE cities (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
city_name VARCHAR(80) NOT NULL,
country_id CHAR(3) NOT NULL,
FOREIGN KEY(country_id) REFERENCES countries(id),
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO cities (city_name, country_id) VALUES
('Hamilton','BER'),
('Saint George','BER'),
('Toronto','CAN'),
('Montreal','CAN'),
('New York','USA'),
('Chicago','USA'),
('Nuuk','GRO'),
('Narsaq','GRO'),
('Ciudad de Mexico','MEX'),
('Merida','MEX'),
('San Jose','COS'),
('Liberia','COS'),
('San Salvador','SAL'),
('San Miguel','SAL'),
('Ciudad de Guatemala','GUA'),
('Anigua Guatemala','GUA'),
('San Pedro Sula','HON'),
('Distrito Central','HON'),
('Managua','NIC'),
('Granada ','NIC'),
('Ciudad de Panama','PAN'),
('Colon','PAN'),
('Nasau','BAH'),
('Alice Town','BAH'),
('La Habana','CUB'),
('Santa Clara','CUB'),
('Puerto Principe','HAI'),
('Cabo Haitiano','HAI'),
('Kingston','JAM'),
('Bahia Montego','JAM'),
('San Juan','PUE'),
('Cayey','PUE'),
('Distrito Nacional','DOM'),
('Santiago de los Caballeros','DOM'),
('Buenos Aires','ARG'),
('Cordoba','ARG'),
('La Paz','BOL'),
('Sucre','BOL'),
('Rio de Janeiro','BRA'),
('San Pablo','BRA'),
('Santiago de Chile','CHI'),
('Valparaiso','CHI'),
('Bogota','COL'),
('Medellin','COL'),
('Quito','ECU'),
('Guayaquil','ECU'),
('Asuncion','PAR'),
('Ciudad del Este','PAR'),
('Lima','PER'),
('Iquitos','PER'),
('Montevideo','URU'),
('Punta del Este','URU'),
('Caracas','VEN'),
('Maracaibo','VEN');

CREATE TABLE channel (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
channel_description VARCHAR(50) NOT NULL,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO channel (id,channel_description) VALUES
(1,'Telefono'),
(2,'Whatsapp'),
(3,'Instagram'),
(4,'Linkedin'),
(5,'Facebook');

CREATE TABLE companies (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
company_name VARCHAR(60) NOT NULL,
city_id INT UNSIGNED NOT NULL,
company_address VARCHAR (60) NOT NULL,
email VARCHAR (255) NOT NULL,
phone VARCHAR (50) NOT NULL,
FOREIGN KEY(city_id) REFERENCES cities(id),
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO companies (company_name, city_id, company_address, email, phone) VALUES
('Empresa1', 35, 'Direccion1', 'empresa1@gmail.com', '111-1111'),
('Empresa2', 41, 'Direccion2', 'empresa2@gmail.com', '222-2222'),
('Empresa3', 40, 'Direccion3', 'empresa3@gmail.com', '333-3333'),
('Empresa4', 35, 'Direccion4', 'empresa4@gmail.com', '444-4444'),
('Empresa5', 9, 'Direccion5', 'empresa5@gmail.com', '555-5555'),
('Empresa6', 51, 'Direccion6', 'empresa6@gmail.com', '666-6666');

CREATE TABLE clients (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
firstname VARCHAR(60) NOT NULL,
lastname VARCHAR(60) NOT NULL,
phone VARCHAR(50) NOT NULL,
position VARCHAR(60) NOT NULL,
email VARCHAR(255) NOT NULL,
adress VARCHAR(60) NOT NULL,
city_id INT UNSIGNED NOT NULL,
porposal_interest ENUM ('0','25%','50%','75%','100%') NOT NULL,
company_id INT UNSIGNED NOT NULL,
FOREIGN KEY(company_id) REFERENCES companies(id),
FOREIGN KEY(city_id) REFERENCES cities(id),
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO clients (firstname, lastname, phone, position, email, adress, city_id,porposal_interest, company_id) VALUES
('NombreCliente1', 'ApellidoCliente1', '111-1111', 'Analista', 'cliente1@outlook.com', 'DireccionCliente1', 35,'50%', 6),
('NombreCliente2', 'ApellidoCliente2', '111-1111', 'Ingeniero', 'cliente2@outlook.com', 'DireccionCliente2', 41,'75%', 1),
('NombreCliente3', 'ApellidoCliente3', '111-1111', 'Ingeniero', 'cliente3@outlook.com', 'DireccionCliente3', 40,'0', 1),
('NombreCliente4', 'ApellidoCliente4', '111-1111', 'Analista', 'cliente4@outlook.com', 'DireccionCliente4', 9,'75%', 2),
('NombreCliente5', 'ApellidoCliente5', '111-1111', 'Arquitecto', 'cliente5@outlook.com', 'DireccionCliente5', 51,'100%', 3),
('NombreCliente6', 'ApellidoCliente6', '111-1111', 'Analista', 'cliente6@outlook.com', 'DireccionCliente6', 35,'50%', 5),
('NombreCliente7', 'ApellidoCliente7', '111-1111', 'Arquitecto', 'cliente7@outlook.com', 'DireccionCliente7', 40,'0', 6),
('NombreCliente8', 'ApellidoCliente8', '111-1111', 'Analista', 'cliente8@outlook.com', 'DireccionCliente8', 51,'0', 1),
('NombreCliente9', 'ApellidoCliente9', '111-1111', 'Ingeniero', 'cliente9@outlook.com', 'DireccionCliente9', 9,'50%', 3),
('NombreCliente10', 'ApellidoCliente10', '111-1111', 'Arquitecto', 'cliente10@outlook.com', 'DireccionCliente10', 40,'100%', 6),
('NombreCliente11', 'ApellidoCliente11', '111-1111', 'Analista', 'cliente11@outlook.com', 'DireccionCliente11',41 ,'75%', 4),
('NombreCliente12', 'ApellidoCliente12', '111-1111', 'Arquitecto', 'cliente12@outlook.com', 'DireccionCliente12', 35,'50%', 6);

CREATE TABLE contact_channel (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
client_id INT UNSIGNED NOT NULL,
channel_id INT UNSIGNED NOT NULL,
account VARCHAR(255) NOT NULL,
preference ENUM ('Sin preferencias','Canal favorito', 'No molestar') NOT NULL,
FOREIGN KEY(client_id) REFERENCES clients(id),
FOREIGN KEY(channel_id) REFERENCES channel(id),
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO contact_channel (client_id, channel_id, account, preference) VALUES
(1, 2, '4321-4321', 'No molestar'),
(2, 3, '@cliente2','Sin preferencias'),
(3, 1, '432-4324','Canal favorito'),
(4, 2, '432-4322','No molestar'),
(5, 1, '123-1234','Canal favorito'),
(1, 4, 'https://www.linkedin.com/in/cliente1','Sin preferencias'),
(2, 5, 'cliente2','No molestar'),
(3, 5, 'cliente3','Canal favorito'),
(4, 1, '123-1234','Canal favorito'),
(5, 3, '@cliente5','Sin preferencias'),
(9, 2, '4323-4323','Sin preferencias'),
(10, 4, 'https://www.linkedin.com/in/cliente10','No molestar'),
(11, 4, 'https://www.linkedin.com/in/cliente11','Canal favorito'),
(9, 4, 'https://www.linkedin.com/in/cliente9','Canal favorito'),
(12, 4, 'https://www.linkedin.com/in/cliente12','Sin preferencias');

CREATE TABLE roles (
id CHAR(4) NOT NULL,
role_description VARCHAR(50) NOT NULL,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO roles (id, role_description) VALUES
('ADMI','Usuario Administrador'),
('USER','Usuario');

CREATE TABLE employees (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
firstname VARCHAR(60) NOT NULL,
lastname VARCHAR(60) NOT NULL,
email VARCHAR(255) NOT NULL,
role_id CHAR(4) NOT NULL,
user_pass VARCHAR(50) NOT NULL,
FOREIGN KEY(role_id) REFERENCES roles(id),
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO employees (firstname, lastname, email, role_id, user_pass) VALUES
('admi','admi', 'admi@admi.com', 'ADMI', 'admi'),
('user','user', 'user@user.com', 'USER', 'user');

-- SELECT ch.channel_description, cl.id AS Id_cliente, co.account, co.preference, cl.firstname, cl.lastname
-- -- FROM clients cl
-- -- INNER JOIN contact co
-- -- ON (cl.id = co.client_id)
-- -- INNER JOIN channel ch
-- -- ON (co.channel_id = ch.id);