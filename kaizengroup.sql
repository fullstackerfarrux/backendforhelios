Drop database if exists botkaizengroup;
create database botkaizengroup;
\c botkaizengroup;

drop table if exists allusers;
create table allusers(
   count serial unique,
   user_id int unique,
   tg_username varchar primary key,
   tg_name varchar,
   site_name varchar,
   phone_number bigint unique not null,
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
    comment varchar, 
    phone_number varchar
);

insert into tgusers(user_id, username, phone_number, users_location, user_language ) values(23453, 'fulstacker', 998903152006, ARRAY[41.7823662, 69.1152], 'ru');
insert into orders(products, total, by_username) values('{Подножка кабины правая x 1  1900000}', 1900000, 'fulstacker');


DELETE FROM tgusers
WHERE user_id = 23453;
