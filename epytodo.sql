
USE epytodo

CREATE TABLE IF NOT EXISTS user (
    id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email TEXT NOT NULL UNiQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    firstname TEXT NOT NULL,
    created_at DATETIME default(CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS todo (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME default(CURRENT_DATE),
    due_time DATETIME NOT NULL,
    status ENUM("not started", "todo", "in progress", "done") DEFAULT "not started",
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(id)
);