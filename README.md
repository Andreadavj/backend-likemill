# React + Vite


# 📸 LikeMe - Proyecto Full Stack con React y Express

Aplicación web para publicar, eliminar y dar "like" a imágenes tipo red social.

---

## 🚀 Tecnologías utilizadas

- **Frontend:** React + Vite + Axios + Font Awesome
- **Backend:** Node.js + Express + PostgreSQL
- **Base de datos:** PostgreSQL
- **Otros:** dotenv, CORS

---

## 📁 Estructura del proyecto
backend-likemill/
├── backend/ # Servidor Express (API)
└── frontend/ # Aplicación React (Cliente)


---

## ✅ Requisitos previos

- Node.js y npm
- PostgreSQL instalado y corriendo
- Una base de datos llamada `likeme` creada

---

## 🔧 Paso a paso para ejecutar el proyecto

### 1️⃣ Backend (Puerto 3000)

#### 📌 Preparación

1. Abre terminal y ve a la carpeta `backend`:

   ```bash
   cd backend
Instala dependencias:

bash
Copiar
Editar
npm install
Agrega en package.json:

json
Copiar
Editar
"type": "module"
Crea la base de datos en PostgreSQL y la tabla posts:

sql
Copiar
Editar
CREATE DATABASE likeme;

\c likeme

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100),
  img TEXT,
  descripcion TEXT,
  likes INT DEFAULT 0
);
Corre el backend:

bash
Copiar
npm run dev
Deberías ver el mensaje:


Copiar

🚀 Servidor corriendo en http://localhost:3000
2️⃣ Frontend (Puerto 5173)
📌 Preparación
En otra terminal, ve a la carpeta frontend:

bash
Copiar

cd frontend
Instala dependencias:

npm install
Instala Font Awesome (si no lo has hecho):

npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
Corre el frontend:

npm run dev

Accede a la app en:


Copiar
Editar
http://localhost:5173/
🔁 Funcionalidades
Ver todos los posts (GET /posts)

Crear un nuevo post (POST /posts)

Dar like a un post (PUT /posts/like/:id)

Eliminar un post (DELETE /posts/:id)

⚠️ Problemas comunes
❌ ERR_CONNECTION_REFUSED: Asegúrate de que el backend esté corriendo en el puerto 3000.

❌ Iconos FontAwesome no cargan: Ejecuta npm install @fortawesome/... en el frontend.

❌ AxiosError: Verifica que las rutas del backend estén correctas y no haya errores en la base de datos.

✅ Estado final
 Backend funcionando con Express y PostgreSQL

 Frontend conectado con Axios

 CRUD funcional

 Interfaz limpia con React

👩‍💻 Autor
Doris Valverde Jara
Frontend Developer 💻
andreadavj.github.io
