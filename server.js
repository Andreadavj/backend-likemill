import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión con PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: 'localhost',
  database: process.env.DB_NAME || 'likeme',
  password: process.env.DB_PASSWORD || 'amanda', 
  port: 5432,
});

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de LikeMe!");
});

// Ruta GET para obtener los posts
app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener los posts:", err);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
});

// Ruta PUT para modificar los likes
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.json({ post: rows[0] });
  } catch (err) {
    console.error("Error al actualizar likes:", err);
    res.status(500).json({ message: "Error al actualizar el post", error: err.message });
  }
});

// Ruta DELETE para eliminar un post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.json({ message: "Post eliminado con éxito" });
  } catch (err) {
    console.error("Error al eliminar el post:", err);
    res.status(500).json({ message: "Error al eliminar el post", error: err.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
