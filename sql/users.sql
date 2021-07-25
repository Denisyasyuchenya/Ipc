create TABLE IF NOT EXISTS users(
    id serial primary key,
    name varchar (50),
    surname varchar (50),
    email varchar (100) UNIQUE,
    creation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    ip_ser bigint DEFAULT NULL,
    ip_num bigint UNIQUE DEFAULT NULL
);