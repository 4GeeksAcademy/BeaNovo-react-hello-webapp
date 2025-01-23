import React, { useContext } from "react";
import { Card } from "../component/card";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Home = () => {
  const {store} = useContext(Context)
 


  

  

  return (
    
    <div>
      <Link to={"/addcontact"}>
        <button className="btn btn-success ms-3">Añadir contacto</button>
      </Link>
      <div>
        {store.contacts.map((contact, index)=>{
          return(<Card 
            contactId = {contact.id}
          name={contact.name}
          phone={contact.phone}
          email={contact.email}
          address={contact.address}
          id={contact.id}
          key = {index}/>)
        })}
        
      </div>
    </div>
  );
};

