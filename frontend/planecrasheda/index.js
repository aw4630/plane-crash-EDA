const express = require('express');
const cors = require('cors');
const incidentsRoutes = require('./src/api/incidents');  // Import the incidents routes

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use incidents routes
app.use(incidentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
