import React from "react"; 
// Importamos React para crear componentes con JSX.

import { useContext } from "react"; 
// Importamos `useContext` para acceder al contexto de la aplicación.

import { Context } from "../store/appContext"; 
// Importamos el contexto global de la aplicación para poder usar las acciones y el estado global.

export const Modal = ({ abrirModal, cerrarModal, contactId }) => { 
    // Definimos el componente `Modal`. Recibe tres props:
    // - `abrirModal`: Un booleano que indica si el modal debe mostrarse o no.
    // - `cerrarModal`: Una función para cerrar el modal.
    // - `contactId`: El ID del contacto que se desea eliminar.

    const { actions } = useContext(Context); 
    // Usamos el hook `useContext` para acceder a las acciones globales (como `deleteContact`).

    const handleDelete = async () => { 
        // Función que se ejecuta cuando el usuario confirma la eliminación del contacto.
        console.log("dentro del handle"); // Mensaje para depurar.
        console.log(contactId); // Mostramos el ID del contacto que se va a eliminar.
        
        await actions.deleteContact(contactId); 
        // Llamamos a la acción `deleteContact` del contexto, pasándole el ID del contacto.

        cerrarModal(); 
        // Cerramos el modal después de eliminar el contacto.
    };

    if (!abrirModal) return null; 
    // Si `abrirModal` es `false`, no renderizamos nada (el modal no se muestra en pantalla).

    return (
        // Renderizamos el contenido del modal cuando `abrirModal` es `true`.
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
            {/* La clase `modal show` hace que el modal sea visible.
                El estilo `display: "block"` se usa para forzar que el modal se muestre. */}
            
            <div className="modal-dialog">
                {/* Contenedor del contenido del modal */}
                <div className="modal-content">
                    {/* Contenido principal del modal */}
                    
                    <div className="modal-header">
                        {/* Cabecera del modal */}
                        <h5 className="modal-title">Confirmar eliminación</h5> 
                        {/* Título del modal */}
                        
                        <button
                            type="button"
                            className="btn-close"
                            onClick={cerrarModal}
                            aria-label="Close"
                        >
                        </button>
                        {/* Botón para cerrar el modal. Llama a `cerrarModal` cuando se hace clic. */}
                    </div>
                    
                    <div className="modal-body">
                        {/* Cuerpo del modal */}
                        <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                        {/* Mensaje que solicita confirmación al usuario. */}
                    </div>
                    
                    <div className="modal-footer">
                        {/* Pie del modal con los botones de acción */}
                        
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={cerrarModal}
                        >
                            Cancelar
                        </button>
                        {/* Botón para cancelar la acción y cerrar el modal */}
                        
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                        {/* Botón para confirmar la eliminación. Llama a `handleDelete` al hacer clic. */}
                    </div>
                </div>
            </div>
        </div>
    );
    // Estructura completa del modal que aparece cuando `abrirModal` es `true`.
};

