const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2/promise');
const { POST } = require('../util/RESTtemplates.js');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;


module.exports = (dbConfig) =>{
    router.post('/login', async (req, res) => {
        const { name, password } = req.body;

        // 1. Fetch user by email
        const rows = await GET(res, dbConfig, "SELECT * FROM users WHERE email = ?", [email]);
        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        // 2. Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Success",
            user: {
                id: user.id,
                name: user.name
            }
        })
    });
    router.get('/user/:id', async (req, res) => {
        const id = req.params.id;
        const rows = await GET(res, dbConfig, 
            `SELECT * FROM defaultdb.food_user WHERE user_id = ?`,
            [id]);
        if (!rows) return; // already handled error inside GET
        res.json(rows);
    } )
    router.post('/register', async (req, res) => {
        const { name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        POST(res, dbConfig,
            'INSERT INTO defaultdb.food_user (name, password) VALUES (?, ?)',
            [name, hashedPassword],
            "User Registered",
            "Register failed"
        )
    });
    return router
}
//login
//register
//logout