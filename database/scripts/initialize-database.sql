  
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
    id INT NOT NULL AUTO_INCREMENT,
    _activityName TEXT NOT NULL,
    _activityDate TEXT NOT NULL,
    _activityTime TIME NOT NULL,
    _activityLocation TEXT NOT NULL,
    _activityDescription TEXT NOT NULL,
    _activityAuthor TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    UserEmail VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (UserEmail) REFERENCES Users(_email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comments(
    id INT NOT NULL AUTO_INCREMENT,
    _content TEXT NOT NULL,
    _author TEXT NOT NULL,
    ActivityId INT NOT NULL,
    UserEmail VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (ActivityId) REFERENCES Activities(id) ON DELETE CASCADE,
    FOREIGN KEY (UserEmail) REFERENCES Users(_email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Participants(
    id INT NOT NULL AUTO_INCREMENT,
    _username TEXT NOT NULL,
    UserEmail VARCHAR(100) NOT NULL,
    ActivityId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (UserEmail) REFERENCES Users(_email) ON DELETE CASCADE,
    FOREIGN KEY (ActivityId) REFERENCES Activities(id) ON DELETE CASCADE
);
