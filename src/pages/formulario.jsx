import { useState } from "react";

function Form({ equipos, setEquipos, setError }) {
  const [nuevoEquipo, setNuevoEquipo] = useState({
    nombre: "",
    marca: "",
    uso: "",
    especializacion: "",
    imagen: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEquipo({ ...nuevoEquipo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/equipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoEquipo)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar el equipo");
        return res.json();
      })
      .then((data) => {
        setEquipos([...equipos, data]);
        setNuevoEquipo({
          nombre: "",
          marca: "",
          uso: "",
          especializacion: "",
          imagen: ""
        });
        setError("");
      })
      .catch((err) => setError("Error al agregar el equipo.", err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input name="nombre" placeholder="Nombre" value={nuevoEquipo.nombre} onChange={handleChange} required />
      <input name="marca" placeholder="Marca" value={nuevoEquipo.marca} onChange={handleChange} required />
      <input name="uso" placeholder="Uso" value={nuevoEquipo.uso} onChange={handleChange} required />
      <input name="especializacion" placeholder="Especialización" value={nuevoEquipo.especializacion} onChange={handleChange} required />
      <input name="imagen" placeholder="URL de Imagen" value={nuevoEquipo.imagen} onChange={handleChange} required />
      <button type="submit">Agregar Equipo</button>
    </form>
  );
}

export default Form;
