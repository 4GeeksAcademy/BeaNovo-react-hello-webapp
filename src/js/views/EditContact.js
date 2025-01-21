import React, { useEffect, useState, useContext } from "react";
import "../../styles/home.css";
import { FormContact } from "../component/FormContact";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
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
      <FormContact />
      <Link to={"/"}>return to home</Link>
    </div>





  )
}