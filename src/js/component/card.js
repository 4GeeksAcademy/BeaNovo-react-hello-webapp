import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { FaTrash, FaEdit } from "react-icons/fa";

export const Card = ({ id, name, phone, email, address }) => {
  const [abrirModal, setAbrirModal] = useState(false);

  const clickAbrirModal = () => {
    setAbrirModal(true); // Abre el modal
  };

  const cerrarModal = () => {
    setAbrirModal(false); // Cierra el modal
  };

  return (
    <div>
      <div className="card ms-4 mx-auto mt-3" style={{ maxWidth: "600px" }}>
        <div className="row g-0">
          {/* Imagen del contacto */}
          <div className="col-md-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqlFW0lZ_3Zjhxzdw8yO-pZFM4qcQJYPIKA&s"
              className="img-fluid rounded-start"
              alt=""
            />
          </div>

          {/* Detalles del contacto */}
          <div className="col-md-8">
            <div className="card-body">
              {/* Línea para el nombre y botón de editar */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-2">{name}</h5>
                <Link to={`/editContact/${id}`} className="text-dark">
                  <FaEdit size={20} title="Editar contacto" />
                </Link>
              </div>

              {/* Línea para el teléfono y botón de eliminar */}
              <div className="d-flex justify-content-between align-items-center">
                <p className="card-text mb-2">
                  <strong>Phone:</strong> {phone}
                </p>
                <button
                  className="btn btn-link p-0 text-dark"
                  onClick={clickAbrirModal}
                  title="Eliminar contacto"
                >
                  <FaTrash size={20} />
                </button>
              </div>

              {/* Otros detalles */}
              <p className="card-text mb-2">
                <strong>Email:</strong> {email}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {address}
              </p>
              <p className="card-text mt-5">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para confirmación */}
      <Modal abrirModal={abrirModal} cerrarModal={cerrarModal} contactId={id} />
    </div>
  );
};
