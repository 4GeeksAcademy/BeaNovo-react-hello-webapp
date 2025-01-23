const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[]

		},
		actions: {
			
			  getContactList : async () => {
				const requestOptions = {
				  method: "GET", 
				};
			
				try {
				  const response = await fetch("https://playground.4geeks.com/contact/agendas/BeaNovo/contacts", requestOptions);
				  if (response.status === 404) {
					console.warn("Si la agenda no existe, se crea una nueva.");
					return await getActions().crearAgenda()
				  }
				  if (!response.ok) {
					throw new Error(`Error al obtener contactos: ${response.statusText}`);
				  }
			
				  const result = await response.json();
				  console.log("esto es result", result);
				  console.log("esto es result.contacts", result.contacts);
				  setStore({contacts:result.contacts})
				} catch (error) {
				  console.error("Error al obtener contactos:", error);
				}
			  },

			crearAgenda : async () => {
				const requestOptions = {
				  method: "POST",
				};
			
				try {
				  const response = await fetch("https://playground.4geeks.com/contact/agendas/BeaNovo", requestOptions);
				  if (response.ok) {
					console.log("Agenda creada.");
					await getContactList();
				  } else {
					console.error("Error al crear la agenda:", response.statusText);
				  }
				} catch (error) {
				  console.error("Error al crear la agenda:", error);
				}
			  },
			  
			  editContact: async (id, updatedContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/BeaNovo/contacts/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedContact),
					});
			
					if (!response.ok) throw new Error("Error al editar contacto");
			
					const data = await response.json();
					getActions().getContactList(); // Actualiza la lista después de editar
					return data;
				} catch (error) {
					console.error("Error al editar contacto:", error);
				}
			},
			
			  deleteContact: async (id) => {
				const store = getStore();
console.log("lo que quieras");

				const url = `https://playground.4geeks.com/contact/agendas/BeaNovo/contacts/${id}`; // Cambia la URL según tu API

				console.log("URL AQUI")
				console.log(url)
				try {
					const response = await fetch(url, { method: "DELETE" });
					if (!response.ok) {
						throw new Error(`Error al eliminar contacto: ${response.statusText}`);
					}
					console.log("Contacto eliminado con éxito");
			
					// Actualizar la lista de contactos en el store
					const updatedContacts = store.contacts.filter((contact) => contact.id !== id);
					setStore({ contacts: updatedContacts });
				} catch (error) {
					console.error("Error en deleteContact:", error);
				}
			},

			
			agregarContacto: async (newContact) => {
				const requestOptions = {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(newContact),
				};
			  
				try {
				  const response = await fetch("https://playground.4geeks.com/contact/agendas/BeaNovo/contacts", requestOptions);
				  if (!response.ok) {
					throw new Error("Error en la respuesta del servidor");
				  }
				  const result = await response.json();
				  console.log("Contacto agregado:", result);
				  getActions().getContactList(); // Llama a la función para actualizar la lista de contactos
				} catch (error) {
				  console.error("Error al agregar contacto:", error);
				}
			  },
			
			
			
		}
	};
};

export default getState;
