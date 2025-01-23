import React from "react"; 
// Importamos React, necesario para usar JSX y crear componentes.

import { BrowserRouter, Route, Routes } from "react-router-dom"; 
// Importamos herramientas de React Router para manejar las rutas de la aplicación:
// - `BrowserRouter` envuelve toda la aplicación para habilitar el enrutamiento.
// - `Route` define una ruta específica con su componente asociado.
// - `Routes` agrupa todas las rutas.

import ScrollToTop from "./component/scrollToTop"; 
// Importamos un componente que hace que, al navegar entre rutas, la página se desplace automáticamente al inicio.

import { Home } from "./views/home"; 
// Importamos el componente que representa la vista principal o "Inicio".
import { Demo } from "./views/demo"; 
// Importamos el componente de demostración (actualmente está comentado en las rutas).
import { Single } from "./views/single"; 
// Importamos el componente que representa una vista individual (también comentado en las rutas).
import injectContext from "./store/appContext"; 
// Importamos `injectContext`, una función que proporciona el contexto de la aplicación a los componentes. 
// Esto permite compartir datos (como contactos) en toda la aplicación.

import { AddContact } from "./views/AddContact"; 
// Importamos el componente para agregar un nuevo contacto.
import { EditContact } from "./views/EditContact"; 
// Importamos el componente para editar un contacto existente.

import { Navbar } from "./component/navbar"; 
// (No está usado en este archivo, pero sería para un menú de navegación en la parte superior de la aplicación).
import { Footer } from "./component/footer"; 
// (No está usado aquí, pero serviría para un pie de página al final de la aplicación).

// Crear el componente principal de la aplicación:
const Layout = () => {
	// `basename` define un prefijo para las rutas si la aplicación se publica en un subdirectorio.
	// Si no está definido en el archivo `.env`, se usa una cadena vacía.
	const basename = process.env.BASENAME || ""; 

	return (
		<div>
			{/* El componente `BrowserRouter` envuelve todo el enrutamiento de la aplicación */}
			<BrowserRouter basename={basename}>
				{/* `ScrollToTop` asegura que al cambiar de ruta, la página haga scroll automáticamente al inicio */}
				<ScrollToTop>
					{/* `Routes` agrupa todas las rutas de la aplicación */}
					<Routes>
						{/* Ruta para la página de inicio ("/") */}
						<Route path="/" element={<Home />} />
						
						
						
						{/* Ruta para agregar un contacto */}
						<Route path="/addcontact" element={<AddContact />} />
						
						{/* Ruta para editar un contacto específico (usando su ID) */}
						<Route path="/editcontact/:id" element={<EditContact />} />
						
						{/* Ruta para manejar cualquier URL no definida */}
						<Route path="*" element={<h1>Not found!</h1>} />
						{/* Si se ingresa una ruta que no existe, se mostrará un mensaje "Not found!". */}
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

// Exportamos `Layout` con el contexto de la aplicación inyectado.
// Esto permite que todos los componentes accedan al "store" y las "actions".
export default injectContext(Layout);
