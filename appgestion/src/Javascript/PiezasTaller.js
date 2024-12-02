import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PiezasTaller = () => {
  const [material, setMaterial] = useState('');
  const [nombre, setNombre] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [piezas, setPiezas] = useState([]);
  const [materiales, setMateriales] = useState([]);

  // Fetch materiales desde la API al cargar el componente
  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materiales');
        console.log('Datos recibidos:', response.data); // Debug log

        // Verifica que los datos sean un array y asigna a `materiales`
        if (Array.isArray(response.data)) {
          // Mapea para asegurarte de que las propiedades están en mayúsculas
          setMateriales(response.data.map(item => ({
            ID_TIPO: item.ID_TIPO,
            NOMBRE: item.NOMBRE
          })));
        } else {
          console.error('La respuesta no es un array:', response.data);
        }
      } catch (error) {
        console.error('Error al cargar los materiales:', error);
      }
    };

    fetchMateriales();
  }, []);

  const handleInsertar = () => {
    const nuevaPieza = {
      id: piezas.length + 1,  // Generamos un nuevo ID
      nombre: nombre,
      fabricante: fabricante,
      id_tipo: material
    };
    setPiezas([...piezas, nuevaPieza]);
    setNombre('');
    setFabricante('');
  };

  const handleBorrar = (id) => {
    setPiezas(piezas.filter((pieza) => pieza.id !== id));
  };

  const handleActualizar = () => {
    setPiezas(piezas.map(pieza => pieza.id === 1 ? { ...pieza, nombre: 'Nuevo nombre' } : pieza));  // Ejemplo para actualizar
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Piezas Taller</h2>
      <div>
        <label>Material</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="">Seleccione el tipo de material</option>
          {materiales.map((mat, index) => (
            // Verifica que `mat` tenga las propiedades esperadas antes de renderizar
            mat && mat.ID_TIPO && mat.NOMBRE ? (
              <option key={index} value={mat.ID_TIPO}>
                {mat.NOMBRE}
              </option>
            ) : (
              <option key={index} value="" disabled>
                Material inválido
              </option>
            )
          ))}
        </select>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>FABRICANTE</th>
            <th>ID_TIPO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {piezas.map((pieza) => (
            <tr key={pieza.id}>
              <td>{pieza.id}</td>
              <td>{pieza.nombre}</td>
              <td>{pieza.fabricante}</td>
              <td>{pieza.id_tipo}</td>
              <td>
                <button onClick={() => handleBorrar(pieza.id)} style={{ backgroundColor: 'red', color: 'white' }}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <div>
          <label>Nombre</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Ingrese nombre"
          />
        </div>
        <div>
          <label>Fabricante</label>
          <input 
            type="text" 
            value={fabricante} 
            onChange={(e) => setFabricante(e.target.value)} 
            placeholder="Ingrese fabricante"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleInsertar}>Insertar</button>
          <button onClick={handleActualizar}>Actualizar</button>
        </div>
      </div>
    </div>
  );
};

export default PiezasTaller;
