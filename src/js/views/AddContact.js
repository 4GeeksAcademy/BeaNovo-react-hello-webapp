import React from "react";

import "../../styles/home.css";

import { FormContact } from "../component/FormContact";
import { Link } from "react-router-dom";

export const AddContact = () => {
    
    return (

        <div>
           <FormContact/>
           <Link to = {"/"}>return to home</Link>
        </div>

    


    

)}