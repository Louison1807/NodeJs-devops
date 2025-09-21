const express = require('express');
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '',
  user: '',
  password: '',
  database: 'mybooks',
});

const app = express();
app.use(express.json());

// Create a book
app.post('/books', (req, res) => {
  const { author, title, isbn } = req.body;
  const sql = 'INSERT INTO mybook (author, title, isbn) VALUES (?, ?, ?)';
  pool.query(sql, [author, title, isbn], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to create book' });
    } else {
      res.status(201).json({ message: 'Book created successfully' });
    }
  });
});

// Get all books
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM mybook';
  pool.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to retrieve books' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const sql = 'SELECT * FROM mybook WHERE id = ?';
  pool.query(sql, [bookId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to retrieve book' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const { author, title, isbn } = req.body;
  const sql = 'UPDATE mybook SET author = ?, title = ?, isbn = ? WHERE id = ?';
  pool.query(sql, [author, title, isbn, bookId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to update book' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json({ message: 'Book updated successfully' });
    }
  });
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const sql = 'DELETE FROM mybook WHERE id = ?';
  pool.query(sql, [bookId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to delete book' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else     {
      res.status(200).json({ message: 'Book deleted successfully' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

