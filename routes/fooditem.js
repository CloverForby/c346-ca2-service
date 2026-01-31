const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2/promise');
const { GET, POST, DELETE } = require('../util/RESTtemplates.js');


module.exports = (dbConfig) =>{
    router.get('/fooditems/:id', async (req, res) => {
        const userId = req.params.id;
        try {
            let connection = await mysql2.createConnection(dbConfig);
            const [rows] = await connection.execute(`SELECT * FROM defaultdb.food_food_item WHERE user_id = ${userId}`);
            res.json(rows);
        } catch (err){
            console.error(err);
            res.status(500).json({message: 'Server error for food'})
        }
    });
    router.get('/fooditem/:id', async (req, res) => {
        const id = req.params.id;
        const rows = await GET(res, dbConfig, 
            `SELECT * FROM defaultdb.food_food_item WHERE id = ?`,
            [userId],
            'Server error for foodItems');
        if (rows) res.json(rows[0] || null);
    });
    router.post('/newfood', (req, res) => {
        const {user_id, name, quantity, unit, expiry_date, is_opened} = req.body;
        POST(res, dbConfig,
            "INSERT INTO defaultdb.food_food_item (user_id, name, quantity, unit, expiry_date, is_opened) VALUES ( ? ,? ,? ,?, ? ,?)",
            [user_id, name, quantity, unit, expiry_date, is_opened]
        )
    });
    router.post('/editfood/:id', (req, res) => {
        const id = req.params.id;
        const {name, quantity, unit, expiry_date, is_opened} = req.body;
        POST(res, dbConfig, 
            "UPDATE defaultdb.food_food_item SET name = ?, quantity = ?, unit = ?, expiry_date = ?, is_opened = ? WHERE id = ?",
            [name, quantity, unit, expiry_date, is_opened, id]
        )
    });
    router.delete('/deletefood/:id', (req, res) => {
        const { id } = req.params;
        DELETE(res, dbConfig,
            `DELETE FROM defaultdb.food_food_item WHERE noteId = ${id}`
        )
    });

    router.get('/test', (req,res) => {
        res.json({"message": "success"})
    })

    return router
}
