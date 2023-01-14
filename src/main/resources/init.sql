create table users.role
(
    id bigint not null primary key,
    name varchar(255)
);

insert into users.role (id, name) values (1, 'ROLE_USER'), (2, 'ROLE_ADMIN');

drop table users.user_role;
drop table users.role;
drop table users.users;

create table users.users
(
    id bigint NOT NULL AUTO_INCREMENT
        primary key,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    age int NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL

);

insert into users.users (firstname, lastname, age, email, password) values
     ('admin', 'admin', 32,'admin@ru', '$2a$10$qsB0ZY1usorO8MSSzggmeuOhXWGXx.9m2JaDUWOp7vB2coZ3T39f.'),
   ('user', 'user', 33,'user@ru', '$2a$10$qsB0ZY1usorO8MSSzggmeuOhXWGXx.9m2JaDUWOp7vB2coZ3T39f.'),
   ('user2','user2',34, 'user2@ru', '$2a$10$qsB0ZY1usorO8MSSzggmeuOhXWGXx.9m2JaDUWOp7vB2coZ3T39f.');

create table users.user_role
(
    user_id  bigint not null
          references users.users,
    role_id bigint not null
            references users.role,
    primary key (user_id, role_id)
);

insert into users.user_role (user_id, role_id) VALUES  (1, 1),(1, 2), (2, 1), (3, 1);

