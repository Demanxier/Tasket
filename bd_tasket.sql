-- Tabela Role
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);


-- Tabela Usuario
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    id_role INT NOT NULL,
    FOREIGN KEY (id_role) REFERENCES role(id)
);

-- Inserir Role Admin e Básico
INSERT INTO role (nome) VALUES ('Admin'), ('Basico');

-- Inserir Usuário Admin
INSERT INTO usuario (nome, email, senha, id_role) 
VALUES ('Demanxier', 'demanxier@demanxier.com', '$2a$12$K7FuqNUTXPIyAxXov6RyF.z4GEidvhuiOyDN1Jgc8T7Itl2HB7Wpq', 1);

-- Tabela Status
CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- Inserir Status Padrão
INSERT INTO status (nome) VALUES ('Novo'), ('Pausado'), ('Agendado'), ('Cancelado'), ('Concluido');

-- CONSULTOR
create table consultor(
	id int auto_increment primary key,
	nome varchar(100) not null,
	email varchar(255),
	custoHora decimal(1,1)
);

--CHAMADOS
create table chamados(
	id int auto_increment primary key,
	titulo varchar(255) not null,
	descricao varchar(310),
	id_status int not null,
	ticket_id int not null unique,
	ticket_titulo varchar(255) not null,
	ticket_status varchar(100) not null,
	ticket_dataCriacao date not null,
	ticket_resposavel varchar(100) not null,
	ticket_time varchar(100) not null,
	ticket_cliente varchar(100)not null,
	foreign key (id_status) references status(id)
);

-- Atendimento
create table atendimento(
	id int auto_increment primary key,
	data date not null,
	horaInicio time not null,
	horaFim time,
	resumo varchar(310),
	id_consultor int not null,
	id_chamado int not null,
	foreign key (id_consultor) references consultor(id),
	foreign key (id_chamado) references chamados(id)
);



--TAREFA
create table tarefa(
	id int auto_increment primary key,
	nome varchar(255) not null,
	descricao varchar(310),
	dataCriacao date,
	dataConclusao date,
	id_status int not null,
	id_usuario int not null,
	foreign key (id_status) references status(id),
	foreign key (id_usuario) references usuario(id)
);