CREATE TABLE IF NOT EXISTS users(
    _email VARCHAR(100) NOT NULL,
    _age INT NOT NULL,
    _gender TEXT NOT NULL,
    _password VARCHAR(100) NOT NULL,
    _weight FLOAT,
    _height FLOAT
);

CREATE TABLE IF NOT EXISTS activities(
    _id INT AUTOINCREMENT NOT NULL,
    _activityName TEXT NOT NULL,
    _activityDate DATE NOT NULL,
    _activityTIme TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS locations(
    _id INT AUTOINCREMENT NOT NULL,
    _locationName VARCHAR(100) NOT NULL
);