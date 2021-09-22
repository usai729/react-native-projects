<center><h1>TO-DO LIST APP WITH REACT NATIVE</h1></center>

Modules to be installed<br>
`npm install react-native-elements`<br>
`npm install @react-navigation/native`<br>
`npm install @react-navigation/bottom-tabs`<br>
`npm install @react-navigation/stack`

Using *PHP on the backend* and *MySQL for database*

Creating database<br>
`CREATE DATABASE TODOlist;`

`USE TODOlist;`

Table for users. This can be modified to have username or any other unique identification. In my case I kept just the key.
```
CREATE TABLE users (
    userID INTEGER PRIMARY KEY AUTO_INCREMENT,
    userKey INTEGER NOT NULL
);
```
Create table for todos. Use <b>relUser</b> as *FOREIGN KEY*
```
CREATE TABLE todos (
    pID INTEGER PRIMARY KEY AUTO_INCREMENT,
    relUser INTEGER,
    todoTITLE VARCHAR(200) NOT NULL,
    todoDesc TEXT,
    addedTime DATE,
    important BOOLEAN NOT NULL,
    FOREIGN KEY(relUser) REFERENCES users(userID)
);
```
