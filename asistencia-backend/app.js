require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const marcacionRoutes = require('./routes/marcacion');

app.use(bodyParser.json());
app.use('/api', marcacionRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, '../asistencia-front')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
