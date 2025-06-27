const { obtenerUsuarioPorDNI, marcarAsistencia } = require('../models/asistenciaModel');

async function registrar(req, res) {
  try {
    const { dni } = req.body;
    const usuario = await obtenerUsuarioPorDNI(dni);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'DNI no registrado' });
    }

    const resultado = await marcarAsistencia(dni);
    res.json({ mensaje: resultado });

  } catch (error) {
    console.error('❌ Error en registrar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

module.exports = { registrar };
