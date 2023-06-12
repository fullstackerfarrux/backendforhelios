Drop database if exists botkaizengroup;
create database botkaizengroup;
\c botkaizengroup;

drop table if exists allusers;
create table allusers(
   count serial unique,
   user_id int ,
   tg_username varchar,
   tg_name varchar,
   user_name varchar,
   user_surname varchar,
   phone_number varchar not null,
   users_location varchar[],
   users_location_text varchar[],
   user_language varchar,
   email varchar
);

drop table if exists orders;
create table orders(
    id serial unique, 
    products varchar[] not null,
    total int not null,
    type_pay varchar,
    users_location_text varchar[],
    comment varchar, 
    phone_number varchar
);

insert into allusers(user_id, tg_username, phone_number, users_location, user_language ) values(23453, 'fulstacker', '998903152006', ARRAY[41.7823662, 69.1152], 'ru');
insert into orders(products, total, by_username) values('{Подножка кабины правая x 1  1900000}', 1900000, 'fulstacker');


DELETE FROM tgusers
WHERE user_id = 23453;
