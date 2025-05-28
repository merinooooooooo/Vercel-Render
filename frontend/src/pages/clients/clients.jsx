import React, { useState, useEffect } from "react";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    edad: "",
    paisDeResidencia: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Obtener todos los clientes
  const fetchClients = async () => {
    try {
      const res = await fetch("https://vercel-render-mx3j.onrender.com/api/clients");
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "edad" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, correo, contraseña, edad, paisDeResidencia } = formData;

    if (!nombre || !correo || !contraseña || edad === "" || !paisDeResidencia) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const method = editIndex !== null ? "PUT" : "POST";
      const url =
        editIndex !== null
          ? `https://vercel-render-mx3j.onrender.com/api/clients/${clients[editIndex]._id}`
          : "https://vercel-render-mx3j.onrender.com/api/clients";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || (editIndex !== null ? "Cliente actualizado" : "Cliente creado"));
        setFormData({ nombre: "", correo: "", contraseña: "", edad: "", paisDeResidencia: "" });
        setEditIndex(null);
        fetchClients();
      } else {
        alert("Error: " + (data.message || "Intenta nuevamente."));
      }
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      alert("Ocurrió un error al guardar el cliente.");
    }
  };

  const handleEdit = (index) => {
    const clients = clients[index];
    setFormData({
      nombre: clients.nombre,
      correo: clients.correo,
      contraseña: "", // No mostrar la contraseña en edición
      edad: clients.edad,
      paisDeResidencia: clients.paisDeResidencia,
    });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      const id = clients[index]._id;
      try {
        const res = await fetch(`https://vercel-render-mx3j.onrender.com/api/clients/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        alert(data.message || "Cliente eliminado");
        fetchClients();
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        alert("Ocurrió un error al eliminar el cliente.");
      }
    }
  };

  return (
    <div className="container my-4">
      <h2>{editIndex !== null ? "Editar Cliente" : "Registrar Cliente"}</h2>

      <form onSubmit={handleSubmit} className="row g-3 w-75">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">País de Residencia</label>
          <input
            type="text"
            className="form-control"
            name="paisDeResidencia"
            value={formData.paisDeResidencia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? "Actualizar Cliente" : "Guardar Cliente"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFormData({ nombre: "", correo: "", contraseña: "", edad: "", paisDeResidencia: "" });
                setEditIndex(null);
              }}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <hr className="my-5" />

      <h3>Lista de Clientes</h3>
      {clients.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Edad</th>
              <th>País de Residencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((clients, index) => (
              <tr key={clients._id}>
                <td>{clients.nombre}</td>
                <td>{clients.correo}</td>
                <td>{clients.edad}</td>
                <td>{clients.paisDeResidencia}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
