const mysql = require('mysql2');
const dotenv = require('dotenv');
const path=require('path');
dotenv.config({path:path.join(__dirname,'..','config','.env')});
const ca = Buffer.from(
  process.env.CA,
  "base64"
);
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port:process.env.MYSQL_PORT,
    database:process.env.MYSQL_DATABASE,
    ssl: {
        ca,
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

module.exports=pool;