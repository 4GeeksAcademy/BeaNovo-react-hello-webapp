import React, { useContext } from "react"; 
// Importamos React y el hook `useContext` para acceder al contexto global de la aplicación.

import { Card } from "../component/card"; 
// Importamos el componente `Card`, que representa un contacto en forma de tarjeta.

import { Link } from "react-router-dom"; 
// Importamos `Link` para crear enlaces de navegación hacia otras vistas.

import { Context } from "../store/appContext"; 
// Importamos el contexto global para acceder al "store" (datos) y las "actions" (funciones).

export const Home = () => { 
  // Definimos un componente funcional llamado `Home`, que representa la página principal.

  const { store } = useContext(Context); 
  // Extraemos el "store" del contexto global. Este contiene la lista de contactos.

  return (
    <div>
      <Link to={"/addcontact"}>
        {/* Enlace que lleva al usuario a la vista para agregar un nuevo contacto */}
        <button className="btn btn-success ms-4 mt-3">
          Añadir contacto
        </button>
      </Link>

      <div>
        {store.contacts.map((contact, index) => {
          // Iteramos sobre la lista de contactos almacenada en `store.contacts`.
          return (
            <Card 
              contactId={contact.id} 
              // Pasamos `id` del contacto al componente `Card` para manejar acciones como eliminar.
              name={contact.name} 
              // Pasamos el nombre del contacto como propiedad a `Card`.
              phone={contact.phone} 
              // Pasamos el teléfono del contacto como propiedad.
              email={contact.email} 
              // Pasamos el correo electrónico del contacto.
              address={contact.address} 
              // Pasamos la dirección del contacto.
              id={contact.id} 
              // Pasamos el ID del contacto como propiedad única.
              key={index} 
              // Usamos el índice del contacto como clave para optimizar el renderizado.
            />
          );
        })}
      </div>
    </div>
  );
};
