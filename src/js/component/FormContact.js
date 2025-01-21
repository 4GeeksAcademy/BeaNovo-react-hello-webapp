import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const agregarContacto = (e) => {
    e.preventDefault(); // Evita recargar la página

    const datos = {
      name,
      phone,
      email,
      address,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    };

    fetch("https://playground.4geeks.com/contact/agendas/BeaNovo/contacts", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
      })
      .then((result) => {
        console.log("Contacto agregado:", result);
        navigate("/"); // Redirige tras éxito
      })
      .catch((error) => console.error("Error al agregar contacto:", error));
  };

  return (
    <div>
      <form onSubmit={agregarContacto}>
        <div className="mb-3 px-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 px-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 px-2">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            className="form-control"
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3 px-2">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            className="form-control"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};
