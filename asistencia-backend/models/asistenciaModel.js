const { poolPromise, sql } = require('../db/sqlserver');

async function obtenerUsuarioPorDNI(dni) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('dni', sql.Char(8), dni)
    .query('SELECT * FROM dbo.TB_USUARIOS WHERE dni = @dni');
  return result.recordset[0];
}

async function marcarAsistencia(dni) {
  const pool = await poolPromise;

  const today = new Date().toISOString().split('T')[0];

  const check = await pool.request()
    .input('dni', sql.Char(8), dni)
    .input('fecha', sql.Date, today)
    .query(`
      SELECT * FROM dbo.RegistroAsistencia 
      WHERE dni = @dni AND fecha = @fecha
    `);

  if (check.recordset.length === 0) {
    // Entrada
    await pool.request()
      .input('dni', sql.Char(8), dni)
      .query('INSERT INTO dbo.RegistroAsistencia (dni, hora_entrada) VALUES (@dni, CONVERT(TIME, GETDATE()))');
    return 'Entrada registrada';
  } else if (!check.recordset[0].hora_salida) {
    // Salida
    await pool.request()
      .input('dni', sql.Char(8), dni)
      .input('fecha', sql.Date, today)
      .query(`
        UPDATE dbo.RegistroAsistencia 
        SET hora_salida = CONVERT(TIME, GETDATE()) 
        WHERE dni = @dni AND fecha = @fecha
      `);
    return 'Salida registrada';
  } else {
    return 'Ya se registró entrada y salida hoy.';
  }
}

module.exports = { obtenerUsuarioPorDNI, marcarAsistencia };
