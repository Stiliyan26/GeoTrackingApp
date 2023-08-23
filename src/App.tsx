import './App.css'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import GuestRoute from './guardedRoutes/GuestRoute';
import UserRoute from './guardedRoutes/UserGuard';

function App() {

	return (
		<AuthProvider>
			<Header />

			<main className='main-container'>
				<Routes>
					<Route path='/' element={<Home />} />

					<Route element={<GuestRoute />}>
						<Route path='/login' element={<Login />} />
					</Route>

					<Route element={<UserRoute />}>
						<Route path='/map' element={<Login />} />
					</Route>
				</Routes>
			</main>
		</AuthProvider>
	)
}

export default App
