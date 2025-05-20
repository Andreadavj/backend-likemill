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

// Ruta GET para obtener posts
app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener los posts:", err);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
});

// Ruta POST para agregar un post
app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *",
      [titulo, url, descripcion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al agregar post:", err);
    res.status(500).json({ message: "Error al agregar post", error: err.message });
  }
});

// Ruta PUT para likes
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al dar like" });
  }
});

// Ruta DELETE para eliminar
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
