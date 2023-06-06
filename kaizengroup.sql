Drop database if exists botkaizengroup;
create database botkaizengroup;
\c botkaizengroup;

drop table if exists tgusers;
create table tgusers(
    count serial unique,
   user_id int unique not null,
   username varchar not null primary key,
   phone_number bigint unique not null,
   users_location varchar[],
   user_language varchar not null
);

drop table if exists orders;
create table orders(
    id serial unique, 
    products varchar[] not null,
    total int not null,
    by_username varchar not null,
    foreign key (by_username) references users(username)
);

insert into tgusers(user_id, username, phone_number, users_location, user_language ) values(23453, 'fulstacker', 998903152006, ARRAY[41.7823662, 69.1152], 'ru');
insert into orders(products, total, by_username) values('{Подножка кабины правая x 1  1900000}', 1900000, 'fulstacker');


DELETE FROM tgusers
WHERE user_id = 23453;
