const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const cors = require ('cors');
const collection = require('./index');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// app.use(express.static(path.join(__dirname + '/public')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.post('/contact', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('des').notEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, des } = req.body;
    const data = { name, email, des };
    console.log(data);
    const contact = collection(data);

    try {
      await contact.save();
      // res.status(200).json({ message: 'Data saved to MongoDB' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data to MongoDB' });
    }

  });
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
