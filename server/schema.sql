-- Create Database
CREATE DATABASE IF NOT EXISTS safer_el3rabiat;
USE safer_el3rabiat;

-- Users Table
CREATE TABLE IF NOT EXISTS safer_el3rabiat.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cars Table
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    image_url VARCHAR(255),
    description TEXT,
    status ENUM('Available', 'Active', 'Sold') DEFAULT 'Available',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

select * from cars;
select * from safer_el3rabiat.users;