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
   email varchar,
   organization varchar
);

drop table if exists orders;
create table orders(
    id serial unique,
    created_date varchar not null, 
    products varchar[] not null,
    total int not null,
    undiscount int,
    dicount int,
    type_payment varchar,
    username varchar not null,
    users_location_text varchar,
    user_location_cordinate varchar[],
    shipping_method varchar,
    payment_method varchar,
    comment varchar, 
    phone_number varchar
);

insert into allusers(user_id, tg_username, phone_number, users_location, user_language ) values(23453, 'fulstacker', '998903152006', ARRAY[41.7823662, 69.1152], 'ru');
insert into orders(products, total, username, created_date, undiscount, dicount) values('{Подножка кабины правая x 1  1900000}', 1900000, 'fulstacker', '23.06.2023', 0,0);


DELETE FROM tgusers
WHERE user_id = 23453;
