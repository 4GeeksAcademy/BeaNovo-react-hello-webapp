import React, { useContext, useState } from "react"; 
// Importamos React y dos hooks:
// - `useContext` permite acceder al contexto global de la aplicación.
// - `useState` permite gestionar el estado interno de este componente.

import { useNavigate } from "react-router-dom"; 
// Importamos `useNavigate` de React Router para redirigir al usuario después de guardar el contacto.

import { Context } from "../store/appContext"; 
// Importamos el contexto global de la aplicación, que contiene el "store" y las "actions".

export const FormContact = () => { 
  // Definimos un componente funcional llamado `FormContact`.
  // Este componente renderiza un formulario para agregar o editar contactos.

  const { actions } = useContext(Context); 
  // Extraemos las "actions" del contexto global para usarlas aquí (en este caso, `agregarContacto`).

  const navigate = useNavigate(); 
  // Creamos una instancia de `useNavigate` para navegar a otras páginas.

  const [newContact, setNewContact] = useState({ 
    // Creamos un estado local para manejar los datos del nuevo contacto.
    name: "", 
    phone: "",
    email: "",
    address: ""
  });

  const handleSubmit = (e) => { 
    // Función que se ejecuta cuando el usuario envía el formulario.
    e.preventDefault(); 
    // Evita que la página se recargue al enviar el formulario.

    actions.agregarContacto(newContact); 
    // Llamamos a la acción `agregarContacto` para guardar el nuevo contacto en el servidor o el "store".

    navigate("/"); 
    // Redirigimos al usuario a la página de inicio después de guardar el contacto.
  };

  const handleChange = (e) => { 
    // Función que se ejecuta cuando el usuario escribe en un campo del formulario.
    setNewContact({
      ...newContact, 
      [e.target.name]: e.target.value 
      // Actualizamos el estado `newContact` con el valor del campo que se está editando.
      // `[e.target.name]` usa el atributo `name` del input para identificar qué campo se está editando.
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        {/* Al enviar el formulario, se ejecuta `handleSubmit`. */}

        <div className="mb-3 px-2">
          {/* Campo para ingresar el nombre del contacto */}
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={newContact.name} 
            // El valor del input se vincula con el estado `newContact.name`.
            onChange={handleChange} 
            // Al escribir, se ejecuta `handleChange` para actualizar el estado.
          />
        </div>

        <div className="mb-3 px-2">
          {/* Campo para ingresar el email del contacto */}
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={newContact.email} 
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 px-2">
          {/* Campo para ingresar el teléfono del contacto */}
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            className="form-control"
            type="number"
            id="phone"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 px-2">
          {/* Campo para ingresar la dirección del contacto */}
          <label htmlFor="address" className="form-label">Address</label>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            value={newContact.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mx-3">
          {/* Botón para enviar el formulario */}
          Save
        </button>
      </form>
    </div>
  );
};
