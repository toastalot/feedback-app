import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'

import { Link } from 'react-router-dom'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {
	return (
		<FeedbackProvider>
			<div className="container">
				<FeedbackForm />
				<FeedbackStats />
				<FeedbackList />
			</div>
			<div className="about-link">
				<Link to="/About">About</Link>
			</div>
		</FeedbackProvider>
	)
}

export default App
