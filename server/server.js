const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock database for form submissions
const submissions = [];

app.post('/api/contact', (req, res) => {
  const { name, email, service, budget, brief } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required.' });
  }

  const newSubmission = {
    id: Date.now(),
    name,
    email,
    service,
    budget,
    brief,
    timestamp: new Date()
  };

  submissions.push(newSubmission);
  console.log('New Submission Received:', newSubmission);

  res.status(201).json({ message: 'Transmission received successfully.', id: newSubmission.id });
});

app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
