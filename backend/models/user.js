const db = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * User model with CRUD operations
 */
class User {
  /**
   * Create a new user
   * @param {Object} userData - User data object
   * @returns {Object} Created user
   */
  static async create({ name, email, password, phone }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, phone]
    );
    return result.rows[0];
  }
  
  /**
   * Find a user by email
   * @param {String} email - User email
   * @returns {Object|null} User object or null if not found
   */
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }
  
  /**
   * Find a user by ID
   * @param {Number} id - User ID
   * @returns {Object|null} User object or null if not found
   */
  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  /**
   * Update a user
   * @param {Number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Object} Updated user
   */
  static async update(id, { name, email, phone }) {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
      [name, email, phone, id]
    );
    return result.rows[0];
  }
  
  /**
   * Update user password
   * @param {Number} id - User ID
   * @param {String} password - New password
   * @returns {Boolean} Success status
   */
  static async updatePassword(id, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, id]
    );
  }
  
  /**
   * Compare password with hashed password in database
   * @param {String} password - Plain text password
   * @param {String} hashedPassword - Hashed password from database
   * @returns {Boolean} True if passwords match
   */
  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  
  /**
   * Get all users (admin only)
   * @param {Number} limit - Number of users to fetch
   * @param {Number} offset - Offset for pagination
   * @returns {Array} Array of users
   */
  static async getAll(limit = 10, offset = 0) {
    const query = `
      SELECT id, name, email, phone, role, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    
    try {
      const result = await db.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get total count of users
   * @returns {Number} Total count of users
   */
  static async getTotalCount() {
    const query = 'SELECT COUNT(*) AS total FROM users';
    
    try {
      const result = await db.query(query);
      return parseInt(result.rows[0].total);
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Delete a user
   * @param {Number} id - User ID
   * @returns {Boolean} Success status
   */
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    
    try {
      await db.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User; 