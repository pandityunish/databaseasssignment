// users.js
const express = require('express');
const router = express.Router();
const db = require('./../app'); 
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password,personnel_id } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.execute('SELECT * FROM personnel WHERE personnel_id = ?', [personnel_id]);
    console.log(rows)
    if (rows.length > 0) {
      const [rows1] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);
      const [rows2] = await db.execute('SELECT * FROM user WHERE personnel_id = ?', [personnel_id]);
      if(rows1.length>0 || rows2.length>0){
        res.status(404).json({ message: 'User already exist' });
      }else{
        const [result] = await db.execute('INSERT INTO user (username, password,personnel_id) VALUES (?, ?,?)', [username, hashedPassword,personnel_id]);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      }
      
        
     
    } else {
      res.status(404).json({ message: 'Your id not found' });;
    }
    // Insert the user into the database
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve the user from the database
    const [rows] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);

    if (rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = rows[0];

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
