import React, { useState, useEffect } from 'react';

const Games = () => {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    ApMinima: '',
    ApMaxima: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  // Obtener todos los juegos
  const fetchGames = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/games');
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error('Error al cargar los juegos:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'ApMinima' || name === 'ApMaxima' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, categoria, ApMinima, ApMaxima } = formData;

    if (!nombre || !categoria || ApMinima === '' || ApMaxima === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const url =
        editIndex !== null
          ? `http://localhost:4000/api/games/${games[editIndex]._id}`
          : 'http://localhost:4000/api/games';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || (editIndex !== null ? 'Juego actualizado' : 'Juego creado'));

      setFormData({ nombre: '', categoria: '', ApMinima: '', ApMaxima: '' });
      setEditIndex(null);
      fetchGames();
    } catch (error) {
      console.error('Error al guardar el juego:', error);
      alert('Ocurrió un error al guardar el juego.');
    }
  };

  const handleEdit = (index) => {
    const game = games[index];
    setFormData({
      nombre: game.nombre,
      categoria: game.categoria,
      ApMinima: game.ApMinima,
      ApMaxima: game.ApMaxima,
    });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      const id = games[index]._id;
      try {
        const res = await fetch(`http://localhost:4000/api/games/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        alert(data.message || 'Juego eliminado');
        fetchGames();
      } catch (error) {
        console.error('Error al eliminar el juego:', error);
        alert('Ocurrió un error al eliminar el juego.');
      }
    }
  };

  return (
    <div className="container my-4">
      <h2>{editIndex !== null ? 'Editar Juego' : 'Registrar Juego'}</h2>

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
          <label className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Apuesta Mínima</label>
          <input
            type="number"
            className="form-control"
            name="ApMinima"
            value={formData.ApMinima}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Apuesta Máxima</label>
          <input
            type="number"
            className="form-control"
            name="ApMaxima"
            value={formData.ApMaxima}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? 'Actualizar Juego' : 'Guardar Juego'}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFormData({ nombre: '', categoria: '', ApMinima: '', ApMaxima: '' });
                setEditIndex(null);
              }}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <hr className="my-5" />

      <h3>Lista de Juegos</h3>
      {games.length === 0 ? (
        <p>No hay juegos registrados.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Apuesta Mínima</th>
              <th>Apuesta Máxima</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game._id}>
                <td>{game.nombre}</td>
                <td>{game.categoria}</td>
                <td>{game.ApMinima}</td>
                <td>{game.ApMaxima}</td>
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

export default Games;
