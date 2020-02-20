CREATE TABLE Users(
    _email VARCHAR(100) PRIMARY KEY NOT NULL,
    _username VARCHAR(100) UNIQUE NOT NULL,
    _firstName VARCHAR(100) NOT NULL,
    _lastName VARCHAR(100) NOT NULL,
    _dateOfBirth DATE NOT NULL,
    _gender TEXT NOT NULL,
    _password VARCHAR(100) NOT NULL,
    _weight FLOAT,
    _height FLOAT
);

CREATE TABLE Activities(
    _id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    _activityName TEXT NOT NULL,
    _activityDate DATE NOT NULL,
    _activityTIme TIME NOT NULL
);

CREATE TABLE Locations(
    _id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    _locationName VARCHAR(100) NOT NULL
);