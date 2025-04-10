const db = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * User model with CRUD operations
 */
const User = {
  /**
   * Create a new user
   * @param {Object} userData - User data object
   * @returns {Object} Created user
   */
  async create(userData) {
    const { name, email, password, phone, role = 'customer' } = userData;
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // SQL query to insert a new user
    const query = `
      INSERT INTO users (name, email, password, phone, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, name, email, phone, role, created_at
    `;
    
    const values = [name, email, hashedPassword, phone, role];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Find a user by email
   * @param {String} email - User email
   * @returns {Object|null} User object or null if not found
   */
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await db.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Find a user by ID
   * @param {Number} id - User ID
   * @returns {Object|null} User object or null if not found
   */
  async findById(id) {
    const query = 'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1';
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Update a user
   * @param {Number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Object} Updated user
   */
  async update(id, userData) {
    const { name, email, phone } = userData;
    
    const query = `
      UPDATE users
      SET name = $1, email = $2, phone = $3, updated_at = NOW()
      WHERE id = $4
      RETURNING id, name, email, phone, role, created_at
    `;
    
    const values = [name, email, phone, id];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Update user password
   * @param {Number} id - User ID
   * @param {String} password - New password
   * @returns {Boolean} Success status
   */
  async updatePassword(id, password) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = `
      UPDATE users
      SET password = $1, updated_at = NOW()
      WHERE id = $2
    `;
    
    try {
      await db.query(query, [hashedPassword, id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Compare password with hashed password in database
   * @param {String} password - Plain text password
   * @param {String} hashedPassword - Hashed password from database
   * @returns {Boolean} True if passwords match
   */
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },
  
  /**
   * Get all users (admin only)
   * @param {Number} limit - Number of users to fetch
   * @param {Number} offset - Offset for pagination
   * @returns {Array} Array of users
   */
  async getAll(limit = 10, offset = 0) {
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
  },
  
  /**
   * Get total count of users
   * @returns {Number} Total count of users
   */
  async getTotalCount() {
    const query = 'SELECT COUNT(*) AS total FROM users';
    
    try {
      const result = await db.query(query);
      return parseInt(result.rows[0].total);
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Delete a user
   * @param {Number} id - User ID
   * @returns {Boolean} Success status
   */
  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    
    try {
      await db.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User; 