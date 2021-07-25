create TABLE IF NOT EXISTS operators(
    id_oper serial primary key,
    name_oper varchar (50),
    phone bigint,
    online bool
);