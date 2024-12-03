import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/PiezasTaller.css';
import { TiMediaPlayOutline } from "react-icons/ti";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";



const PiezasTaller = () => {
  const [material, setMaterial] = useState('');
  const [nombre, setNombre] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [piezas, setPiezas] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [selectedPieza, setSelectedPieza] = useState(null);
  const navigate = useNavigate();
  const [rolName, setRolName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Obtener el rol del localStorage al cargar el componente
  useEffect(() => {
    const storedRolName = localStorage.getItem('rolName');
    if (storedRolName) {
      setRolName(storedRolName);
    }
  }, []);

  // Fetch materiales desde la API al cargar el componente
  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materiales');
        console.log('Datos recibidos:', response.data); // Debug log

        if (Array.isArray(response.data)) {
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

  // Fetch piezas según el tipo de material
  useEffect(() => {
    if (material) {
      const fetchPiezas = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/piezas/${material}`);
          console.log('Piezas recibidas:', response.data); // Debug log
          setPiezas(response.data);
        } catch (error) {
          console.error('Error al cargar las piezas:', error);
          setPiezas([]); // Si hay un error, asegurarse de limpiar las piezas
        }
      };

      fetchPiezas();
    } else {
      setPiezas([]); // Si no hay material seleccionado, limpiamos las piezas
    }
  }, [material]);

  const handleInsertar = async () => {
    const nuevaPieza = {
      NOMBRE: nombre,
      FABRICANTE: fabricante,
      ID_TIPO: material,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/insertar', nuevaPieza);
      console.log('Pieza insertada:', response.data);
      setPiezas([...piezas, response.data]); // Añadir la nueva pieza a la tabla
    } catch (error) {
      console.error('Error al insertar la pieza:', error);
    }
  };

  // Manejar la selección de una fila para mostrar los datos en los inputs
  const handleRowClick = (pieza) => {
    setNombre(pieza.NOMBRE);
    setFabricante(pieza.FABRICANTE);
    setMaterial(pieza.ID_TIPO); // Establece el tipo de material correspondiente
    setSelectedPieza(pieza); // Establecer la pieza seleccionada
  };

  const handleActualizar = async () => {
    if (!selectedPieza) {
      console.log('No hay pieza seleccionada para actualizar');
      return; // No hay pieza seleccionada para actualizar
    }

    // Crear el objeto con los datos a actualizar
    const updatedPieza = {
      NOMBRE: nombre,
      FABRICANTE: fabricante,
      ID_TIPO: material,  // Este es el tipo de material seleccionado
    };

    console.log('Datos a actualizar:', updatedPieza); // Verifica los datos antes de enviarlos

    try {
      // Realizar la solicitud PUT para actualizar la pieza
      const response = await axios.put(`http://localhost:5000/api/actualizar/${selectedPieza._id}`, updatedPieza);
      console.log('Pieza actualizada:', response.data);

      // Hacer una solicitud GET para obtener la lista de piezas actualizada
      const piezasActualizadas = await axios.get(`http://localhost:5000/api/piezas/${material}`);
      console.log('Piezas actualizadas:', piezasActualizadas.data);

      // Actualizar el estado de las piezas con la lista actualizada
      setPiezas(piezasActualizadas.data);

      // Limpiar los campos de los textbox después de la actualización, pero no cambiar el material
      setNombre('');
      setFabricante('');
      setSelectedPieza(null);

      // No cambiamos el valor del material, lo dejamos como estaba antes
    } catch (error) {
      console.error('Error al actualizar la pieza:', error);
    }
  };

  const handleBorrar = async () => {
    if (!selectedPieza) {
      console.log('No hay pieza seleccionada para borrar');
      return; // No hay pieza seleccionada para borrar
    }

    try {
      // Realizar la solicitud DELETE para borrar la pieza
      const response = await axios.delete(`http://localhost:5000/api/borrar/${selectedPieza._id}`);
      console.log('Pieza borrada:', response.data);

      // Hacer una solicitud GET para obtener la lista de piezas actualizada
      const piezasActualizadas = await axios.get(`http://localhost:5000/api/piezas/${material}`);
      console.log('Piezas actualizadas:', piezasActualizadas.data);

      // Actualizar el estado de las piezas con la lista actualizada
      setPiezas(piezasActualizadas.data);

      // Limpiar los campos de los textbox después de la eliminación, pero no cambiar el material
      setNombre('');
      setFabricante('');
      setSelectedPieza(null);

    } catch (error) {
      console.error('Error al borrar la pieza:', error);
      alert('Hubo un error al eliminar la pieza');
    }
  };

  const handleSalir = () => {
    navigate('/');
  };

  const handleMaterialChange = (e) => {
    setMaterial(e.target.value);
  };

   // Cálculo de la cantidad de páginas
   const totalPages = Math.ceil(piezas.length / rowsPerPage);

   // Obtener los datos para la página actual
   const currentData = piezas.slice(
     (currentPage - 1) * rowsPerPage,
     currentPage * rowsPerPage
   );
 
   // Manejo del cambio de página
   const handlePreviousPage = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
     }
   };
 
   const handleNextPage = () => {
     if (currentPage < totalPages) {
       setCurrentPage(currentPage + 1);
     }
   };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Piezas Taller</h2>
      <div className="material-selection">
        <label>Material</label>
        <select value={material} onChange={handleMaterialChange}>
          <option value="">Seleccione el tipo de material</option>
          {materiales.map((mat, index) => (
            <option key={index} value={mat.ID_TIPO}>
              {mat.NOMBRE}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar tabla solo si hay piezas para el tipo de material seleccionado */}
      {piezas.length > 0 ? (
        <>
          <table className="pieza-table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>FABRICANTE</th>
                <th>ID_TIPO</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((pieza) => (
                <tr key={pieza._id}>
                  <td>
                    <button onClick={() => handleRowClick(pieza)}>
                      <TiMediaPlayOutline />
                    </button>
                  </td>
                  <td>{pieza._id}</td>
                  <td>{pieza.NOMBRE}</td>
                  <td>{pieza.FABRICANTE}</td>
                  <td>{pieza.ID_TIPO}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <HiChevronDoubleLeft />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <HiChevronDoubleRight />
            </button>
          </div>
        </>
      ) : (
        material && <p>No hay piezas disponibles para este material.</p>
      )}
  

      <div className="input-fields">
        <div className="nombre-field">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese nombre"
          />
        </div>
        <div className="fabricante-field">
          <label>Fabricante</label>
          <input
            type="text"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
            placeholder="Ingrese fabricante"
          />
        </div>
      </div>

      <div className="button-group">
        {rolName === 'administrador' && <button onClick={handleInsertar}>Insertar</button>}
        {rolName === 'administrador' && <button onClick={handleActualizar}>Actualizar</button>}
        {rolName === 'administrador' && <button onClick={handleBorrar}>Borrar</button>}
        <button onClick={handleSalir}>Salir</button>
      </div>
    </div>
  );
};

export default PiezasTaller;
