import FeedbackItem from './FeedbackItem'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

// This is another test comment

function FeedbackList() {
	const { feedback, isLoading } = useContext(FeedbackContext)

	if (!isLoading && (!feedback || feedback.length === 0)) {
		return <p>No feedback yet</p>
	}

	return isLoading ? (
		<h3>Loading...</h3>
	) : (
		<div className="feedback-list">
			{feedback.map((item) => (
				<FeedbackItem key={item.id} item={item} />
			))}
		</div>
	)
}

export default FeedbackList
