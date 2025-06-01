-- Create tables for a simple library system

-- Drop tables if they exist
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS authors;

-- Authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year INT
);

-- Books table
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INT REFERENCES authors(author_id),
    published_year INT
);

-- Members table
CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE
);

-- Loans table (book borrowed by a member)
CREATE TABLE loans (
    loan_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    member_id INT REFERENCES members(member_id),
    loan_date DATE DEFAULT CURRENT_DATE,
    return_date DATE
);

-- Insert initial data into the tables

-- Insert authors
INSERT INTO authors (name, birth_year) VALUES
('George Orwell', 1903),
('J.K. Rowling', 1965),
('J.R.R. Tolkien', 1892);

-- Insert books
INSERT INTO books (title, author_id, published_year) VALUES
('1984', 1, 1949),
('Harry Potter and the Sorcerer''s Stone', 2, 1997),
('The Hobbit', 3, 1937);

-- Insert members
INSERT INTO members (name, join_date) VALUES
('Alice Smith', '2023-01-15'),
('Bob Johnson', '2023-02-20');

-- Insert loans
INSERT INTO loans (book_id, member_id, loan_date, return_date) VALUES
(1, 1, '2023-03-01', '2023-03-15'),
(2, 2, '2023-03-05', NULL),
(3, 1, '2023-04-01', NULL);
