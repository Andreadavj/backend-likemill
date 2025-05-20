const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'plan_de_viajes',
    allowExitOnIdle: true
})

const agregarViaje = async (destino, presupuesto) => {
    const consulta = "INSERT INTO viajes values (DEFAULT, $1, $2)"
    const values = [destino, presupuesto]
    const result = await pool.query(consulta, values)
    console.log("Viaje agregado")
}

const obtenerViajes = async () => {
    const { rows } = await pool.query("SELECT * FROM viajes")
    console.log(rows)
    return rows 
}

module.exports = { agregarViaje, obtenerViajes }