const express = require('express');
const app = express();
const { Pool } = require('pg');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    port: 5432,
    database: 'sample',
});

// Test the initial connection
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
    } else {
        console.log('Connected to PostgreSQL. Current timestamp:', result.rows[0].now);
    }
});

// GET all employees
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees';
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});

// GET employee by ID
app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const query = 'SELECT * FROM employees WHERE employee_id = $1';
    pool.query(query, [employeeId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});

// POST (Create) a new employee
app.post('/employees', (req, res) => {
    const { first_name, last_name, salary } = req.body;
    const query = 'INSERT INTO employees (first_name, last_name, salary) VALUES ($1, $2, $3) RETURNING *';
    pool.query(query, [first_name, last_name, salary], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows[0]);
        }
    });
});

// PUT (Update) an employee by ID
app.put('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const { first_name, last_name, salary } = req.body;
    const query = 'UPDATE employees SET first_name = $1, last_name = $2, salary = $3 WHERE employee_id = $4 RETURNING *';
    pool.query(query, [first_name, last_name, salary, employeeId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows[0]);
        }
    });
});

// DELETE an employee by ID
app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const query = 'DELETE FROM employees WHERE employee_id = $1 RETURNING *';
    pool.query(query, [employeeId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows[0]);
        }
    });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
