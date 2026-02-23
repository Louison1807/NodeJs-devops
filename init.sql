USE mybooks;

CREATE TABLE mybook (
    id int AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    isbn VARCHAR(60) NOT NULL
);

