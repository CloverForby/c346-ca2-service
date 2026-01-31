const express = require('express')
const mysql2 = require('mysql2/promise');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const foodItemRoutes = require('./routes/fooditem');
const userRoutes = require('./routes/user');
const { testDatabaseConnection } = require('./util/test_connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
}
console.log(dbConfig)
app.use('/',foodItemRoutes(dbConfig));
app.use('/',userRoutes(dbConfig));


// Call the function when server starts
testDatabaseConnection(dbConfig);


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
