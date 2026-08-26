const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
membership BOOLEAN DEFAULT FALSE,
admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
users_id INTEGER NOT NULL REFERENCES users(id),
title VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log('seeding...')
  const client = new Client({
  connectionString: process.env.DATABASE_URL,

});

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
};

main();

