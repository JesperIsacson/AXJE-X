CREATE TABLE IF NOT EXISTS Users(
    _email VARCHAR(100) PRIMARY KEY NOT NULL,
    _username VARCHAR(100) UNIQUE NOT NULL,
    _firstName VARCHAR(100) NOT NULL,
    _lastName VARCHAR(100) NOT NULL,
    _dateOfBirth TEXT NOT NULL,
    _gender TEXT NOT NULL,
    _password VARCHAR(100) NOT NULL,
    _weight FLOAT,
    _height FLOAT
);

CREATE TABLE IF NOT EXISTS Activities(
    _id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    _activityName TEXT NOT NULL,
    _activityDate TEXT NOT NULL,
    _activityTime TIME NOT NULL,
    _activityLocation TEXT NOT NULL,
    _activityDescription TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Locations(
    _id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    _locationName VARCHAR(100) NOT NULL
);