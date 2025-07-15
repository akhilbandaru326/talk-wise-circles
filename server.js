const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// In-memory storage for messages (temporary)
let messages = [];

// Middleware
app.use(cors({
  origin: 'https://talk-wise-circles.vercel.app',
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// POST route to add a message
app.post('/api/message', (req, res) => {
  try {
    const { name, message } = req.body;
    
    // Basic validation
    if (!name || !message) {
      return res.status(400).json({ 
        error: 'Name and message are required' 
      });
    }

    // Create new message object
    const newMessage = {
      id: Date.now(), // Simple ID generation
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    // Add to in-memory storage
    messages.push(newMessage);

    res.status(201).json({
      success: true,
      message: 'Message added successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// GET route to retrieve all messages
app.get('/api/messages', (req, res) => {
  try {
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
