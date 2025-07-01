import { useEffect, useState } from "react";
import Form from "./pages/formulario";

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
      .catch((err) => setError("No se pudo obtener la información.", err));
  }, []);

  return (
    <div>
      <h1>Equipos Médicos</h1>
      <Form equipos={equipos} setEquipos={setEquipos} setError={setError} />
      {error && <p>{error}</p>}
      <div style={
        {
          display: "flex",
          flexWrap: "wrap",
          gap: "20px" 
        }
      }>

        {equipos.map((equipo) => (
          <div key={equipo.id}
          style={
          {
            border: `20px solid ${equipo.color}`
        }
        }>
            
            <h2>{equipo.nombre}</h2>
            <p><strong>Marca:</strong> {equipo.marca}</p>
            <p><strong>Uso:</strong> {equipo.uso}</p>
            <p><strong>Especialidad:</strong> {equipo.especializacion}</p>
            <a href={equipo.imagen} target="_blank" rel="noopener noreferrer">
              Ver Imagen
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
