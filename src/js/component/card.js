import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";


export const Card = ({
  contactId,
  name,
  phone,
  email,
  address,
  id
}) => {
 
  const [abrirModal, setAbrirModal] = useState (false);
  const clickAbrirModal = () => { // función para abrir el modal
    setAbrirModal (true);
  };
  
  const cerrarModal = () => {
    setAbrirModal (false);

  };
  console.log("estoy dentro del card");
  
console.log(contactId);

  
  return (
<div>
    <div className="card ms-4 mx-auto mt-3"  style={{maxWidth: "540px"}}>
    <div className="row g-0">
      <div className="col-md-4">
        <img src="https://static.wikia.nocookie.net/thebigbangtheory/images/d/d0/Sheldon_Spray.jpg/revision/latest?cb=20120722100140&path-prefix=es" className="img-fluid rounded-start" alt="..."/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Name:<span>{name}</span></p>
          <p className="card-text">Phone:<span>{phone}</span></p>
          <p className="card-text">Email:<span>{email}</span></p>
          <p className="card-text">Address:<span>{address}</span></p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div> 
      </div>
      <button className="btn btn-position-absolute bottom-0 end-0" onClick={clickAbrirModal}>eliminar</button>
      <Link to ={`/editContact/${id}`}><button className="btn btn-primary">editar contacto</button></Link>

    </div>
    
  </div>
  <Modal abrirModal={abrirModal} cerrarModal={cerrarModal} contactId={contactId}/>
  </div>

  
);

};
