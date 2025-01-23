import React, { useActionState, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const FormContact = () => {
  const {actions} = useContext(Context)
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({
    name:"", 
    phone:"",
    email:"",
    address:""

  })
  
  const handleSubmit= (e)=> {
  
    e.preventDefault()
    actions.agregarContacto(newContact)
    navigate("/")
    
  }

  const handleChange = (e)=> {
    setNewContact({...newContact, [e.target.name]: e.target.value})

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 px-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={newContact.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 px-2">
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
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            className="form-control"
            type="text"
            id="phone"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 px-2">
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
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};
