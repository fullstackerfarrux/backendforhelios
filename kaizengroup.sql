Drop database if exists botkaizengroup;
create database botkaizengroup;
\c botkaizengroup;

drop if exists orders(
    id: serial unique not null,
    product_name: varchar not null,
    product_price: varchar not null
);

insert into orders(product_name, product_price) values('shina', '800ming')