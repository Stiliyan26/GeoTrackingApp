import './App.css'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Map from './components/Map/Map';

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { PointProvider } from './contexts/PointContext';

import GuestRoute from './guardedRoutes/GuestRoute';
import UserRoute from './guardedRoutes/UserGuard';

function App() {

	return (
		<AuthProvider>
			<PointProvider>
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
			</PointProvider>
		</AuthProvider>
	)
}

export default App
