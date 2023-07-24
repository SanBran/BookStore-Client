import React from "react";
import "./Filters.css"

const Demo = ({
  id,
  title,
  author,
  image,
  price,
  gender,
  pages,
  language,
  editorial,
  publicationDate,
}) => {
  return (
      <div key={id} class="item">
      {image === "Image not Available" ? (
        <img
          src="https://images.template.net/wp-content/uploads/2017/02/22085449/Closed-Book-Vector.jpg"
          alter="No se pudo cargar la imagen"
        />
      ) : (
        <img src={image} alter="No se pudo cargar la imagen" />
      )}
      <h1>{title}</h1>
      <p>{author}</p>
      <p>{price}</p>
      <p>{gender}</p>
      <p>{editorial}</p>
    </div>
  );
};

export default Demo;
