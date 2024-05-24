const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Ruta para el registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (password !== '1234') {
    return res.status(400).send('Clave incorrecta');
  }

  let users = JSON.parse(fs.readFileSync('datos.json', 'utf-8'));
  if (users.find(user => user.username === username)) {
    return res.status(400).send('Usuario ya registrado');
  }

  users.push({ username, password });
  fs.writeFileSync('datos.json', JSON.stringify(users, null, 2));
  res.status(200).send('Registro exitoso');
});

// Ruta para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let users = JSON.parse(fs.readFileSync('datos.json', 'utf-8'));
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    res.status(200).send('Login exitoso');
  } else {
    res.status(400).send('Credenciales incorrectas');
  }
});

// Ruta para crear QR y guardar escaneos
app.post('/create-qr', (req, res) => {
  const { username, link, name } = req.body;
  let qrs = JSON.parse(fs.readFileSync('registros.json', 'utf-8'));
  
  const newQr = { username, link, name, created_at: new Date().toISOString(), scans: [] };
  qrs.push(newQr);
  
  fs.writeFileSync('registros.json', JSON.stringify(qrs, null, 2));
  res.status(200).send('QR creado exitosamente');
});

// Ruta para escanear QR
app.post('/scan-qr', (req, res) => {
  const { name } = req.body;
  let qrs = JSON.parse(fs.readFileSync('registros.json', 'utf-8'));
  
  const qr = qrs.find(qr => qr.name === name);
  if (qr) {
    qr.scans.push({ date: new Date().toISOString() });
    fs.writeFileSync('registros.json', JSON.stringify(qrs, null, 2));
    res.status(200).send('Escaneo registrado');
  } else {
    res.status(400).send('QR no encontrado');
  }
});

// Servir frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

