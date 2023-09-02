import './App.css'

import Header from './components/Layout/Header/Header';
import Home from './components/Pages/Home/Home';
import Login from './components/Forms/Login/Login';
import Map from './components/Pages/Map/Map';

import { AuthProvider } from './contexts/AuthContext';
import { PointProvider } from './contexts/PointContext';
import { MapProvider } from './contexts/MapContext';

import GuestRoute from './guardedRoutes/GuestRoute';
import UserRoute from './guardedRoutes/UserGuard';
import { Route, Routes } from "react-router-dom";

function App() {

	return (
		<AuthProvider>
			<PointProvider>
				<MapProvider>
					<Header />

					<main className='main-container'>
						<Routes>
							<Route path='/' element={<Home />} />

							<Route element={<GuestRoute />}>
								<Route path='/login' element={<Login />} />
							</Route>

							<Route element={<UserRoute />}>
								<Route path='/map' element={<Map />} />
							</Route>
						</Routes>
					</main>
				</MapProvider>
			</PointProvider>
		</AuthProvider>
	)
}

export default App
