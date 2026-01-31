import mysql2 from 'mysql2/promise';


export async function testDatabaseConnection(dbConfig) {
  try {
    const connection = await mysql2.createConnection(dbConfig);
    console.log('✅ Database connected successfully!');
    await connection.end(); // Close connection after testing
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}
