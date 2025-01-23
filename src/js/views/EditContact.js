import React, { useEffect, useState, useContext } from "react";
import "../../styles/home.css";
import { FormContact } from "../component/FormContact";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const editContact = () => {
  const {store, action} = useContext(Context)
  const params = useParams()
  const [contacto, setContacto] = useState({})
  useEffect(() => {
    const contactoAEditar = store.contacts.find(contact => contact.id === parseInt(params.id))
    setContacto(contactoAEditar)
  }, [])
  console.log(contacto)
  return (

    <div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 px-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={editContact.name}
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
            value={editContact.email}
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
            value={editContact.phone}
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
            value={editContact.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  
      <Link to={"/"}>return to home</Link>
    </div>





  )
}