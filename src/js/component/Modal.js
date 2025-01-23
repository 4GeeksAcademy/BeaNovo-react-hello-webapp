import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Modal = ({ abrirModal, cerrarModal, contactId }) => {
    const { actions } = useContext(Context);
   
    

    const handleDelete = async () => {
        console.log("dentro del handle");
        console.log(contactId);
        
        
        
        await actions.deleteContact(contactId);
        cerrarModal(); // Cierra el modal después de eliminar
    };

    if (!abrirModal) return null;

    return (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar eliminación</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={cerrarModal}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
