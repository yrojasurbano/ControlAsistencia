const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Tu endpoint de asistencia
app.post('/api/marcar', (req, res) => {
    const { dni } = req.body;
    console.log(`🟢 DNI recibido: ${dni}`);
    res.json({ mensaje: 'Asistencia registrada con éxito' });
});

// Leer el certificado y la llave privada
const options = {
    key: fs.readFileSync('192.168.36.38-key.pem'),
    cert: fs.readFileSync('192.168.36.38.pem')
};

// Servidor HTTPS
https.createServer(options, app).listen(3000, () => {
    console.log('🔒 Backend HTTPS corriendo en https://192.168.36.38:3000');
});
