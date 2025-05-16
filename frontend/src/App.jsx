import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";  // Asegúrate de que la URL esté correcta

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  // Obtener los posts desde el servidor
  const getPosts = async () => {
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts]);
  };

  // Agregar un post nuevo
  const agregarPost = async () => {
    const post = { titulo, url: imgSrc, descripcion }; // 👍 Está correcto

    await axios.post(urlBaseServer + "/posts", post);
    getPosts();  // Recargar los posts después de agregar uno nuevo
  };

  // Función para dar like a un post
  const like = async (id) => {
    try {
      await axios.put(`${urlBaseServer}/posts/like/${id}`);
      getPosts();  // Recargar los posts después de dar like
    } catch (err) {
      console.error("Error al dar like:", err);
    }
  };

  // Función para eliminar un post
  const eliminarPost = async (id) => {
    try {
      await axios.delete(`${urlBaseServer}/posts/${id}`);
      getPosts();  // Recargar los posts después de eliminar
    } catch (err) {
      console.error("Error al eliminar el post:", err);
    }
  };

  // Obtener los posts al cargar la página
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}  // Pasar la función like a Post
              eliminarPost={eliminarPost}  // Pasar la función eliminarPost a Post
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
