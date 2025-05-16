import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Post({
  post: { id, titulo, img, descripcion, likes },
  like,
  eliminarPost,
}) {
  return (
    <div className="card col-12 col-sm-4 d-inline mx-0 px-3">
      <div className="card-body p-0">
        <img
          className="card-img-top"
          src={img}
          alt={titulo} // Agregar atributo alt para accesibilidad
        />
        <div className="p-3">
          <h4 className="card-title">{titulo}</h4>
          <p className="card-text">{descripcion}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {/* Botón para like */}
              <i
                onClick={() => like(id)}
                className={`fa-heart fa-xl ${
                  likes > 0 ? "fa-solid" : "fa-regular"
                }`}
              />

              <span className="ms-1">{likes}</span>
            </div>
            {/* Botón para eliminar */}
            <i
              onClick={() => eliminarPost(id)} // Llamada a la función eliminarPost con el id del post
              className="fa-solid fa-x"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
