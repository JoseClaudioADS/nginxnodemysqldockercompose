const express = require('express')
const app = express()
const port = 3000
const config = {
    connectionLimit: 10,
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createPool(config)

const sql_create_table = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(200), primary key (id));`
connection.query(sql_create_table)

const sql_insert = `INSERT INTO people(name) values('Jose')`
connection.query(sql_insert)

app.get('/', (req,res) => {

    const sql_people = `SELECT name FROM people;`
    connection.query(sql_people, function (error, results) {
        if (error) throw error;
        const htmlNames = `<ul>
            ${results.map(element => `<li>${element.name}</li>`).join('')}
        </ul>`
        res.send('<h1>Full Cycle Rocks!</h1>' + htmlNames)
    });
 
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})