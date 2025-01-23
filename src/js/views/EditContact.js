import React, { useEffect, useState, useContext } from "react"; 
// Importamos React junto con los hooks:
// - `useEffect`: para ejecutar código cuando el componente se monta o actualiza.
// - `useState`: para manejar el estado local del componente.
// - `useContext`: para acceder al contexto global de la aplicación.

import { useParams, useNavigate } from "react-router-dom"; 
// Importamos herramientas de React Router:
// - `useParams`: para obtener los parámetros de la URL (en este caso, el ID del contacto).
// - `useNavigate`: para redirigir a otras rutas.

import { Context } from "../store/appContext"; 
// Importamos el contexto global, que contiene el "store" y las "actions".

import { Link } from "react-router-dom"; 
// Importamos `Link` para crear enlaces de navegación.

export const EditContact = () => { 
  // Definimos un componente funcional llamado `EditContact`.
  
  const { store, actions } = useContext(Context); 
  // Obtenemos el "store" (datos globales) y las "actions" (funciones globales) del contexto.

  const params = useParams(); 
  // `params` contiene los parámetros de la URL. En este caso, usamos `params.id` para obtener el ID del contacto a editar.

  const navigate = useNavigate(); 
  // `navigate` permite redirigir al usuario a otra página.

  const [contacto, setContacto] = useState({ 
    // Estado local para almacenar los datos del contacto que se está editando.
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => { 
    // Este efecto se ejecuta cuando el componente se monta o cuando cambian `store.contacts` o `params.id`.
    const contactoAEditar = store.contacts.find(
      (contact) => contact.id === parseInt(params.id) 
      // Busca en los contactos globales el que tenga el mismo ID que el pasado en la URL.
    );

    if (contactoAEditar) {
      setContacto(contactoAEditar); 
      // Si se encuentra el contacto, actualizamos el estado local con sus datos.
    }
  }, [store.contacts, params.id]); 
  // `useEffect` depende de `store.contacts` y `params.id`.

  const handleChange = (e) => { 
    // Función que se ejecuta cuando el usuario modifica un campo del formulario.
    setContacto({ 
      ...contacto, 
      [e.target.name]: e.target.value 
      // Actualizamos el estado del contacto con el nuevo valor del campo modificado.
    });
  };

  const handleSubmit = async (e) => { 
    // Función que se ejecuta al enviar el formulario.
    e.preventDefault(); 
    // Evitamos que la página se recargue.

    await actions.editContact(contacto.id, contacto); 
    // Llamamos a la acción global `editContact` para actualizar el contacto en el servidor o en el "store".

    navigate("/"); 
    // Redirigimos al usuario a la página principal después de guardar los cambios.
  };

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        {/* Formulario para editar un contacto. Al enviar, se ejecuta `handleSubmit`. */}
        <div className="mb-3 px-2">
          {/* Campo para editar el nombre del contacto */}
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={contacto.name || ""} 
            // El valor del input está vinculado al estado local `contacto.name`.
            onChange={handleChange} 
            // Cada vez que el usuario escribe, se ejecuta `handleChange`.
          />
        </div>

        <div className="mb-3 px-2">
          {/* Campo para editar el email del contacto */}
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={contacto.email || ""} 
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 px-2">
          {/* Campo para editar el teléfono del contacto */}
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            className="form-control"
            type="text"
            id="phone"
            name="phone"
            value={contacto.phone || ""} 
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 px-2">
          {/* Campo para editar la dirección del contacto */}
          <label htmlFor="address" className="form-label">Address</label>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            value={contacto.address || ""} 
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {/* Botón para guardar los cambios */}
          Save
        </button>
      </form>
        
      <Link to={"/"} className="bnt mx-3">Return to Home</Link> 
      {/* Enlace para volver a la página principal */}
      
    </div>
  );
};

