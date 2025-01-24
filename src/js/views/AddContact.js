import React from "react"; 
// Importamos React, que es necesario para usar JSX y crear componentes.

import "../../styles/home.css"; 
// Importamos un archivo CSS específico para aplicar estilos a esta vista.

import { FormContact } from "../component/FormContact"; 
// Importamos el componente `FormContact`, que probablemente contiene el formulario para agregar o editar contactos.

import { Link } from "react-router-dom"; 
// Importamos `Link` de React Router, que se usa para crear enlaces de navegación dentro de la aplicación.

export const AddContact = () => { 
    // Definimos un componente funcional llamado `AddContact`.
    // Este componente se usará para mostrar el formulario para agregar un nuevo contacto.

    return (
        // El JSX que se retorna define la estructura visual del componente.
        <div className="mx-3">
            {/* Incluimos el componente `FormContact` para mostrar el formulario de contacto. */}
            <FormContact /> 
            
            {/* Usamos el componente `Link` para crear un enlace que redirige al usuario a la página de inicio. */}
            <Link to={"/"}>Return to home</Link> 
            {/* `to={"/"}` indica que al hacer clic, el usuario será llevado a la ruta "/" (inicio). */}
        </div>
    );
};
