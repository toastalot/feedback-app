import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AboutPage from './routes/AboutPage'

// This is a test comment

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/About" element={<AboutPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
