const pool = require('./pool.js');

async function showAllMessages() {
  const { rows } = await pool.query('SELECT messages.*, users.username FROM messages JOIN users ON messages.users_id=users.id');
  return rows;
};

async function showMessage(id) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
  return rows[0];
};

async function createUser(username, email, password_hash, created_at, membership) {
  const { rows } = await pool.query('INSERT INTO users (username, email, password_hash, created_at, membership) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [username, email, password_hash, created_at, membership]
  );
  return rows[0];
};

async function createMessage(users_id, title, description) {
  const { rows } = await pool.query('INSERT INTO messages (title, description, users_id) VALUES($1, $2, $3) RETURNING *', 
    [title, description, users_id]
  );
  return rows[0];
};

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', 
    [username]
  );
  return rows;
};

async function updateMemberShip(id) {
  const { rows } = await pool.query('UPDATE users SET membership = TRUE WHERE id = $1 RETURNING *', 
    [id]
  );
  return rows[0];
};

async function deleteMessage(id) {
  const { rows } = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', 
    [id]
  );
  return rows[0];
};

async function updateAdmin(id) {
  await pool.query(
    'UPDATE users SET admin = true WHERE id = $1',
    [id]
  );
}

module.exports = {
  showAllMessages,
  showMessage,
  createUser,
  createMessage,
  getUserByUsername,
  updateMemberShip,
  deleteMessage,
  updateAdmin
};