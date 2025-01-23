const getState = ({ getStore, getActions, setStore }) => { 
	// Esta función devuelve un objeto que contiene el "store" (donde se guardan los datos) 
	// y las "actions" (funciones que manejan esos datos).
	
	return {
		store: {
			contacts: [] 
			// Aquí es donde se guardará la lista de contactos. 
			// Inicialmente está vacío (un array vacío).
		},

		actions: {
			// Aquí se definen las funciones que modificarán los datos en el store.

			getContactList: async () => { 
				// Esta función obtiene la lista de contactos desde el servidor.
				const requestOptions = {
				  method: "GET", 
				  // Se usa el método HTTP GET para solicitar información.
				};
			
				try {
				  // Intentamos hacer la solicitud a la API (un servidor remoto que maneja los contactos).
				  const response = await fetch("https://playground.4geeks.com/contact/agendas/BeaNovo/contacts", requestOptions);

				  if (response.status === 404) {
					// Si la API responde con un código 404 (la agenda no existe),
					// mostramos un mensaje en la consola y creamos la agenda con otra función.
					console.warn("Si la agenda no existe, se crea una nueva.");
					return await getActions().crearAgenda();
				  }

				  if (!response.ok) {
					// Si la respuesta no es correcta (por ejemplo, un error 500),
					// lanzamos un error con un mensaje explicativo.
					throw new Error(`Error al obtener contactos: ${response.statusText}`);
				  }
			
				  const result = await response.json(); 
				  // Convertimos la respuesta del servidor en un objeto JavaScript.
				  console.log("esto es result", result);
				  console.log("esto es result.contacts", result.contacts);
				  setStore({ contacts: result.contacts }); 
				  // Guardamos la lista de contactos en el "store".
				} catch (error) {
				  // Si ocurre algún error (en la red o en la API), lo mostramos en la consola.
				  console.error("Error al obtener contactos:", error);
				}
			  },

			crearAgenda: async () => { 
				// Esta función crea una agenda vacía en el servidor.
				const requestOptions = {
				  method: "POST", 
				  // Usamos el método POST porque queremos crear algo nuevo en el servidor.
				};
			
				try {
				  const response = await fetch("https://playground.4geeks.com/contact/agendas/BeaNovo", requestOptions);
				  if (response.ok) {
					// Si la agenda se crea correctamente, mostramos un mensaje en la consola
					// y obtenemos la lista de contactos (que estará vacía al principio).
					console.log("Agenda creada.");
					await getActions().getContactList();
				  } else {
					// Si no se pudo crear la agenda, mostramos un mensaje de error.
					console.error("Error al crear la agenda:", response.statusText);
				  }
				} catch (error) {
				  // Si ocurre un error al conectar con el servidor, lo mostramos.
				  console.error("Error al crear la agenda:", error);
				}
			  },

			editContact: async (id, updatedContact) => {
				// Esta función edita un contacto existente. Recibe el ID del contacto y los datos actualizados.
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/BeaNovo/contacts/${id}`, {
						method: "PUT", // Usamos el método PUT porque queremos actualizar un recurso existente.
						headers: {
							"Content-Type": "application/json", 
							// Indicamos que los datos que enviamos están en formato JSON.
						},
						body: JSON.stringify(updatedContact), 
						// Convertimos los datos actualizados en un string JSON.
					});
			
					if (!response.ok) throw new Error("Error al editar contacto");
					// Si hay un error en la respuesta, lanzamos un error.

					const data = await response.json(); 
					// Convertimos la respuesta en un objeto JavaScript.
					getActions().getContactList(); 
					// Actualizamos la lista de contactos para reflejar los cambios.
					return data;
				} catch (error) {
					// Mostramos cualquier error que ocurra.
					console.error("Error al editar contacto:", error);
				}
			},

			deleteContact: async (id) => {
				// Esta función elimina un contacto específico usando su ID.
				const store = getStore(); 
				// Obtenemos el estado actual (la lista de contactos).

				const url = `https://playground.4geeks.com/contact/agendas/BeaNovo/contacts/${id}`; 
				// URL específica para eliminar un contacto por su ID.
				
				try {
					const response = await fetch(url, { method: "DELETE" }); 
					// Usamos el método DELETE para eliminar el contacto.
					
					if (!response.ok) {
						// Si la respuesta no es exitosa, mostramos un error.
						throw new Error(`Error al eliminar contacto: ${response.statusText}`);
					}
					console.log("Contacto eliminado con éxito");
			
					// Filtramos la lista de contactos para eliminar el contacto correspondiente.
					const updatedContacts = store.contacts.filter((contact) => contact.id !== id);
					setStore({ contacts: updatedContacts }); 
					// Guardamos la lista actualizada en el store.
				} catch (error) {
					// Mostramos cualquier error que ocurra.
					console.error("Error en deleteContact:", error);
				}
			},

			agregarContacto: async (newContact) => {
				// Esta función agrega un nuevo contacto.
				const requestOptions = {
				  method: "POST", 
				  // Usamos el método POST para enviar un nuevo contacto al servidor.
				  headers: { "Content-Type": "application/json" }, 
				  // Indicamos que el contenido está en formato JSON.
				  body: JSON.stringify(newContact), 
				  // Convertimos el nuevo contacto en un string JSON.
				};
			  
				try {
				  const response = await fetch("https://playground.4geeks.com/contact/agendas/BeaNovo/contacts", requestOptions);
				  if (!response.ok) {
					// Si hay un problema en la respuesta, lanzamos un error.
					throw new Error("Error en la respuesta del servidor");
				  }
				  const result = await response.json(); 
				  // Convertimos la respuesta en un objeto JavaScript.
				  console.log("Contacto agregado:", result);
				  getActions().getContactList(); 
				  // Actualizamos la lista de contactos para incluir el nuevo contacto.
				} catch (error) {
				  // Mostramos cualquier error que ocurra.
				  console.error("Error al agregar contacto:", error);
				}
			  },
		},
	};
};

export default getState; 
// Exportamos esta función para que pueda ser usada en otras partes de la aplicación.

