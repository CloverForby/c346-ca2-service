import mysql2 from 'mysql2/promise';

async function GET(res, dbConfig,sql, params,err_message = "Database Error"){
    let connection;
    try {
        connection = await mysql2.createConnection(dbConfig);
        const [rows] = await connection.execute(sql, params)
        res.json(rows)
        return rows
    } catch(err) {
        console.error(err)
        res.status(500).json({Message: err_message})
        return null 
    } finally {
        if (connection) await connection.end();
    }
}


async function POST(res, dbConfig,sql, params, succ_message = "Success", err_message = "Database Error"){
    let connection;
    try {
        connection = await mysql2.createConnection(dbConfig);
        const [rows] = await connection.execute(sql, params)
        res.status(201).json({Message: succ_message})
        return rows
    } catch(err) {
        console.error(err)
        res.status(500).json({Message: err_message})
    } finally {
        if (connection) await connection.end();
    }
}

async function DELETE(res, dbConfig,sql ,succ_message = "Success",err_message = "Database Error"){
    let connection;
    try {
        connection = await mysql2.createConnection(dbConfig);
        await connection.execute(sql)
        res.status(201).json({Message: succ_message})
    } catch(err) {
        console.error(err)
        res.status(500).json({Message: err_message})
    } finally {
        if (connection) await connection.end();
    }
}


export {GET, POST, DELETE}