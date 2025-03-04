-- PRIMEIRA PARTE DO PROJETO 

-- TABELA USUÁRIO
create table "usuarios" (
   "id"       serial not null,
   "nome"     text not null,
   "email"    varchar(255) not null,
   "senha" text not null,
   primary key ( "id" ),
   constraint "email" unique ( "email" )
);

-- TABELA MATÉRIA
create table "materias" (
   "id"   serial not null,
   "nome" text not null,
   primary key ( "id" )
);

-- TABELA RESUMO
create table "resumos" (
   "id"          serial not null,
   "usuarios_id"    int4 not null,
   "materias_id"   int4 not null,
   "topicos"      text not null,
   "descricao" text not null,
   "criado"     timestamptz not null default now(),
   primary key ( "id",
                 "usuarios_id",
                 "materias_id" ),
   constraint "usersref" foreign key ( "usuarios_id" )
      references "usuarios" ( "id" )
         on delete cascade,
   constraint "matterref" foreign key ( "materias_id" )
      references "materias" ( "id" )
         on delete cascade
);

-- INSERÇÃO DAS MATÉRIAS A TABELA MATÉRIA.
insert into "materias" ( "nome" ) values ( 'Back-end' ),( 'Front-end' ),( 'Carreira' ),( 'Mobile' ),( 'Design' ),( 'Dados' ),(
'SQL' );

-- LISTAR MATÉRIAS
select *
  from materias;

-- PESQUISAR USUÁRIO POR EMAIL
select "email"
  from "usuarios"
 where "email" = 'renanalves000@gmail.com';

-- INSERIR NOVO USUÁRIO
insert into "usuarios" (
   "nome",
   "email",
   "senha"
) values 
( 'Renan Lima', 'renanalves000@gmail.com', 'senha123' ),
( 'Stephane Rêgo', 'stephanee.rego@gmail.com', 'senha321' );

-- INSERIR RESUMOS DE USUÁRIOS
insert into "resumos" ("usuarios_id", "materias_id", "topicos", "descricao")
values 
(1, 1, 'Banco de Dados', 'Resumo sobre chaves primárias e estrangeiras.'),
(2, 2, 'React.js', 'É biblioteca JavaScript focada na criação de interfaces de usuário 
reativas e componentizadas.');

-- PESQUISAR RESUMOS RELACIONADOS A USUÁRIOS
select * from "resumos"
where "usuarios_id" = 1;

-- COMANDOS PARA LISTAR OS RESUMO DE UM DETERMINADO USUÁRIO
SELECT u."nome", s.*
FROM "resumos" s
JOIN "usuarios" u ON s."usuarios_id" = u."id"
WHERE s."usuarios_id" = 1;

-- CRIE COMANDO PARA LISTAR SE O RESUMO FILTRADO, É DE DETERMINADO USUÁRIO
SELECT r.*
FROM "resumos" r
WHERE r."usuarios_id" = 1 AND r."materias_id" = 1;


-- COMANDO PARA EDITAR TODOS OS CAMPOS DE UM RESUMO, PELO ID
update "resumos"
set
  "usuarios_id" = 2, 
  "materias_id" = 3, 
  "topicos" = 'Carreira', 
  "descricao" = 'É tarde para transicionar sua carreira?'
where "id" = 2;

-- COMANDO PARA DELETAR RESUMO DE UM ID
delete from "resumos"
where "id" = 2;

-- COMANDO PARA FILTRAR QUANTIDADE DE RESUMOS GERADOS DE UM DETERMINADO MÊS E ANO
select count(*)
from "resumos"
where extract(month from "criado") = 2
and extract(year from "criado") = 2025;
