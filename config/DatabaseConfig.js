const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

async function connectToDatabase() {
    // Create a new MongoClient
    const client = new MongoClient(uri);

    try {
        // console.log('Connected successfully to mongo server');

        // Connect to specific database
        const db = client.db(dbName);

        return { client, db };
    } catch (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
}

module.exports = connectToDatabase;
