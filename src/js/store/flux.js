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
				  redirect: "follow",
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
			
		}
	};
};

export default getState;
