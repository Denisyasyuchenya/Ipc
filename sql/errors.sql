create TABLE IF NOT EXISTS errorsLog(
    errorId serial primary key,
    status integer,
    user_email varchar(100),
    message varchar(250),
    FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    error_count integer DEFAULT 0
);