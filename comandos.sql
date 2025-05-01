-- Criando bd
CREATE DATABASE resume_ai

-- Tabela de usuários
create table usuarios (
   id    serial primary key,
   nome  text not null,
   email text not null unique,
   senha text not null
);

-- Tabela de matérias
create table materias (
   id   serial primary key,
   nome text not null
);

-- Tabela de resumos
create table resumos (
   id         serial primary key,
   usuario_id integer not null
      references usuarios ( id )
         on delete cascade,
   materia_id integer not null
      references materias ( id )
         on delete cascade,
   topicos    text not null,
   descricao  text not null,
   criado     timestamp not null default current_timestamp
);

-- Inserir valores na tabela
insert into materias ( nome ) values ( 'Back-end' ),( 'Front-end' ),( 'Carreira' ),( 'Mobile' ),( 'Design' ),( 'Dados' ),( 'SQL'
);

-- Listar todas as matérias
select *
  from materias;

-- Verificar email do usuário
select *
  from usuarios
 where email = $1;

-- Criar um usuário
insert into usuarios (
   nome,
   email,
   senha
) values ( $1,
           $2,
           $3 );

-- Criar um resumo
insert into resumos (
   usuario_id,
   materia_id,
   topicos,
   descricao
) values ( $1,
           $2,
           $3,
           $4 );

-- Listar resumos de um determinado usuário
select r.*,
       m.nome as materia_nome
  from resumos r
  join materias m
on r.materia_id = m.id
 where r.usuario_id = $1;

-- Listar resumos filtrando por matéria e usuário
select r.*,
       m.nome as materia_nome
  from resumos r
  join materias m
on r.materia_id = m.id
 where r.usuario_id = $1
   and r.materia_id = $2;

-- Verificar se um resumo pertence a um usuário
select *
  from resumos
 where id = $1
   and usuario_id = $2;

-- Editar resumos
update resumos
   set materia_id = $1,
       topicos = $2,
       descricao = $3
 where id = $4;

-- Deletar resumos
delete from resumos
 where id = $1;

-- Resumos por mês e ano
select count(*) as quantidade
  from resumos
 where extract(month from criado) = $1
   and extract(year from criado) = $2;