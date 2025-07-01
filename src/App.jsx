import { useEffect, useState } from "react";
import Form from "./pages/formulario";
import "./App.css";

function App() {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/equipos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los datos");
        return res.json();
      })
      .then((data) => setEquipos(data))
      .catch((err) =>
        setError("No se pudo obtener la información. " + err.message)
      );
  }, []);

  return (
    <div id="root">
      <h1>Equipos Médicos</h1>

      <Form equipos={equipos} setEquipos={setEquipos} setError={setError} />

      {error && <p className="read-the-docs">{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {equipos.map((equipo) => (
          <div key={equipo.id} className="card" style={{ borderTop: `8px solid ${equipo.color}` }}>
            <h2>{equipo.nombre}</h2>
            <p><strong>Marca:</strong> {equipo.marca}</p>
            <p><strong>Uso:</strong> {equipo.uso}</p>
            <p><strong>Especialidad:</strong> {equipo.especializacion}</p>
            <a className="button" href={equipo.imagen} target="_blank" rel="noopener noreferrer">
              Ver Imagen
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
