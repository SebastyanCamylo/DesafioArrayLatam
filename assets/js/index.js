import { propiedades } from "./propieties.js";
const searchButton = document.querySelector("#searchButton");
const galeria = document.querySelector("#galeria");
const total = document.querySelector("#total");

const cardMaker = (propiedad) =>
  `<div class="card card-box" style="width: 18rem">
    <img src="${propiedad.src}" class="card-img-top" alt="..." />
    <div class="card-body cardBody">
      <h5 class="card-title">${propiedad.nombre}</h5>
      <p class="card-text">
        <div class="info-box">
          <div>
            Cuartos: ${propiedad.cuartos}
          </div>
          <div>
            Metros: ${propiedad.metros}
          </div>
        </div>
        <p>${propiedad.descripcion}</p>
      </p>
      <a href="#" class="btn card-btn">Ver más</a>
    </div>
  </div>`;

const painter = (propiedades) => {
  total.innerHTML = propiedades.length;
  galeria.innerHTML = "";
  galeria.innerHTML = propiedades.reduce((acumulador, propiedad) => {
    return acumulador + cardMaker(propiedad);
  }, "");
};

painter(propiedades);

searchButton.addEventListener("click", () => {
  const rooms = parseInt(document.querySelector("#rooms").value);
  const metterS = parseInt(document.querySelector("#metterS").value);
  const metterU = parseInt(document.querySelector("#metterU").value);

  if (isNaN(rooms) || isNaN(metterS) || isNaN(metterU)) {
    alert("No se aceptan campos en blanco ni letras, Solo se aceptan números");
    return;
  } else if (rooms <= 0 || metterS <= 0 || metterU <= 0) {
    alert("valor minimo: 1");
    return;
  } else if (metterS > metterU) {
    alert("El valor 'desde' no puede ser mayor que el valor 'hasta'");
    return;
  }

  const filteredPropieties = propiedades.filter((propiedad) => {
    const hasRooms = propiedad.cuartos === rooms;
    const hasMetter =
      propiedad.metros >= metterS && propiedad.metros <= metterU;
    return hasMetter && hasRooms;
  });

  if (filteredPropieties.length === 0) {
    alert("Ninguna propiedad coincide con los parámetros de búsqueda");
    return;
  }

  painter(filteredPropieties);
});
