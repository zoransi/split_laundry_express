require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function initializeDatabase() {
  try {
    // Read schema file
    const schemaPath = path.join(__dirname, '../config/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await pool.query(schema);
    console.log('Database schema initialized successfully');

    // Insert initial services
    const services = [
      {
        name: 'Wash & Fold',
        description: 'Regular laundry service with washing, drying, and folding',
        price: 2.50
      },
      {
        name: 'Dry Cleaning',
        description: 'Professional dry cleaning service for delicate items',
        price: 5.00
      },
      {
        name: 'Ironing',
        description: 'Professional ironing service for your clothes',
        price: 3.00
      }
    ];

    for (const service of services) {
      await pool.query(
        'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [service.name, service.description, service.price]
      );
    }
    console.log('Initial services added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 