
   
// Installing necessary Express modules
const express = require('express');
const path = require('path');
// INstalling modular router "notesRouter"
const notesRouter = require('./routes/notesRouter')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Using modular routing for /api/notes
app.use('/api/notes', notesRouter);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// GET Route for index
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at 🚀http://localhost:${PORT} 🚀`)
);
